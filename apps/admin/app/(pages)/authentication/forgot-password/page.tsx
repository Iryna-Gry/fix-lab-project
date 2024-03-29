import ForgotPassword from '../(components)/ForgotPassword'

export const dynamic = 'force-dynamic'

const ForgotPasswordPage = () => {
  return (
    <main className='flex h-full flex-auto'>
      <section className=' flex w-full justify-center bg-footer-gradient-linear-blue py-[60px]'>
        <div className='relative flex flex-col items-center justify-center'>
          <ForgotPassword />
        </div>
      </section>
    </main>
  )
}

export default ForgotPasswordPage
