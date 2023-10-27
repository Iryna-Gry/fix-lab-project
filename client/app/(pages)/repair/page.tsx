import { AddressSection, ColaborationSection } from '@/app/(layouts)'
import { getAllContactsData } from '@/app/(server)/api/service/modules/contactService'
import { getAllGadgetsData } from '@/app/(server)/api/service/modules/gadgetService'

import GadgetsSection from './(components)/GadgetsSection'

const Repair = async () => {
  const gadgetsData = await getAllGadgetsData()
  const contactsData = await getAllContactsData()
  return (
    <main className='flex-auto'>
      <GadgetsSection gadgetsData={gadgetsData} />
      <ColaborationSection />
      <AddressSection contactsData={contactsData} />
    </main>
  )
}

export default Repair
