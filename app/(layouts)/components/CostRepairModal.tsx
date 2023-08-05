import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useState, useEffect, useRef, useCallback } from 'react'
import { MdOutlineClose } from 'react-icons/md'

interface MyFormValues {
  name: string
  number: string
  gadget: string
  address: string
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Не введенно імʼя').min(3),
  number: Yup.string()
    .required('Не введенно номер телефону')
    .matches(/^\+380\d{9}$/, 'Невірний номер')
    .min(13, 'Невірний номер'),
  gadget: Yup.string().required('Не введенно назву пристрою').min(3),
  address: Yup.string().required('Не введенна адреса').min(3),
})
interface CostRepairModalProps {
  toggleCostRepairModal: () => void
}
const CostRepairModal: React.FC<CostRepairModalProps> = ({
  toggleCostRepairModal,
}) => {
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const initialValues: MyFormValues = {
    name: '',
    number: '+380',
    gadget: '',
    address: '',
  }
  const modalRef = useRef<HTMLDivElement>(null)

  const handleEscKeyPressModal = useCallback((event: { code: string }) => {
    if (event.code === 'Escape') {
      toggleCostRepairModal()
    }
  }, [])

  const onBackdropCloseModal = useCallback(
    (event: { target: any; currentTarget: any }) => {
      if (event.target === event.currentTarget) {
        toggleCostRepairModal()
      }
    },
    [],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleEscKeyPressModal)

    return () => {
      window.removeEventListener('keydown', handleEscKeyPressModal)
    }
  }, [handleEscKeyPressModal])

  const handleSubmit = async (values: MyFormValues) => {
    try {
      const TOKEN = '5560792411:AAErGG70RTKBdZklSlOT_TdJTMUROf_8rYU'
      const CHAT_ID = '-1001952047976'
      const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`

      let message = `<b>Скільки коштуватиме ремонт?</b>\n`

      message += `<b>Ім'я:</b>\n${values.name}\n`
      message += `<b>Номер телефону:</b>\n${values.number}\n`
      message += `<b>Пристрій:</b>\n${values.gadget}\n`
      message += `<b>Адреса:</b>\n${values.address}\n`

      await axios.post(URL_API, {
        chat_id: CHAT_ID,
        parse_mode: 'html',
        text: message,
      })
      toggleCostRepairModal()
    } catch (error) {
      console.log('Помилка при відправленні.')
    }
  }
  return (
    <div
      ref={modalRef}
      onClick={onBackdropCloseModal}
      className='fixed top-0 left-0  z-50 w-full flex justify-center items-center bg-modal-overlay  h-full'
    >
      <div className='relative max-w-[414px]  bg-[#00cc73] rounded-2xl flex-col justify-start items-center p-14 max-sm:px-4'>
        <button
          type='button'
          className=' absolute top-4 right-4 text-center white-dis-700'
          onClick={toggleCostRepairModal}
        >
          <MdOutlineClose
            className='h-8 w-8 hover:opacity-80  focus:opacity-80 fill-white-dis'
            aria-hidden='true'
          />
        </button>
        <h3 className='font-semibold text-white-dis text-center mb-8 text-xl '>
          Скільки коштуватиме ремонт?
        </h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            isSubmitting,
            touched,
            errors,
            isValidating,
            dirty,
            isValid,
          }) => (
            <Form className='flex flex-col justify-center items-center gap-6'>
              <div className='relative'>
                <Field
                  type='text'
                  id='name'
                  name='name'
                  className={`w-[302px] max-md:w-[280px] h-[58px] rounded-xl px-6 py-2 ${
                    touched.name && errors.name ? 'border-[#A80000]' : ''
                  }`}
                  autoComplete='off'
                  placeholder='Імʼя'
                />
                <ErrorMessage
                  name='name'
                  component='div'
                  className=' absolute bottom-[-22px] left-[24px] text-[#A80000] text-sm font-normal tracking-wide'
                />
              </div>
              <div className='relative'>
                <Field
                  type='text'
                  id='number'
                  name='number'
                  className='w-[302px] max-md:w-[280px] h-[58px] rounded-xl px-6 py-2'
                  autoComplete='off'
                  placeholder='Номер телефону'
                />
                <ErrorMessage
                  name='number'
                  component='div'
                  className=' absolute bottom-[-22px] left-[24px] text-[#A80000] text-sm font-normal tracking-wide'
                />
              </div>
              <div className='relative'>
                <Field
                  type='text'
                  id='gadget'
                  name='gadget'
                  className='w-[302px] max-md:w-[280px] h-[58px] rounded-xl px-6 py-2'
                  autoComplete='off'
                  placeholder='Пристрій'
                />
                <ErrorMessage
                  name='gadget'
                  component='div'
                  className=' absolute bottom-[-22px] left-[24px] text-[#A80000] text-sm font-normal tracking-wide'
                />
              </div>

              <div className='relative'>
                <Field
                  as='textarea'
                  id='address'
                  name='address'
                  className='w-[302px] max-md:w-[280px] h-[144px] rounded-xl px-6 py-2'
                  autoComplete='off'
                  placeholder='Адреса'
                />
                <ErrorMessage
                  name='address'
                  component='div'
                  className=' absolute bottom-[-22px] left-[24px] text-[#A80000] text-sm font-normal tracking-wide'
                />
              </div>
              <button
                type='submit'
                disabled={isSubmitting || !isValid || !dirty || isValidating}
                onMouseEnter={() => setIsHovering(false)}
                onMouseLeave={() => setIsHovering(true)}
                className={`${
                  !isValid || !dirty || isValidating
                    ? 'opacity-70 pointer-events-none'
                    : ''
                } group bg-dark-blue flex justify-center items-center rounded-lg hover:bg-[#0B122F] focus:bg-[#0B122F] w-full mt-4`}
              >
                <p
                  className={`whitespace-nowrap text-base font-semibold tracking-[0.64] text-white-dis pt-[23px] pb-[20px] ${
                    isHovering ? 'animate-hoverBtnOut' : ''
                  } group-hover:animate-hoverBtnIn`}
                >
                  Вартість ремонту
                </p>
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default CostRepairModal
