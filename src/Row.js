import React, {useEffect, useState} from 'react';
import axios from './axios';
import './Row.css';
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import NavigateBeforeOutlinedIcon from '@material-ui/icons/NavigateBeforeOutlined';
import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined';
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {db} from './firebase'


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

    // handle when a movie is clicked on
    // This doesn't work with all titles due to movie trailer package not being able to find right url
    const handleClick = (movie) => {
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
    };

    // //This functionallity does not work yet
    // const scrollRight = (movies) => {
    //     movies.scrollLeft += 45;
    //     console.log(movies);
    // };

    const addFavorite=(movie)=>{
        db.collection('favorites').add({
            movie :movie,
        })
    }


    return (
        <div className= "row" id ='row'>
            <h2>{title}</h2>
            <div className={"row_posters"}>
                {movies.map(movie =>(
                    <div className="movieControls">  
                        <AddIcon 
                        onClick={e =>addFavorite(movie)}
                        className ="favoritesButton" />
                        {/*This will populate the about section of the movie */}
                        <MoreVertIcon 
                        className = "infoButton"/>
                        <img
                        onClick={() => handleClick(movie)}
                        key={movie.id}
                        className={`row_poster ${isLargeRow && "row_posterLarger"}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                        />
                        
                    </div>
                ))}
                <div className="row_left">
                    <NavigateBeforeOutlinedIcon/>
                </div>
                <div className="row_right">
                    <NavigateNextOutlinedIcon/>
                </div>  
            </div>

            {trailerUrl &&<YouTube videoId={trailerUrl} opts={opts}/>}
        </div>
    )
}

export default Row
