import { AOSInit } from './(components)/AOSInit'
import {
  AddressSection,
  BrokenSection,
  CallCourierSection,
  ColaborationSection,
  HeroSection,
} from './(layouts)'
import type { IContact } from './(server)/api/service/modules/contactService'
import type { IGadget } from './(server)/api/service/modules/gadgetService'
import { trpc } from './(utils)/trpc'

export const runtime = 'edge'
export const revalidate = 60

export default async function Home() {
  const gadgetsData = (await trpc.getGadgetsQuery.query()) as IGadget[]
  const contactsData = (await trpc.getContactsQuery.query()) as IContact[]

  return (
    <main className='relative flex-auto'>
      <AOSInit />
      <HeroSection />
      <BrokenSection gadgetsData={gadgetsData} />
      <CallCourierSection />
      <ColaborationSection />
      <AddressSection contactsData={contactsData} />
    </main>
  )
}
