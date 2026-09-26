export interface OrgCommitDetail {
  sha: string;
  shortSha: string;
  message: string;
  repo: string;
  date: string;
  html_url: string;
}

export interface Contributor {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
  role: string;
  specialty: string;
  studentId: string;
  ruCode: string;
  aliases?: string[];
  recentCommits?: OrgCommitDetail[];
}

export interface ContributionActivity {
  day: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export const FORGE_TEAM_MEMBERS: Contributor[] = [
  {
    id: 1,
    login: "RyujiNishigami",
    name: "ธีรภัทร ทองตำลึง",
    avatar_url: "/team/teeraphat.jpg",
    html_url: "https://github.com/RyujiNishigami",
    contributions: 0,
    role: "Chief Executive Officer (CEO)",
    specialty: "Strategy & System Architecture",
    studentId: "6752300194",
    ruCode: "RU-03",
    aliases: ["ryujinishigami", "teerapat", "ธีรภัทร"],
  },
  {
    id: 2,
    login: "Ratthapoom681",
    name: "รัฐภูมิ หวังเดช",
    avatar_url: "/team/ratthapoom.png",
    html_url: "https://github.com/Ratthapoom681",
    contributions: 0,
    role: "Chief Technology Officer (CTO)",
    specialty: "AI Architecture & Infrastructure",
    studentId: "6752301336",
    ruCode: "RU-04",
    aliases: ["ratthapoom681", "ratthapoom", "รัฐภูมิ"],
  },
  {
    id: 3,
    login: "Phongdaani08",
    name: "พงษ์ดนัย สมภาร",
    avatar_url: "/team/phongdanai.jpg",
    html_url: "https://github.com/Phongdaani08",
    contributions: 0,
    role: "Data Engineering Lead",
    specialty: "Medallion Pipelines & Big Data Ops",
    studentId: "6752301255",
    ruCode: "RU-05",
    aliases: ["phongdaani08", "phongdanai", "poom", "poomphongdanai", "6752301255", "พงษ์ดนัย"],
  },
  {
    id: 4,
    login: "Forge-Solutions-Lab",
    name: "ถวายเกียรติ ปูวัง",
    avatar_url: "/team/thawaikiat.png",
    html_url: "https://github.com/Forge-Solutions-Lab",
    contributions: 0,
    role: "Lead AI Engineer",
    specialty: "Concept Learning & RAG Systems",
    studentId: "6752301271",
    ruCode: "RU-02",
    aliases: ["thawaikiat", "ถวายเกียรติ"],
  },
  {
    id: 5,
    login: "Forge-Solutions-Lab",
    name: "จิมมี่ โกรสเฮียรว์",
    avatar_url: "/team/jimmy.jpg",
    html_url: "https://github.com/Forge-Solutions-Lab",
    contributions: 0,
    role: "Senior ML Engineer",
    specialty: "Model Evaluation & Optimization",
    studentId: "6752300658",
    ruCode: "RU-01",
    aliases: ["jimmy", "จิมมี่"],
  },
];

const KNOWN_ORG_REPOS = [
  "Forge-Solutions-Lab.github.io",
  "face_recognition_project",
  "KNN",
  "forge-tools-hub",
];

export async function getContributors(): Promise<Contributor[]> {
  const org = process.env.GITHUB_ORG || "Forge-Solutions-Lab";
  const token = process.env.GITHUB_TOKEN;

  const headers: Record<string, string> = {
    "User-Agent": "forge-tools-hub",
    Accept: "application/vnd.github+json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Map to store commits per member
  const memberCommitsMap = new Map<string, OrgCommitDetail[]>();
  FORGE_TEAM_MEMBERS.forEach((m) => memberCommitsMap.set(m.name, []));

  try {
    // 1. Get repository list from the organization
    let repos = KNOWN_ORG_REPOS;
    try {
      const orgReposRes = await fetch(`https://api.github.com/orgs/${org}/repos?per_page=100`, {
        headers,
        next: { revalidate: 3600 },
      });
      if (orgReposRes.ok) {
        const repoData = await orgReposRes.json();
        if (Array.isArray(repoData) && repoData.length > 0) {
          repos = repoData.map((r: any) => r.name);
        }
      }
    } catch (e) {
      console.warn("Could not fetch full org repo list, using known list.", e);
    }

    // 2. Fetch full commit history across all org repositories
    await Promise.allSettled(
      repos.map(async (repoName) => {
        try {
          const res = await fetch(
            `https://api.github.com/repos/${org}/${repoName}/commits?per_page=100`,
            {
              headers,
              next: { revalidate: 3600 },
            }
          );
          if (res.ok) {
            const commits = await res.json();
            if (Array.isArray(commits)) {
              commits.forEach((c: any) => {
                const login = c.author ? c.author.login.toLowerCase() : "";
                const commitAuthorName = (c.commit?.author?.name || "").toLowerCase();
                const commitAuthorEmail = (c.commit?.author?.email || "").toLowerCase();

                const commitItem: OrgCommitDetail = {
                  sha: c.sha,
                  shortSha: c.sha ? c.sha.slice(0, 7) : "unknown",
                  message: c.commit?.message || "No commit message",
                  repo: repoName,
                  date: c.commit?.author?.date || c.commit?.committer?.date || "",
                  html_url: c.html_url || `https://github.com/${org}/${repoName}/commit/${c.sha}`,
                };

                // Match against all member aliases
                for (const member of FORGE_TEAM_MEMBERS) {
                  const matchesLogin = login && member.login.toLowerCase() === login && member.login !== "Forge-Solutions-Lab";
                  const matchesAlias = (member.aliases || []).some(
                    (alias) =>
                      login.includes(alias.toLowerCase()) ||
                      commitAuthorName.includes(alias.toLowerCase()) ||
                      commitAuthorEmail.includes(alias.toLowerCase())
                  );

                  if (matchesLogin || matchesAlias) {
                    const list = memberCommitsMap.get(member.name) || [];
                    list.push(commitItem);
                    memberCommitsMap.set(member.name, list);
                    break;
                  }
                }
              });
            }
          }
        } catch (err) {
          // ignore individual repo errors
        }
      })
    );
  } catch (error) {
    console.error("Failed to query GitHub commits:", error);
  }

  // 3. Return members with exact commits and sorted commit logs
  return FORGE_TEAM_MEMBERS.map((member) => {
    const list = memberCommitsMap.get(member.name) || [];
    // Sort commits by date descending (newest first)
    list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return {
      ...member,
      contributions: list.length,
      recentCommits: list,
    };
  });
}

export function generateActivityHeatmap(allCommits: OrgCommitDetail[] = []): ContributionActivity[] {
  const days: ContributionActivity[] = [];
  const today = new Date();

  // Create count map for actual commit dates (YYYY-MM-DD)
  const commitDateCounts = new Map<string, number>();
  allCommits.forEach((c) => {
    if (c.date) {
      const dayKey = c.date.split("T")[0];
      commitDateCounts.set(dayKey, (commitDateCounts.get(dayKey) || 0) + 1);
    }
  });

  // Generate last 16 weeks (112 days)
  for (let i = 111; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dayStr = date.toISOString().split("T")[0];

    const count = commitDateCounts.get(dayStr) || 0;
    let level: 0 | 1 | 2 | 3 | 4 = 0;

    if (count >= 5) {
      level = 4;
    } else if (count >= 3) {
      level = 3;
    } else if (count >= 2) {
      level = 2;
    } else if (count >= 1) {
      level = 1;
    }

    days.push({ day: dayStr, count, level });
  }

  return days;
}
