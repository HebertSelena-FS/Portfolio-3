import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useSession } from 'next-auth/react'
import Navbar from '@/components/Navbar'
import Search from '@/components/Searchartist'
import Searchalbum from '@/components/Searchalbum'

export default function Home() {
  const { data: session }= useSession()
  console.log({ session })
  return (
    <div className="body">
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

        <Navbar/>
        <main > 
          <div className='artist-body' >
             Lets search some Album
            
          </div> 
          
          <Searchalbum/>
        </main>
        
    </div>
  )
}