import MovieCard from './MovieCard'

export default function MovieList({ movies }) {
    return (
        <section className="movie-list">
            {movies.map((movie, index) => (
                <MovieCard key={`${movie.imdbID}${index}`} movie={movie} />
            ))}
        </section>
    )
}