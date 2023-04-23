import Link from 'next/link'
import { useSession, signIn, signOut, getSession } from "next-auth/react"

function Navbar() {
  // const {session, loading} = useSession()
const { data: session, loading } = useSession()
// const result = useSession()
console.log({ session })
  return (
    <div className='header'>
      {/* <h1 className='logo'>
        <a href='#'>NextAuth</a>
      </h1> */}
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
  );
}

export default Navbar