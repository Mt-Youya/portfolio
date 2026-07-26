import { redirect } from "next/navigation"

import { auth } from "@/auth"
import { ManageClient } from "@/components/ManageClient"
import { getPublishedResumeSource } from "@/lib/content"
import { isResumeEditor } from "@/lib/editor-access"
import { getProposalHistory, getPublishedHistory } from "@/lib/github"

export default async function ManagePage() {
  const session = await auth()
  const editor = session?.user?.name ?? ""
  if (!isResumeEditor(editor)) redirect("/api/auth/signin?callbackUrl=/manage")

  const [source, publishedResult, proposalsResult] = await Promise.all([
    getPublishedResumeSource(),
    getPublishedHistory().catch(() => []),
    getProposalHistory().catch(() => []),
  ])

  return (
    <ManageClient
      initialSource={source}
      editor={editor}
      publishedVersions={publishedResult}
      proposals={proposalsResult}
    />
  )
}
