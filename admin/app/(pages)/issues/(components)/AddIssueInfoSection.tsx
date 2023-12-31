/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-console */

'use client'

import { Accordion, AccordionItem } from '@nextui-org/react'
import useLocalStorage from 'admin/app/(hooks)/useLocalStorage '
import deleteData from 'admin/app/(server)/api/service/admin/deleteData'
import postData from 'admin/app/(server)/api/service/admin/postData'
import uploadImg from 'admin/app/(server)/api/service/admin/uploadImg'
import { createSlug } from 'admin/app/(utils)/createSlug'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { IoMdAddCircle } from 'react-icons/io'

import CustomAddContent from '../../(components)/CustomAddContent'
import SendButton from '../../(components)/SendButton'

const AddIssueInfoSection = () => {
  const router = useRouter()

  const [seoContent, setSeoContent] = useLocalStorage<{
    title: string
    description: string
    keywords: string
  }>('addIssueInfoSeoContent', {
    title: '',
    description: '',
    keywords: '',
  })
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [contentImage, setContentImage] = useState<string | ArrayBuffer | null>(
    null,
  )

  const [contentInfoIssue, setContentInfoIssue] = useLocalStorage<string | ''>(
    'addIssueInfoInfoIssue',
    '',
  )
  const [contentArticleIssue, setContentArticleIssue] = useLocalStorage<
    string | ''
  >('addIssueInfoArticleIssue', '')

  const [contentTitle, setContentTitle] = useLocalStorage<string>(
    'addIssueInfoTitle',
    '',
  )

  const [contentIssuePrice, setContentIssuePrice] = useLocalStorage<string>(
    'addIssueInfoPrice',
    '',
  )

  const [contentSlug, setContentSlug] = useLocalStorage<string>(
    'addIssueInfoSlug',
    '',
  )
  const [altImage, setAltImage] = useLocalStorage<string | ''>(
    'addIssueInfoAltImage',
    '',
  )

  const clearState = () => {
    setSeoContent({
      title: '',
      description: '',
      keywords: '',
    })
    setSelectedImage(null)
    setContentImage(null)
    setContentInfoIssue('')
    setContentTitle('')
    setContentIssuePrice('')
    setContentSlug('')
    setAltImage('')
    setContentArticleIssue('')
  }

  const handleInputChange = (key: string, value: string) => {
    setSeoContent((prevData: any) => ({
      ...prevData,
      [key]: value,
    }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    let uploadedImageId = null

    try {
      const uploadResponse = await handleImageUpload()

      if (!uploadResponse) {
        throw new Error('Error uploading image')
      }

      uploadedImageId = uploadResponse.data._id

      if (
        !(
          uploadedImageId &&
          contentTitle &&
          contentInfoIssue &&
          contentArticleIssue
        )
      ) {
        toast.error(`Всі поля повинні бути заповнені...`, {
          style: {
            borderRadius: '10px',
            background: 'grey',
            color: '#fff',
          },
        })
        return
      }

      const data = {
        isActive: true,
        slug: contentSlug,
        title: contentTitle,
        price: contentIssuePrice,
        image: uploadedImageId,
        metadata: seoContent,
        description: contentArticleIssue,
        info: contentInfoIssue,
        benefits: [],
      }

      const response = await postData(`/issues`, data)

      if (response.status === 201) {
        toast.success(`Послугу додано!`, {
          style: {
            borderRadius: '10px',
            background: 'grey',
            color: '#fff',
          },
        })
        clearState()
        router.refresh()
      } else {
        throw new Error('Error posting data')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error(`Помилка сервера...`, {
        style: {
          borderRadius: '10px',
          background: 'grey',
          color: '#fff',
        },
      })

      if (uploadedImageId) {
        try {
          const deleteResponse = await deleteData(`/images/${uploadedImageId}`)
          console.log('Delete Response:', deleteResponse)
        } catch (deleteError) {
          console.error('Error deleting image:', deleteError)
        }
      }
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      const file = e.currentTarget.files[0]

      if (file) {
        setSelectedImage(file)
        const reader = new FileReader()
        reader.onloadend = () => {
          setContentImage(reader.result as string | ArrayBuffer | null)
        }

        reader.readAsDataURL(file)
      }
    }
  }
  const handleImageUpload = async () => {
    try {
      if (selectedImage) {
        const response = await uploadImg({
          fileInput: selectedImage,
          alt: altImage,
          type: 'picture',
        })
        return response
      }
      return null
    } catch (error) {
      throw new Error('Error uploading image')
    }
  }

  return (
    <Accordion
      itemClasses={{ base: 'border-white-dis ' }}
      variant='bordered'
      className=' shadow-2xl'
    >
      <AccordionItem
        textValue='1'
        key='1'
        startContent={<IoMdAddCircle size={40} color='#fff' fill='#fff' />}
        title={
          <span className='text-center font-exo_2 text-2xl font-bold text-white-dis'>
            Додати послугу з додатковою інформацією
          </span>
        }
      >
        <div className='container  flex flex-col items-center  gap-[60px] px-4 transition-all duration-300  ease-in-out'>
          <form className='flex w-full items-end justify-evenly gap-3 text-white-dis '>
            <div className='flex w-full flex-col gap-8'>
              <div className='flex justify-between gap-3 '>
                <div className='flex flex-col gap-3'>
                  <p className=' bold mt-2 text-center font-exo_2 text-xl'>
                    Зображення
                  </p>
                  <div className='relative'>
                    {!contentImage ? (
                      <div className=' flex h-[300px] w-[500px] items-center justify-center'>
                        <p>NO IMAGE</p>
                      </div>
                    ) : (
                      <div>
                        <Image
                          className='max-h-[300px] w-[500px] object-contain object-center'
                          src={
                            typeof contentImage === 'string' ? contentImage : ''
                          }
                          width={400}
                          height={100}
                          alt=''
                        />
                      </div>
                    )}
                    <input
                      className=' text-white-dis'
                      id='icon'
                      type='file'
                      accept='icon/*'
                      onChange={handleImageChange}
                    />
                  </div>

                  <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
                    Опис зображення(alt)
                    <input
                      required
                      className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
                      type='text'
                      name='altImage'
                      value={altImage}
                      onChange={e => {
                        setAltImage(e.target.value)
                      }}
                    />
                  </label>
                </div>
                <div className='flex w-[400px] flex-col justify-between'>
                  <p className=' bold mt-2 text-center font-exo_2 text-xl'>
                    SEO налаштування
                  </p>
                  <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
                    Seo title
                    <input
                      required
                      className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
                      type='text'
                      name='title'
                      value={seoContent.title || ''}
                      onChange={e => handleInputChange('title', e.target.value)}
                    />
                  </label>
                  <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
                    Seo description
                    <input
                      required
                      className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
                      type='text'
                      name='description'
                      value={seoContent.description || ''}
                      onChange={e =>
                        handleInputChange('description', e.target.value)
                      }
                    />
                  </label>
                  <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
                    Seo keywords
                    <input
                      required
                      className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
                      type='text'
                      name='keywords'
                      value={seoContent.keywords || ''}
                      onChange={e =>
                        handleInputChange('keywords', e.target.value)
                      }
                    />
                  </label>
                </div>
              </div>
              <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
                Вартість послуги
                <input
                  required
                  className='font-base h-[45px] w-[300px] indent-3 text-md text-black-dis'
                  type='text'
                  name='price'
                  value={contentIssuePrice}
                  onChange={e => setContentIssuePrice(e.target.value)}
                />
              </label>
              <label className='flex  flex-col gap-1 text-center font-exo_2 text-xl'>
                Заголовок
                <input
                  required
                  className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
                  type='text'
                  name='title'
                  value={contentTitle}
                  onChange={e => {
                    setContentSlug(createSlug(e.target.value))
                    setContentTitle(e.target.value)
                  }}
                />
              </label>
              <label className='flex  flex-col gap-1 text-center font-exo_2 text-xl'>
                Slug(url сторінки)
                <input
                  required
                  className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
                  type='text'
                  name='slug'
                  value={contentSlug}
                  onChange={e => {
                    setContentSlug(e.target.value)
                  }}
                />
              </label>
            </div>
          </form>
          {/* <div className='w-full'>
            <AddImagesSection />
          </div> */}
          <div className='flex w-full flex-col items-center gap-2 '>
            <p className='text-center font-exo_2 text-xl text-white-dis'>
              Інформація послуги
            </p>
            <CustomAddContent
              id='add-issue-info-content'
              setContent={setContentInfoIssue}
              content={contentInfoIssue}
            />
          </div>
          {/* <div className='w-full'>
            <AddImagesSection />
          </div> */}
          <div className='flex w-full flex-col items-center gap-2 '>
            <p className='text-center font-exo_2 text-xl text-white-dis'>
              Стаття послуги
            </p>
            <CustomAddContent
              id='add-issue-article-content'
              setContent={setContentArticleIssue}
              content={contentArticleIssue}
            />
          </div>
          <div className='flex w-full flex-col items-center justify-center'>
            <div className='flex w-full  flex-col-reverse  justify-center '>
              <div className='  w-full border-b-2 border-mid-grey' />
              <p className='mb-6 text-center font-exo_2 text-2xl font-bold  text-white-dis  max-lg:text-xl'>
                Послуги сервісного обслуговування
              </p>
            </div>
          </div>
          <div className=' flex h-[200px] w-full flex-col items-center justify-center gap-2 overflow-auto '>
            <p className='font-exo_2 text-2xl font-bold text-white-dis'>
              В розробці...
            </p>
            <p className='font-exo_2 text-xl font-bold text-white-dis'>
              Послуги сервісного обслуговування можна додати після створення, в
              розділі редагування послуги...
            </p>
          </div>
          <div className='mb-8'>
            <SendButton handleSubmit={handleSubmit} />
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  )
}

export default AddIssueInfoSection
