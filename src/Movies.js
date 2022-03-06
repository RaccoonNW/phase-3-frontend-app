import { useEffect } from "react"
import MovieCard from "./MovieCard"

function Movies({movies}) {

    // useEffect(() => {
    //     fetch('http://localhost:9292/movies')
    //     .then(r => r.json())
    //     .then(movies => setMovies(movies))
    //   }, [])



    const movieList = movies.map(movie => (
        <MovieCard
            key={movie.id}
            movie={movie}
            // roles={roles}
        />
    ))





    return(
        <div>
            {movieList}
        </div>
    )
}

export default Movies