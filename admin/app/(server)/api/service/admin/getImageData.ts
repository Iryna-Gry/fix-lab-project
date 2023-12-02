/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import { auth } from 'admin/auth'
import type { AxiosResponse } from 'axios'
import axios from 'axios'

const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL as string

export default async function getImageData(url: string): Promise<any> {
  try {
    const session = await auth()

    if (session?.user.token === undefined) {
      throw new Error('Headers are undefined')
    }

    const response: AxiosResponse = await axios.get(`${apiUrl}${url}`, {
      headers: {
        Authorization: `Bearer ${session.user.token}`,
      },
    })

    if (!response.data) {
      throw new Error('No data received')
    }

    return response
  } catch (error) {
    throw new Error('Failed to fetch data')
  }
}
