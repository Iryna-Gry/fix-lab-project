/* eslint-disable no-console */

// SSR //

export default async function fetchDataFromServer(url: string) {
  try {
    const res = await fetch(`http://95.217.34.212:30000/api${url}`)

    if (!res.ok) {
      throw new Error(res.status.toString() + res.statusText)
    }

    return await res.json()
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}