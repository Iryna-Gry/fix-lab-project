'use client'

import { trpc } from '@admin/app/(utils)/trpc/client'
import { Input } from '@nextui-org/react'
import type { FormikHelpers, FormikProps } from 'formik'
import { Field, Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { object, ref, string } from 'yup'

import SendButton from '../../(components)/SendButton'

interface IResetPasswordProps {
  searchParams: {
    token: string
    id: string
  }
}

const ResetPassword = ({ searchParams }: IResetPasswordProps) => {
  const router = useRouter()

  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false)
  const [isVisiblePasswordConfirm, setIsVisiblePasswordConfirm] =
    useState<boolean>(false)

  const toggleVisibilityPassword = () =>
    setIsVisiblePassword(!isVisiblePassword)
  const toggleVisibilityPasswordConfirm = () =>
    setIsVisiblePasswordConfirm(!isVisiblePasswordConfirm)

  const resetPassword = trpc.auth.resetPassword.useMutation({
    onSuccess: () => {
      toast.success('Пароль успішно оновленно!', {
        style: {
          borderRadius: '10px',
          background: 'grey',
          color: '#fff',
        },
      })
      router.push('/authentication/signin')
      router.refresh()
    },
    onError: () => {
      toast.error('Виникла помилка при оновленні паролю', {
        style: {
          borderRadius: '10px',
          background: 'red',
          color: '#fff',
        },
      })
    },
  })

  const handleSubmit = async (
    values: any,
    { setSubmitting }: FormikHelpers<any>,
  ) => {
    setSubmitting(true)

    try {
      await resetPassword.mutateAsync({
        password: values.password,
        userId: searchParams.id,
        token: searchParams.token,
      })
    } catch (error) {
      // added show error
    }
    setSubmitting(false)
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <h3 className='mb-8 text-center font-exo_2 text-2xl font-semibold leading-[29px] text-white-dis'>
        Введіть новий пароль
      </h3>
      <Formik
        initialValues={{ password: '', passwordConfirmation: '' }}
        validationSchema={object().shape({
          password: string()
            .min(6, 'Мінімальна кількість символів 6')
            .required('Будь ласка, введіть пароль'),
          passwordConfirmation: string()
            .label('Підтвердження пароля')
            .oneOf([ref('password')], 'Пароль співпадає')
            .required('Будь ласка, підтвердіть пароль'),
        })}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<any>) => (
          <Form
            onSubmit={props.handleSubmit}
            className='flex w-full flex-col flex-wrap items-center justify-center gap-6'
          >
            <Field name='password'>
              {({ meta, field }: any) => (
                <Input
                  type={isVisiblePassword ? 'text' : 'password'}
                  isInvalid={!!(meta.touched && meta.error)}
                  errorMessage={meta.touched && meta.error && meta.error}
                  classNames={{
                    label: [
                      'font-base',
                      'text-md',
                      'text-white-dis',
                      'group-data-[filled-within=true]:text-mid-blue',
                    ],
                    input: ['font-base', 'text-md', 'text-white-dis'],
                    inputWrapper: ['group-data-[focus=true]:border-mid-green'],
                  }}
                  variant='bordered'
                  label='Введіть новий пароль'
                  labelPlacement='inside'
                  endContent={
                    <button
                      className='focus:outline-none'
                      type='button'
                      onClick={toggleVisibilityPassword}
                    >
                      {isVisiblePassword ? (
                        <AiFillEyeInvisible
                          size={45}
                          className='flex p-2 text-mid-blue'
                        />
                      ) : (
                        <AiFillEye
                          size={45}
                          className='flex p-2 text-mid-green'
                        />
                      )}
                    </button>
                  }
                  {...field}
                />
              )}
            </Field>
            <Field name='passwordConfirmation'>
              {({ meta, field }: any) => (
                <Input
                  type={isVisiblePasswordConfirm ? 'text' : 'password'}
                  isInvalid={!!(meta.touched && meta.error)}
                  errorMessage={meta.touched && meta.error && meta.error}
                  classNames={{
                    label: [
                      'font-base',
                      'text-md',
                      'text-white-dis',
                      'group-data-[filled-within=true]:text-mid-blue',
                    ],
                    input: ['font-base', 'text-md', 'text-white-dis'],
                    inputWrapper: ['group-data-[focus=true]:border-mid-green'],
                  }}
                  variant='bordered'
                  label='Підтвердіть новий пароль'
                  labelPlacement='inside'
                  endContent={
                    <button
                      className='focus:outline-none'
                      type='button'
                      onClick={toggleVisibilityPasswordConfirm}
                    >
                      {isVisiblePasswordConfirm ? (
                        <AiFillEyeInvisible
                          size={45}
                          className='flex p-2 text-mid-blue'
                        />
                      ) : (
                        <AiFillEye
                          size={45}
                          className='flex p-2 text-mid-green'
                        />
                      )}
                    </button>
                  }
                  {...field}
                />
              )}
            </Field>
            <SendButton
              type='submit'
              disabled={!props.isValid}
              isLoading={props.isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ResetPassword
