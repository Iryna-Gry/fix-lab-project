'use client'

import { Button, Input } from '@nextui-org/react'
import type { FormikHelpers, FormikProps } from 'formik'
import { Field, Form, Formik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { FiLogIn } from 'react-icons/fi'
import { HiMail } from 'react-icons/hi'
import { object, string } from 'yup'

const SignIn = () => {
  const router = useRouter()
  const [isVisiblePassword, setIsVisiblePassword] = useState(false)
  const toggleVisibilityPassword = () =>
    setIsVisiblePassword(!isVisiblePassword)

  const handleSubmit = async (
    values: any,
    { setSubmitting }: FormikHelpers<any>,
  ) => {
    setSubmitting(true)
    try {
      const res = await signIn('credentials', {
        login: values.login,
        password: values.password,
        redirect: false,
      })
      if (res && !res.error) {
        toast.success(`Вітаємо в FixLab Admin Panel!`, {
          style: {
            borderRadius: '10px',
            background: 'grey',
            color: '#fff',
          },
        })
        router.push('/')
        router.refresh()
      } else {
        throw new Error(
          'Помилка авторизації, перевірте правильність вводу пошти та пароля',
        )
      }
    } catch (error: any) {
      toast.error(error.message, {
        style: {
          borderRadius: '10px',
          background: 'red',
          color: '#fff',
        },
      })
    }
    setSubmitting(false)
  }

  return (
    <div className='flex flex-col items-center justify-center gap-8'>
      <h3 className='mb-8 text-center font-exo_2 text-2xl font-semibold leading-[29px] text-white-dis'>
        Вхід до кабінету
      </h3>
      <Formik
        initialValues={{ login: '', password: '' }}
        validationSchema={object().shape({
          login: string()
            .email('Невірний email адрес')
            .required('Введіть Ваш email'),
          password: string().required('Введіть Ваш пароль'),
        })}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<any>) => (
          <Form
            onSubmit={props.handleSubmit}
            className='flex flex-col flex-wrap items-center justify-center gap-6'
          >
            <Field name='login'>
              {({ meta, field }: any) => (
                <Input
                  type='email'
                  variant='bordered'
                  label='Введіть пошту'
                  labelPlacement='inside'
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
                  endContent={
                    <HiMail
                      size={45}
                      className='flex items-center p-2 text-mid-green'
                    />
                  }
                  {...field}
                />
              )}
            </Field>
            <Field name='password'>
              {({ meta, field }: any) => (
                <Input
                  type={isVisiblePassword ? 'text' : 'password'}
                  variant='bordered'
                  isInvalid={!!(meta.touched && meta.error)}
                  errorMessage={meta.touched && meta.error && meta.error}
                  label='Введіть пароль'
                  labelPlacement='inside'
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
            <Button
              type='submit'
              disabled={!props.isValid}
              isLoading={props.isSubmitting}
              className='group flex h-[65px] w-[320px] justify-center rounded-2xl bg-mid-green text-center font-exo_2 text-xl font-bold text-white-dis  transition-colors hover:bg-mid-blue  focus:bg-mid-blue'
            >
              Увійти
              <FiLogIn className='text-xl' />
            </Button>
          </Form>
        )}
      </Formik>
      <Link
        className='font-exo_2 text-xl font-bold text-white-dis transition duration-300 hover:scale-[1.03] focus:scale-[1.03]'
        href='/authentication/forgot-password'
      >
        Забули пароль?
      </Link>
    </div>
  )
}

export default SignIn
