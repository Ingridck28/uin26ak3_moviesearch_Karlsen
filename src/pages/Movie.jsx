import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export default function Movie() {
    const {movie} = useParams()
    const navigate = useNavigate()
    const [filmData, setFilmData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState ('')

useEffect(() => {
    const fetchMoviesDetails = async () => {
        try {
            const response = await fetch(
                `https://www.omdbapi.com/?t=${movie}&apikey=${API_KEY}`
            )
            const data = await response.json()

            if (data.Response === 'True') {
                setFilmData(data)
            } else {
                setError('Fant ikke filmen.')
            }
        } catch (err) {
            setError('Noe gikk galt.')
        }
        setLoading(false)
    }

    fetchMoviesDetails()
    }, [movie])

    if (loading) return <main><p>Laster film...</p></main>
    if (error) return <main><p>{error}</p></main>

    return (
        <main className="movie-page">
            
            <button className="back-button" onClick={() => navigate ('/')}>Tilbake</button>

            <article className="movie-details">
                {}
                {filmData.Poster !== 'N/A' ? (
                <img src={filmData.Poster} alt={filmData.Title} />
                ) : (
                    <figure className="no-poster-large">
                        <span>Ingen bilde</span>
                    </figure>
                )}

                <section className="movie-detail-info">
                    <h1>{filmData.title}</h1>
                    <p><strong>År:</strong>{filmData.Year}</p>
                    <p><strong>Sjanger:</strong>{filmData.Genre}</p>
                    <p><strong>Regissør:</strong>{filmData.Director}</p>
                    <p><strong>Skuespillere:</strong>{filmData.Actors}</p>
                    <p><strong>Vurdering:</strong>{filmData.imdbRating} / 10</p>
                    <p><strong>Varighet:</strong>{filmData.Runtime}</p>
                    <p className="plot"><strong>Handling:</strong>{filmData.Plot}</p>
                </section>
            </article>
        </main>
    )
}