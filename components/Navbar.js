import Link from 'next/link'
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import logo from '../public/Spotify_Logo_RGB_Green.png'
import Image from 'next/image'

function Navbar() {
  // const {session, loading} = useSession()
const { data: session, loading } = useSession()
// const result = useSession()
console.log({ session })
const logow = '100px'
const logoh = '50px'
  return (
    <div className='header'>
      <div> 
        <Image
        src={logo}
        alt="Spotify Logo"
        className='logoimage'
        />
      <ul className="container-nav">
        <li className='nav-items' >
          {session ? <Link href='/'> Home </Link> : ""}
        </li>
        <li className='nav-items' >
          {session ? <Link href='/artist'> Artist </Link> : ""}
        </li>
        <li className='nav-items' >
          {session ? <Link href='/album'> Album </Link> : ""}
        </li>
        <li className='nav-items' >
          {session ? <Link href='/song'> Song </Link> : ""}
        </li>
      
        {!loading && !session && (
          <li>
            <Link
              href='/api/auth/signin'
              onClick={e => {
                e.preventDefault()
                // signIn('spotify')
                signIn('github')
              }}>             
                Sign In             
            </Link>
          </li>
        )}
        {session && (
          <li>
            <Link
              href='/api/auth/signout'
              onClick={e => {
                e.preventDefault()
                // signOut('spotify')
                signOut('github')
              }}>              
                Sign Out              
            </Link>
          </li>
        )}
      </ul>
      </div>
    </div>
  );
}

export default Navbar