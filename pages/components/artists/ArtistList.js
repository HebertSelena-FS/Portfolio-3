import React, { useContext } from "react";
import { ArtistContext } from "../../context/artistContext";

export default function List() {
  const { artists } = useContext(ArtistContext);
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-10  p-5 justify-center items-center mx-auto">
      {artists &&
        artists.map((artist, key) => (
          <div
            key={key}
            className="flex flex-col gap-10  p-5 justify-center items-center mx-auto shadow-sm hover:shadow-2xl transition-shadow duration-500 ease-in-out"
          >
            <img src={artist.images[0].url} alt="artist" />
            <h3>{artist.name}</h3>
            <p>{artist.albums[0].name}</p>
          </div>
        ))}
    </div>
  );
}
