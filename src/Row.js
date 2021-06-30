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
    // This doesn't work with all titles due to movie trailer package not being able to find right url


    const handleClick = (movie) => {
        console.log(movie);
        console.log(movie.title || movie.name);
        if(trailerUrl){
            setTrailerUrl("");
        }else{
            movieTrailer(movie?.title || movie?.name || "")
                .then((url) =>{
                   const urlParams = new URLSearchParams(new URL(url).search);
                   setTrailerUrl(urlParams.get("v"));
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
