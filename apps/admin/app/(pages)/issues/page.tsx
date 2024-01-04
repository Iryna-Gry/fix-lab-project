import { serverClient } from '@admin/app/(utils)/trpc/serverClient'

import { imageSchema } from '@server/domain/images/schemas/image.schema'
import { outputIssueSchema } from '@server/domain/issues/schemas/issue.schema'
import EmptySection from '../(components)/EmptySection'
import AddIssueInfoSection from './(components)/AddIssueInfoSection'
import IssuesList from './(components)/IssuesList'

export const dynamic = 'force-dynamic'

const IssuesPage = async () => {
  const issuesData = (await serverClient.issues.getAll()) as outputIssueSchema[]
  const allImagesData = (await serverClient.images.getAll()) as imageSchema[]

  return (
    <main>
      <section className='bg-footer-gradient-linear-blue flex w-full min-h-[100vh] py-[60px]'>
        <div className='container relative flex flex-col gap-8 px-8'>
          {/* <AddIssueSection /> */}
          <AddIssueInfoSection allImagesData={allImagesData} />
          {issuesData.length ? (
            <IssuesList issuesData={issuesData} />
          ) : (
            <EmptySection />
          )}
        </div>
      </section>
    </main>
  )
}

export default IssuesPage