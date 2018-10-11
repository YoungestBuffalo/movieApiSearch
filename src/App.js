import React, { Component } from 'react';
import './App.css';
import Axios from 'axios';

class App extends Component {
  constructor(props)
  {
    super(props)

    this.state = {
      moviedetails:[],
      moviedata: {
        results: []
      }
    }

    Axios
    //.get("https://api.themoviedb.org/3/movie/" + this.state.moviedata.results.id + "?api_key=1c5e5c8716eb21608eb5122dfa2d8290&language=en-US")
    .get("https://api.themoviedb.org/3/discover/movie?api_key=1c5e5c8716eb21608eb5122dfa2d8290&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1")
    .then((response) => {
      console.log(response.data)
      this.setState({moviedata: response.data});
      response.data.results.forEach(element => {
        Axios
        .get("https://api.themoviedb.org/3/movie/" + element.id + "?api_key=1c5e5c8716eb21608eb5122dfa2d8290&language=en-US")
        .then((response) => {
          var moviedetails2 = [...this.state.moviedetails]
          moviedetails2.push(response.data)
          this.setState({moviedetails: moviedetails2})
        })
      });
    })
    this.clickSearch=this.clickSearch.bind(this)
  }
  getMovieDetails(id){
//loop through moviedets array, find movie with same id
var movie = this.state.moviedetails.find((row) => {return row.id === id})
//var search = this.moviedata.title;

//when found, return movie details in divs
if(movie){
return <div>
  <div>{movie.tagline}</div>
  <div>{movie.release_date}</div>
  <div>Runtime:{" " + movie.runtime + " "}minutes</div>
  <div>Budget:{" " + "$" + movie.budget}</div>
  <div>Status:{" " + movie.status}</div>
  </div>

}
else 
{
  return <div></div>
}

  }
clickSearch() {
  Axios
  .get("https://api.themoviedb.org/3/search/movie?api_key=1c5e5c8716eb21608eb5122dfa2d8290&language=en-US&query="+ this.state.searchInput +"&page=1&include_adult=false")
  .then((response) => {
    
   
    this.setState({moviedata: response.data});
      response.data.results.forEach(element => {
    Axios
    .get("https://api.themoviedb.org/3/movie/" + element.id + "?api_key=1c5e5c8716eb21608eb5122dfa2d8290&language=en-US")
    .then((response) => {
      var moviedetails2 = [...this.state.moviedetails]
      moviedetails2.push(response.data)
      this.setState({moviedetails: moviedetails2})
    })
  });
})
}
  render() {
    return (
      
      <div className="App">
     <div class="topnav">
        <a class="active" href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
          <div class="search-container">

          
            <div>
              <input type="text" placeholder="Search movies.." name="search" onChange={(event)=>{this.setState({searchInput: event.target.value})}} value={this.state.searchInput} ></input>
              
              <button type="submit" onClick={this.clickSearch}><i class="fa fa-search"></i></button>
       </div>
         
   </div>
   </div>
  
 
        {this.state.moviedata.results.map( (movie) => {
          return (
           <div class="container" style={{backgroundImage: "url(https://image.tmdb.org/t/p/original" + movie.backdrop_path + ")"}}><p>
             
            <strong> <h1 className="title">{movie.title}</h1> </strong>
             <h5 className="release">Rating average:{" " + movie.vote_average}/10</h5></p>
             <div className="rating">
             <p class="page-header">Rate the movie!</p>
                <div class="chart-scale">
                  <button class="btn btn-scale btn-scale-desc-1">1</button>
                  <button class="btn btn-scale btn-scale-desc-2">2</button>
                  <button class="btn btn-scale btn-scale-desc-3">3</button>
                  <button class="btn btn-scale btn-scale-desc-4">4</button>
                  <button class="btn btn-scale btn-scale-desc-5">5</button>
                  <button class="btn btn-scale btn-scale-desc-6">6</button>
                  <button class="btn btn-scale btn-scale-desc-7">7</button>
                  <button class="btn btn-scale btn-scale-desc-8">8</button>
                  <button class="btn btn-scale btn-scale-desc-9">9</button>
                  <button class="btn btn-scale btn-scale-desc-10">10</button>
                </div>
              </div>
    
             <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} />
                <div class ="container2">
                <div class ="postertext">{this.getMovieDetails(movie.id)}</div>
                
                </div>
             <div class="text">{movie.overview}</div>

             
            </div>
           )
        } )}
      </div>
    );
  }
}

export default App;

