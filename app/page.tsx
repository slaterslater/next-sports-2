import * as cheerio from 'cheerio'
// import Link from 'next/link'
// import { IoMdRefresh } from "react-icons/io";

export const revalidate = 60 // invalidate every minute
const PAGES = 3

export default async function Home() {

  const headlines = [] as string[]

  for (let i = 1; i <= PAGES; i++){
    const URL = `https://www.nbcsports.com/fantasy/football/player-news?f0=Headline&p=${i}`
    const resp = await fetch(URL)
    const text = await resp.text()
    const $ = cheerio.load(text)

    const news = $('.PlayerNewsPost').map(function() {
      const postClone = $(this).clone();
      postClone.find('.PlayerNewsPost-footer').remove();
      return postClone.html();
      }).toArray();

    headlines.push(...news)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5">
      {/* <nav>
        <ul>
          <li><Link href="/" title="go to top">NFL</Link></li>
          <li><Link href="/" title="go to top">Jays</Link></li>
          <li><Link href="/" title="go to top"><IoMdRefresh /></Link></li>
        </ul>
      </nav> */}
      <div className="z-10 w-full max-w-lg items-center justify-between font-mono text-sm lg:flex">
      <ul>
        {headlines.map((headline, i) => 
          <li key={i} className='mb-10 border-b pb-5 snap-y'>
            <div dangerouslySetInnerHTML={{__html: headline}} />
          </li>
        )}    
      </ul>
      </div>
    </main>
  );
}
