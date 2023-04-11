import Link from 'next/link'
import { useSession, signIn, signOut, getSession } from "next-auth/react"

function Navbar() {
  // const {session, loading} = useSession()
const { data: session, loading } = useSession()
// const result = useSession()
console.log({ session })
  return (
    <nav className='header'>
      <h1 className='logo'>
        <a href='#'>NextAuth</a>
      </h1>
      <ul className={`main-nav ${!session && loading ? 'loading' : 'loaded'}`}>
        <li>
          <Link href='/'>
            Home
          </Link>
        </li>
        <li>
          <Link href='/dashboard'>
            Dashboard
          </Link>
        </li>
        <li>
          <Link href='/blog'>
            Blog
          </Link>
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
    </nav>
  );
}

export default Navbar