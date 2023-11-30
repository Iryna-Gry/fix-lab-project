import { trpc } from './(utils)/trpc'

export const runtime = 'edge'
export const revalidate = 3600

export default async function Home() {
  const gadgetsData = (await trpc.getGadgetsQuery.query()) as unknown
  console.log(gadgetsData)
  return (
    <main className=' flex h-full w-full flex-auto'>
      <section className=' bg-footer-gradient-linear-blue flex w-full items-center justify-center  overflow-hidden  pb-[102px] pt-[163px] max-md:pb-14 max-md:pt-[120px]'>
        <h1 className=' bold font-exo_2 text-white-dis text-4xl'>Hello</h1>
      </section>
    </main>
  )
}
