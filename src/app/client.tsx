/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react'

interface Chanllenges {
  title: string
  description: string
  heroImage: string
}
interface Props {
  challenges: Chanllenges []
}

function HomePageClient ({ challenges: initialState }: Props) {
  const [challenges, setChallenges] = useState<Chanllenges[]>(initialState)
  const [challenge] = challenges

  const handleDislike = () => {
    setChallenges((_challenges) => _challenges.slice(1))
  }

  const [liked, setLiked] = useState<Chanllenges[]>([])
  const handleLike = () => {
    setLiked((_liked) => _liked.concat(challenge))
  }

  const handleReset = () => {
    setChallenges(initialState)
    setLiked([])
  }

  const [setshowLiked, setSetshowLiked] = useState(false)
  const handleShowLiked = () => {
    setSetshowLiked(true)
  }
  const handleHideLiked = () => {
    setSetshowLiked(false)
  }

  return (
    <div>
      <article className='bg-gray-900 p-4 rounded ' key={challenge.title}>
        <img src={challenge.heroImage} alt={challenge.title} className='w-full' />
        <h3 className='text-xl font-medium my-3'>{challenge.title}</h3>
        <p className='line-clamp-3 text-white/80'>{challenge.description}</p>
      </article>
      <footer className='flex justify-evenly gap-4 my-3'>
        <button className='bg-red-400 py-1 px-3 rounded' onClick={handleDislike} type='button'>Dislike</button>
        <button className='py-1 px-3 rounded' onClick={handleReset} type='button'>Restart</button>
        <button className='py-1 px-3 rounded' onClick={handleShowLiked} type='button'>Selected</button>
        <button className='bg-green-500 py-1 px-3 rounded' onClick={handleLike} type='button'>Like</button>
      </footer>
    </div>
  )
}

export default HomePageClient
