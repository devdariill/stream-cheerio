import { load } from 'cheerio'
import HomePageClient from './client'

// export const dynamic = 'force-dynamic'

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
  // const html = await fetch('https://www.frontendmentor.io/challenges', { next: { revalidate: 100 } }).then(res => res.text())
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
      {/* <ul className='grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]'>
        {challenges.map(challenge => (
          <li className='bg-gray-900 p-4 rounded' key={challenge.title}>
            <img src={challenge.heroImage} alt={challenge.title} />
            <h3 className='text-xl font-medium my-3'>{challenge.title}</h3>
            <p className='line-clamp-3 text-white/80'>{challenge.description}</p>
          </li>
        ))}
      </ul> */}
      <HomePageClient challenges={challenges} />
    </main>
  )
}
