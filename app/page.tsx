import * as cheerio from 'cheerio'

export const revalidate = 60 // invalidate every minute
const PAGES = 3

export default async function Home() {

  const headlines = [] as string[]

  for (let i = 1; i <= PAGES; i++){
    const URL = `https://www.nbcsports.com/fantasy/football/player-news?f0=Headline&p=${i}`
    const resp = await fetch(URL)
    const text = await resp.text()
    const $ = cheerio.load(text)

    const news = $('.PlayerNewsPost-name').map(function() {
      return $(this).text();
      }).toArray();

    headlines.push(...news)
  }

  let date = new Date().toDateString()
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      <ul>
        {headlines.map((headline, i) => <li key={i}>{headline}</li>)}
      </ul>
      </div>
      <div>{date}</div>
    </main>
  );
}
