import React, {useState, useEffect} from 'react';
import '../MovieDatabase.css'

function MovieDatabase() {
  const [movieName, setMovieName] = useState("");
  const [movieList, setMovieList] = useState(new Set());
  
  //useEffect helps to achieve the local data persistency by using localStorage
  useEffect(() => {
      let data = localStorage.getItem("movies");
      if(data) {
          setMovieList(new Set(JSON.parse(data)));
      }
  }, []);

  useEffect(() => {
      localStorage.setItem("movies", JSON.stringify(Array.from(movieList)))
  });

  //The following function helps to update the state and input value depending on the user input. The validation will also occur and the user may not leave the input field empty or keep only non-numerical characters. 
  function typeMovie(e) {
    document.querySelector(".add-input").classList.remove("error");
    document.querySelector("#error").style.display="none";
     setMovieName(e.target.value);
  }
  const movies = document.querySelector(".movie-list");

  //addMovie function helps us to add the movie to the movie list and update the state
  function addMovie() {
    if((movieName.search(/\w/g) == -1) || movieName.length == 0) {
        document.querySelector(".add-input").classList.add("error");
        document.querySelector("#error").style.display="block";
    } else {
        setMovieList(prev => new Set([...prev,movieName.toUpperCase()]));
        movies.style.display = "block";
        setTimeout(() =>{
          document.querySelectorAll("li").forEach((elem) => elem.classList.add("show")); 
        }, 100);
        setMovieName("");
    }
  }

  //Toggler function helps to hide or show the movie list
  function toggler() {
      if(movies.style.display == "block") {
        document.querySelectorAll("li").forEach((elem) => elem.classList.remove("show")); 
          movies.style.display = "none";
          document.querySelector(".show-movies").innerText = "Show list";
      } else {
          movies.style.display = "block";
          setTimeout(() =>{
            document.querySelectorAll("li").forEach((elem) => elem.classList.add("show")); 
          }, 100);
          document.querySelector(".show-movies").innerText = "Hide list";
      }
  }

  //to delete a movie from the list - we can delete items by targeting the previous subling next to the button which is the movie name and then the movie list should be updated in the state.
  function deleteItem(e) {
    let deleteElem = e.target.previousSibling.innerText;
    setMovieList(prev => new Set([...prev].filter(p => p != deleteElem)));
  }

  return (
      <div className="container">
           <h1>My movie database</h1>
           <div className="flex-items" >
            <div className="add-movie">
                <input type="text" value={movieName} onChange={typeMovie} placeholder="Movie name" className="add-input"/>
                <button type="submit" onClick={addMovie} className="add-button">Add</button>
                <span id="error">* Please add a valid name!</span>
            </div>
            <button onClick={toggler} className="show-movies">Show list</button>
            <ul className="movie-list">
              {
                Array.from(movieList).map(movie => <li key={movie}><span>{movie}</span><button className="delete-button" onClick={deleteItem}>Delete</button></li> )
                }
            </ul>
           </div>
      </div>
  )
}

export default MovieDatabase;