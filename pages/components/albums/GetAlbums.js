import React, { useContext, useState } from "react";
import { AlbumContext } from "../../context/albumContext";

export default function GetAlbums() {
  const [artist, setArtist] = useState("");
  const { setAlbums } = useContext(AlbumContext);

  let getAlbums = async () => {
    let tokenres = await fetch("/api/spotify?token=true", {
      method: "POST",
    });

    let tokenResponse = await tokenres.json();

    let response = await fetch(
      `https://api.spotify.com/v1/search?type=album&include_external=audio&q=${artist}`,
      {
        headers: {
          Authorization: "Bearer " + tokenResponse.res.access_token,
          "Content-type": "application/json",
        },
      }
    );
    let data = await response.json();
    let albumItems = data.albums && data.albums.items;

    if (albumItems) {
      // Fetch tracks for each album
      let albumsWithTracks = await Promise.all(
        albumItems.map(async (album) => {
          let tracksResponse = await fetch(
            `https://api.spotify.com/v1/albums/${album.id}/tracks`,
            {
              headers: {
                Authorization: "Bearer " + tokenResponse.res.access_token,
                "Content-type": "application/json",
              },
            }
          );
          let tracksData = await tracksResponse.json();
          return { ...album, tracks: tracksData.items };
        })
      );

      setAlbums(albumsWithTracks);
    }
  };
  return (
    <div className="wrapper flex flex-col gap-10  p-5 justify-center items-center mx-auto">
      <input
        placeholder="album, artist, or track name"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        className="w-1/2 p-2 border border-gray-300 rounded-lg"
      />
      <button
        className="mx-3 my-2 p-2 focus:outline-none focus:shadow-outline rounded-xl bg-gray-700 hover:bg-gray-500 text-white text-xl"
        onClick={() => getAlbums()}
      >
        Search 
      </button>
    </div>
  );
}
