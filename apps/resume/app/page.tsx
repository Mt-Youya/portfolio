import { Button } from "@cyrus/ui/button"

import { ResumePaper } from "@/components/ResumePaper"
import { getPublishedResume } from "@/lib/content"

export default async function ResumePage() {
  const resume = await getPublishedResume()

  return (
    <main className="resume-public-shell">
      <div className="resume-public-toolbar">
        <div>
          <p className="resume-public-eyebrow">已发布简历</p>
          <p className="resume-public-note">当前内容来自已发布版本</p>
        </div>
        <form action="/api/pdf">
          <Button type="submit" size="sm">
            下载 PDF
          </Button>
        </form>
      </div>
      <ResumePaper resume={resume} />
    </main>
  )
}
