import { useNavigate } from 'react-router-dom'

export default function MovieCard({ movie }) {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/${movie.Title}`)
    }

    return(
        <article className="movie-card" onClick={handleClick}>
        {movie.Poster !== 'N/A' ? (
            <img src={movie.Poster} alt={movie.Title} />
        ) : ( 
            <figure className="no-poster">
                <span>Ingen bilde</span>
            </figure>
        )}
            <section className="movie-info">
            <h2>{movie.Title}</h2>
            <p>{movie.Year}</p>
             </section>
        </article>
    )
}