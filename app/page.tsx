import {
  AddressSection,
  BrokenSection,
  CallCourierSection,
  ColaborationSection,
  HeroSection,
} from './(layouts)'

export default function Home() {
  return (
    <main className='flex flex-auto h-max flex-col items-center justify-between'>
      <HeroSection />
      <BrokenSection />
      <CallCourierSection />
      <ColaborationSection />
      <AddressSection />
    </main>
  )
}
