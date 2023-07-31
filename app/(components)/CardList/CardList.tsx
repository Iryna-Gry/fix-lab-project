import axios from 'axios';
import React from 'react'
import { Location } from '@/app/(utils)/types';
import { CardItem } from './CardItem';
const { NEXT_APP_BASE_URL } = process.env;


async function getData() {
  const response = await fetch(`${NEXT_APP_BASE_URL}/api/locations`)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc
  if (response.status !== 200) {
  //   // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return response.json();
}

export const CardList = async() => {
    const locations = await getData();
  return (
      <ul className='w-full lg:flex lg:gap-6'>{locations && locations.map((item: Location) => (<CardItem {...item} key={item.id} />))}</ul>
  )
}
