import { useEffect, useState } from "react"
import MovieList from '../components/MovieList'



export default function Home() {
    const [movies, setMovies] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    
    const apiKey = import.meta.env.VITE_APP_API_KEY

    useEffect(() => {
        fetchMovies('James Bond')
    }, [])

    useEffect(() => {
        if (search.length >= 3) {
            fetchMovies(search)
        } else if (search.length === 0){
            fetchMovies('James Bond')
        }
    },[search])

    const fetchMovies = async (query) => {
        setLoading(true)
        setError('')
        try {
            const response = await fetch (
                `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`
            )
            const data = await response.json()
            
            if (data.Response === 'True')  {
                setMovies(data.Search)
            } else {
                setMovies([])
                setError('Ingen filmer funnet.')
            }
        } catch (err) {
            setError('Noe gikk galt. Prøv igjen.')
        }
        setLoading(false)
    }


    return (
    <main>
        <header>
            <h1>Filmsøk</h1>
        </header> 
        
        <section className="search-section">
  <label htmlFor="search">Søk etter film</label>
  <input id="search" type="search" placeholder="Skriv her..." value={search} onChange={(e) => setSearch(e.target.value)} />
  <button onClick={() => fetchMovies(search)}>Søk</button>
</section>

        
        {loading && <p>Laster filmer..</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && <MovieList movies={movies} />}
    </main>  
    ) 
}