import React, {useEffect, useState} from 'react';
import axios from './axios';
import './Row.css';
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original";

function Row({ title , fetchUrl, isLargeRow}) {
    // add state for the movies
    const [movies, setMovies] =useState([]); 
    // state for the trailer url
    const [trailerUrl, setTrailerUrl] = useState("");   
    
    //code that runs conditionaly
    useEffect(()=> {
        //make a request to the data base
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results)
            return request;
        };
        fetchData();
    }, [fetchUrl]);

    // properties of trailer player
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
    };

    //handle when a movie is clicked on
    // This still doesn't work the url is not being gotten right


    const handleClick = (movie) => {
        if(trailerUrl){
            setTrailerUrl("");
        }else{
            movieTrailer(movie?.name || "")
                .then((url) =>{
                   const urlParams = new URLSearchParams(new URL(url).search);
                   setTrailerUrl(urlParams.get("v"));
                   console.log(url);
                })
            .catch((error)=> console.log(error))
        }
    }

    return (
        <div className= "row">
            <h2>{title}</h2>
            <div className={"row_posters"}>
                {movies.map(movie =>(
                    <img
                        onClick={() => handleClick(movie)}
                        key={movie.id}
                        className={`row_poster ${isLargeRow && "row_posterLarger"}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                        alt={movie.name}
                    /> 
                ))}
            </div>
            {trailerUrl &&<YouTube videoId={trailerUrl} opts={opts}/>}
        </div>
    )
}

export default Row
