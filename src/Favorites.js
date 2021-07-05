import React, {useEffect, useState} from 'react';
import './Row.css';
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import NavigateBeforeOutlinedIcon from '@material-ui/icons/NavigateBeforeOutlined';
import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined';
import RemoveIcon from '@material-ui/icons/Remove';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {db} from './firebase'

const base_url = "https://image.tmdb.org/t/p/original";

function Favorites({ title }) {
    // add state for the movies
    const [movies, setMovies] =useState([]); 
    // state for the trailer url
    const [trailerUrl, setTrailerUrl] = useState("");

    
    //go grab any favorites from db
    useEffect(()=> {
        //make a request to the data base
        db.collection('favorites').onSnapshot(snapshot => {
            setMovies(snapshot.docs.map(
                doc => ({id:doc.id, movie: doc.data().movie})
                ))
        } )

    },[])

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

    //This functionallity does not work yet
    // const scrollRight = (movies) => {
    //     movies.scrollLeft += 45;
    //     console.log(movies);
    // };

    const removeFavorite=(movie)=>{
        db.collection('favorites').doc(movie.id).delete()
        
    }


    return (
        <div className= "row" id ='row'>
            <h2>{title}</h2>
            <div className={"row_posters"}>
                {movies.map(movie =>(
                    <div className="movieControls">  
                        <RemoveIcon 
                        onClick={e =>removeFavorite(movie)}
                        className ="favoritesButton" />
                        {/*This will populate the about section of the movie */}
                        <MoreVertIcon 
                        className = "infoButton"/>
                        <img
                        onClick={() => handleClick(movie.movie)}
                        key={movie.movie.id}
                        className={`row_poster`}
                        src={`${base_url}${movie.movie.backdrop_path}`}
                        alt={movie.movie.name}
                        />
                        {console.log(movie)}
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

export default Favorites
