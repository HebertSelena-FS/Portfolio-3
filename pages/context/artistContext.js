import { createContext, useState } from "react";

export const ArtistContext = createContext();

export default function ArtistProvider({ children }) {
  const [artists, setArtists] = useState([]);
  return (
    <ArtistContext.Provider value={{ artists, setArtists }}>
      {children}
    </ArtistContext.Provider>
  );
}