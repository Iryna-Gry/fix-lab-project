import React from 'react'

import {
  AddressSection,
  CallCourierSection,
  ColaborationSection,
} from '@/app/(layouts)'
// import { getAllContactsData } from '@/app/(server)/api/service/modules/contactService'
// import { getSingleGadgetData } from '@/app/(server)/api/service/modules/gadgetService'
import fetchDataSSR from '@/app/(server)/api/service/helpers/fetchDataSSR'

import SingleGadgetSection from '../(components)/SingleGadgetSection'

interface IndexProps {
  params: {
    gadget: string
  }
}

const Index: React.FC<IndexProps> = async ({ params }) => {
  const singleGadgetData = await fetchDataSSR(
    `/gadgets/find-by-slug/${params.gadget}`,
  )
  const contactsData = await fetchDataSSR('/contacts')
  // const singleGadgetData = await getSingleGadgetData(params.gadget)
  // const contactsData = await getAllContactsData()
  return (
    <main className='flex-auto'>
      <SingleGadgetSection
        singleGadgetData={singleGadgetData}
        contactsData={contactsData}
      />
      <CallCourierSection />
      <ColaborationSection />
      <AddressSection contactsData={contactsData} />
    </main>
  )
}

export default Index
