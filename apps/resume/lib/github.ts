const githubApi = "https://api.github.com"
const proposalPrefix = "[resume] 提案："

type GitHubCommit = {
  sha: string
  html_url: string
  commit: { message: string; author: { date: string } }
}

type GitHubIssue = {
  number: number
  title: string
  state: "open" | "closed"
  html_url: string
  created_at: string
  closed_at: string | null
}

function repository() {
  const value = process.env.RESUME_GITHUB_REPOSITORY
  if (!value || !/^[^/\s]+\/[^/\s]+$/.test(value)) {
    throw new Error("RESUME_GITHUB_REPOSITORY 必须是 owner/repository")
  }
  return value
}

function headers(requireToken = false) {
  const token = process.env.RESUME_GITHUB_TOKEN
  if (requireToken && !token) throw new Error("缺少 RESUME_GITHUB_TOKEN")

  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

async function request<T>(path: string, init?: RequestInit, requireToken = false) {
  const response = await fetch(`${githubApi}${path}`, {
    ...init,
    headers: { ...headers(requireToken), ...init?.headers },
    cache: "no-store",
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`GitHub API ${response.status}: ${body.slice(0, 240)}`)
  }

  return response.json() as Promise<T>
}

export async function createProposalIssue(input: { editor: string; content: string; diff: string }) {
  const createdAt = new Intl.DateTimeFormat("zh-CN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Shanghai",
  }).format(new Date())
  const body = [
    "## 简历候选内容",
    `- 发起编辑者：@${input.editor}`,
    `- 提交时间：${createdAt}`,
    "- 目标文件：`content/resume.zh.md`",
    "",
    "### Diff",
    "```diff",
    input.diff,
    "```",
    "",
    "### 完整候选 Markdown",
    "```markdown",
    input.content,
    "```",
  ].join("\n")

  return request<GitHubIssue>(
    `/repos/${repository()}/issues`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: `${proposalPrefix}${createdAt}`, body }),
    },
    true
  )
}

export async function getPublishedHistory() {
  const commits = await request<GitHubCommit[]>(`/repos/${repository()}/commits?path=content/resume.zh.md&per_page=30`)
  return commits.map((commit) => ({
    id: commit.sha,
    message: commit.commit.message.split("\n")[0],
    date: commit.commit.author.date,
    url: commit.html_url,
  }))
}

export async function getProposalHistory() {
  const issues = await request<GitHubIssue[]>(`/repos/${repository()}/issues?state=all&per_page=100`)
  return issues
    .filter((issue) => issue.title.startsWith(proposalPrefix))
    .map((issue) => ({
      number: issue.number,
      title: issue.title,
      state: issue.state,
      createdAt: issue.created_at,
      closedAt: issue.closed_at,
      url: issue.html_url,
    }))
}
