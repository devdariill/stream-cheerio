/* eslint-disable @next/next/no-img-element */
import { load } from 'cheerio'

async function getChallenges () {
  interface NextData {
    props: {
      initialState: {
        'v2/challenges': {
          entities: Record<string, { title: string, description: string, heroImage: string }>
        }
      }
    }
  }

  const html = await fetch('https://www.frontendmentor.io/challenges').then(res => res.text())
  const $ = load(html)
  const nextData = JSON.parse($('#__NEXT_DATA__').html() as string) as NextData
  return Object.values(nextData.props.initialState['v2/challenges'].entities)
}
export default async function Home () {
  const challenges = await getChallenges()
  console.log(challenges)
  return (
    <main>
      <h1 className='text-xl font-bold mb4'>Frontendmentos Challenges</h1>
      <ul className='grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]'>
        {challenges.map(challenge => (
          <li className='bg-gray-900 p-4 rounded' key={challenge.title}>
            <img src={challenge.heroImage} alt={challenge.title} />
            <h3 className='text-lg font-medium'>{challenge.title}</h3>
          </li>
        ))}
      </ul>
    </main>
  )
}
