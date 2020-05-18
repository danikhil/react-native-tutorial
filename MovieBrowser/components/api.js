const API_KEY = 'd2bb2c6e'

export const fetchSearchResult = async (page, query) => {

    const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=${page}`, {
        method: 'GET',
        headers: {'content-type': 'application/json'}
    })
    const result = await response.json()    
    return result
}

export const fetchMovieDetails = async (imdbID) => {

    const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`, {
        method: 'GET',
        headers: {'content-type': 'application/json'}
    })
    const result = await response.json()
    return result
}

/* Template 
    fetchMovieDetails(): {
        "Title": "The Avengers",
        "Year": "2012",
        "Rated": "PG-13",
        "Released": "04 May 2012",
        "Runtime": "143 min",
        "Genre": "Action, Adventure, Sci-Fi",
        "Director": "Joss Whedon",
        "Writer": "Joss Whedon (screenplay), Zak Penn (story), Joss Whedon (story)",
        "Actors": "Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth",
        "Plot": "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
        "Language": "English, Russian, Hindi",
        "Country": "USA",
        "Awards": "Nominated for 1 Oscar. Another 38 wins & 79 nominations.",
        "Poster": "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
        "Ratings": [
            {
                "Source": "Internet Movie Database",
                "Value": "8.0/10"
            },
            {
                "Source": "Rotten Tomatoes",
                "Value": "92%"
            },
            {
                "Source": "Metacritic",
                "Value": "69/100"
            }
        ],
        "Metascore": "69",
        "imdbRating": "8.0",
        "imdbVotes": "1,230,825",
        "imdbID": "tt0848228",
        "Type": "movie",
        "DVD": "N/A",
        "BoxOffice": "N/A",
        "Production": "N/A",
        "Website": "N/A",
        "Response": "True"
    }

    fetchSearchResult: {
        "Search": [
            {
                "Title": "The Avengers",
                "Year": "2012",
                "imdbID": "tt0848228",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
            },
            {
                "Title": "Avengers: Infinity War",
                "Year": "2018",
                "imdbID": "tt4154756",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
            },
            {
                "Title": "Avengers: Age of Ultron",
                "Year": "2015",
                "imdbID": "tt2395427",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg"
            },
            {
                "Title": "Avengers: Endgame",
                "Year": "2019",
                "imdbID": "tt4154796",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg"
            },
            {
                "Title": "Avengers: Endgame",
                "Year": "2019",
                "imdbID": "tt4154796",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg"
            },
            {
                "Title": "The Avengers",
                "Year": "1998",
                "imdbID": "tt0118661",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BYWE1NTdjOWQtYTQ2Ny00Nzc5LWExYzMtNmRlOThmOTE2N2I4XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg"
            },
            {
                "Title": "The Avengers: Earth's Mightiest Heroes",
                "Year": "2010–2012",
                "imdbID": "tt1626038",
                "Type": "series",
                "Poster": "https://m.media-amazon.com/images/M/MV5BYzA4ZjVhYzctZmI0NC00ZmIxLWFmYTgtOGIxMDYxODhmMGQ2XkEyXkFqcGdeQXVyNjExODE1MDc@._V1_SX300.jpg"
            },
            {
                "Title": "Ultimate Avengers",
                "Year": "2006",
                "imdbID": "tt0491703",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BNDFmZTkxMjktMzRiYS00YzMwLWFhZDctOTQ2N2NlOTAyZDJhXkEyXkFqcGdeQXVyNjgzNDU2ODI@._V1_SX300.jpg"
            },
            {
                "Title": "Ultimate Avengers II",
                "Year": "2006",
                "imdbID": "tt0803093",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BZjI3MTI5ZTYtZmNmNy00OGZmLTlhNWMtNjZiYmYzNDhlOGRkL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
            },
            {
                "Title": "Avengers Assemble",
                "Year": "2013–",
                "imdbID": "tt2455546",
                "Type": "series",
                "Poster": "https://m.media-amazon.com/images/M/MV5BMTY0NTUyMDQwOV5BMl5BanBnXkFtZTgwNjAwMTA0MDE@._V1_SX300.jpg"
            }
        ],
        "totalResults": "10",
        "Response": "True"
    }
*/