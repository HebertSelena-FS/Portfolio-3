// import React, { useContext } from "react";
// import { AlbumContext } from "../../context/albumContext";

// export default function List() {
//   const { albums } = useContext(AlbumContext);
//   return (
//     <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-10  p-5 justify-center items-center mx-auto">
//       {albums &&
//         albums.map((album, key) => (
//           <div
//             key={key}
//             className="flex flex-col gap-10  p-5 justify-center items-center mx-auto shadow-sm hover:shadow-2xl transition-shadow duration-500 ease-in-out"
//           >
//             <img src={album.images[0].url} alt="album" />
//             <h3>{album.name}</h3>
//             <p>{album.artists[0].name}</p>
//             {/* <p>{album.tracks[0].name}</p> */}
//           </div>
//         ))}
//     </div>
//   );
// }
import React, { useContext } from "react";
import { AlbumContext } from "../../context/albumContext";

export default function List() {
  const { albums } = useContext(AlbumContext);
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-10  p-5 justify-center items-center mx-auto">
      {albums &&
        albums.map((album, key) => (
          <div
            key={key}
            className="flex flex-col gap-10  p-5 justify-center items-center mx-auto shadow-sm hover:shadow-2xl transition-shadow duration-500 ease-in-out"
          >
            <img src={album.images[0].url} alt="album" />
            <h3>{album.name}</h3>
            <p>{album.artists[0].name}</p>
            {album.tracks && (
              <ul>
                {album.tracks.map((track, key) => (
                  <li key={key}>{track.name}</li>
))}
</ul>
)}
</div>
))}
</div>
);
}
