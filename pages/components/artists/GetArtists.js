import React, { useContext, useState } from "react";
import { ArtistContext } from "../../context/artistContext";

export default function GetArtists() {
  const [album, setAlbum] = useState("");
  const { setArtists } = useContext(ArtistContext);

  let GetArtists = async () => {
    let tokenres = await fetch("/api/spotify?token=true", {
      method: "POST",
    });

    let tokenResponse = await tokenres.json();

    let response = await fetch(
      `https://api.spotify.com/v1/search?type=artist&include_external=audio&q=${album}`,
      {
        headers: {
          Authorization: "Bearer " + tokenResponse.res.access_token,
          "Content-type": "application/json",
        },
      }
    );
    let data = await response.json();
    setArtists(data.artists.items);
  };
  return (
    <div className="flex flex-col gap-10  p-5 justify-center items-center mx-auto">
      <input
        placeholder="artist name"
        value={album}
        onChange={(e) => setAlbum(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg"
      />
      <button
        className="mx-3 my-2 p-2 rounded-xl bg-gray-700 hover:bg-gray-500 text-white text-xl"
        onClick={() => GetArtists()}
      >
        Get Artists
      </button>
    </div>
  );
}
