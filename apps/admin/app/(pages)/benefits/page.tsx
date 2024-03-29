import { auth } from '@admin/app/(utils)/next-auth/auth'
import { serverClient } from '@admin/app/(utils)/trpc/serverClient'
import type { outputBenefitSchema as IBenefit } from '@server/domain/benefits/schemas/benefit.schema'
import type { imageSchema as IImage } from '@server/domain/images/schemas/image.schema'

import EmptySection from '../(components)/EmptySection'
import AddBenefitForm from './(components)/AddBenefitForm'
import BenefitsList from './(components)/BenefitsList'

export const dynamic = 'force-dynamic'

const BenefitsPage = async () => {
  const session = await auth()
  const user = session?.user ? session.user : null

  const benefitsData = (await serverClient({
    user,
  }).benefits.getAllBenefits()) as IBenefit[]
  const iconsData = (await serverClient({
    user,
  }).images.getAllIcons()) as IImage[]

  return (
    <main>
      <section className='flex min-h-[100vh] w-full bg-footer-gradient-linear-blue py-[60px]'>
        <div className='container relative flex flex-1 flex-col gap-8 px-8'>
          <AddBenefitForm iconsData={iconsData} />
          {benefitsData.length ? (
            <BenefitsList benefitsData={benefitsData} />
          ) : (
            <EmptySection />
          )}
        </div>
      </section>
    </main>
  )
}

export default BenefitsPage
