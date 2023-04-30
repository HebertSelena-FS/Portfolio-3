import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'





const Searchalbum =  (props) => {


  const { data: session }= useSession()
  console.log({ session })
  const [query, setQuery] = useState('')
  const [tracks, setTracks] = useState([])
  const [data, setdata] = useState()

  const [loading, setLoading] = useState(false);
  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.spotify.com/v1/search?query=${query}&type=artist&locale=en-US%2Cen%3Bq%3D0.9&offset=0&limit=20`,{
        headers: {
          "Content-type":"application/json",
          Accept: "application/json",
          Authorization: `Bearer ${session.accessToken}`
        }
      })
      .then(response => {
        // Handle response
        console.log('this did work ')
        return response.text(); // Return response text
      })
      .then(text => {
        // Parse response text into JSON and return
        const data = JSON.parse(text);
        return data;
      });
      // ?.artists.items
      setdata(response?.artists.items);
      console.log(response, "response log")
    } catch (error) {
      // Handle error
      console.log('this did not work error:', error);
    } finally {
      setLoading(false);
    }
    
  };
  return (
    <div>
      <div className='search-body' >  
            <input className='search' onChange={(e)=>setQuery(e.target.value)} placeholder='search' type="text" id="search-artist"></input>
            <button className='button-search' onClick={handleSearch} >Search</button>
          </div> 
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className='album-card-display'>
  <div className='album-row'>
    {data?.map((item) => (
      <div className='album-card-container' key={item.id}>
        {item.images.length > 0 ? (
          <Link href={item.external_urls.spotify}>
            <h3 className='album-title'>{item.name}</h3>
            <img
              src={item.images.length > 0 ? item.images[0].url : ''}
              width="160px"
              height="160px"
            />
          </Link>
        ) : (
          ''
        )}
      </div>
    ))}
  </div>
</ul>

      )}
      
    </div>
  );
  }

    export default Searchalbum