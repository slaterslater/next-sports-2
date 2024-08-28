import * as cheerio from 'cheerio'

export const revalidate = 60 // invalidate every minute

export default async function Home() {

  const URL = 'https://www.nbcsports.com/fantasy/football/player-news?f0=Headline&p=1'
  const resp = await fetch(URL)
  const text = await resp.text()
  const $ = cheerio.load(text)

  const names = $('.PlayerNewsPost-name').map(function() {
    return $(this).text();
    }).toArray();

  let date = new Date().toDateString()
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      <ul>
        {names.map((name, i) => <li key={i}>{name}</li>)}
      </ul>
      </div>
      <div>{date}</div>
    </main>
  );
}
