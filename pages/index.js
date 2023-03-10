import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Link from 'next/link'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [data, setData] = useState()

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const url = `https://api.nasa.gov/techtransfer/patent/?q=10&engine&api_key=${apiKey}`

  const getTechTransfer = async () => {
    const res = await axios.get(url)
    const info = await res.data;
    console.log(info)
    setData(info)
  }

  useEffect(() => {
    getTechTransfer()
  }, [])

  return (
    <>
      <Head>
        <title>DSCOVRView</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
      <div className={styles.title}>
        <h1>DSCOVRView✶</h1>
        <p>Explore space innovation with NASA patents and EPIC imagery.</p>
        </div>
        <Link className={styles.link} href="/polychromatic">
          <p className={styles.polychromatic}>Polychromatic</p></Link>
        {data && data.results.map((tech, index) => (

          <div key={index}>

            {tech && tech.map((t, ind) => {
              if (ind === 10) {
                return <Image loading='lazy' className={styles.image} src={t} alt={t} key={ind} width={100} height={100}/>
              }
            })}

          </div>
        ))}
      </main>
    </>
  )
}
