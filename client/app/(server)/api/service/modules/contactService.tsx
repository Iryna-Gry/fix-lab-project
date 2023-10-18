import fetchDataFromServer from '../helpers/fetchDataFromServer'

export interface IContact {
  _id: string
  isActive: boolean
  area: string
  address: string
  comment: string | null
  subways: string[]
  phones: string[]
  workingTime: string
  workingDate: string
  coords: {
    lat: number
    lang: number
  }
  image: {
    src: string
    alt: string
  }
  googlePluginLink: string
  googleMapLink: string
}

export const getAllContactsData = async (): Promise<IContact[]> => {
  const endpoint = '/contacts'
  return fetchDataFromServer(endpoint)
}
