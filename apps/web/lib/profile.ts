import profile from "@content/profile.json"

export type ProfileProject = (typeof profile.projects)[number] & { url?: string }

export type Profile = typeof profile

export default profile
