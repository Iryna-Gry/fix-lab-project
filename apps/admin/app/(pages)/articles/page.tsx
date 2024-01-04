import { serverClient } from '@admin/app/(utils)/trpc/serverClient'
import type { outputArticleSchema } from '@server/domain/articles/schemas/article.schema'
import type { imageSchema } from '@server/domain/images/schemas/image.schema'

import EmptySection from '../(components)/EmptySection'
import AddArticleSection from './(components)/AddArticleSection'
import ArticlesList from './(components)/ArticlesList'

export const dynamic = 'force-dynamic'

export default async function ArticlesPage() {
  const articlesData =
    (await serverClient.articles.getAll()) as outputArticleSchema[]
  const allImagesData = (await serverClient.images.getAll()) as imageSchema[]

  return (
    <main>
      <section className='flex min-h-[100vh] w-full bg-footer-gradient-linear-blue py-[60px]'>
        <div className='container relative flex flex-col gap-8 px-8'>
          <AddArticleSection allImagesData={allImagesData} />
          {articlesData.length ? (
            <ArticlesList articlesData={articlesData} />
          ) : (
            <EmptySection />
          )}
        </div>
      </section>
    </main>
  )
}
