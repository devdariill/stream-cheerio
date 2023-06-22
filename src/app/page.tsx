import { load } from 'cheerio'

async function getChallenges () {
  interface NextData {
    props: {
      initialState: {
        'v2/challenges': {
          entities: Record<string, { title: string, description: string }>
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
      <ul>
        {challenges.map(challenge => (
          <li key={challenge.title}>
            <h2>{challenge.title}</h2>
          </li>
        ))}
      </ul>
    </main>
  )
}
