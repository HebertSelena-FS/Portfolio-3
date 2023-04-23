import { useState, createContext } from 'react';

export const SearchContext = createContext();

export default function SearchProvider({ children }) {
  const [searchResults, setSearchResults] = useState({});

  return (
    <SearchContext.Provider value={{ searchResults, setSearchResults }}>
      {children}
    </SearchContext.Provider>
  );
}

// const SearchContext = createContext({
//   album: '',
//   artist: '',
//   track: '',
//   setAlbum: () => {},
//   setArtist: () => {},
//   setTrack: () => {}
// });

// const SearchContextProvider = (props) => {
//   const [album, setAlbum] = useState([]);
//   const [artist, setArtist] = useState([]);
//   const [track, setTrack] = useState([]);

//     return (
//       <SearchContext.Provider value={{ album, setAlbum, artist, setArtist, track, setTrack }}>
//         { props.children }
//       </SearchContext.Provider>
//   );
// }

// export { SearchContext, SearchContextProvider };



// import { createContext, useState } from "react";

// export const SearchContext = createContext();

// export default function SearchProvider({ children }) {
//   const [search, setSearch] = useState([])
  
//   return (
//     <SearchContext.Provider value={{ search, setSearch }}>
//       {children}
//     </SearchContext.Provider>
//   );
// }