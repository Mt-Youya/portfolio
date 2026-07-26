export function isResumeEditor(login: string | null | undefined) {
  if (!login) return false

  const allowed = (process.env.RESUME_EDITOR_GITHUB_LOGINS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean)

  return allowed.includes(login.toLowerCase())
}
