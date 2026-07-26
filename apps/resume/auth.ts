import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

import { isResumeEditor } from "@/lib/editor-access"

export const { auth, handlers } = NextAuth({
  providers: [
    GitHub({
      profile(profile) {
        return {
          id: String(profile.id),
          name: profile.login,
          email: profile.email,
          image: profile.avatar_url,
        }
      },
    }),
  ],
  callbacks: {
    signIn({ user }) {
      return isResumeEditor(user.name)
    },
  },
})
