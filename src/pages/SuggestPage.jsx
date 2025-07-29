import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import MovieCard from '../components/MovieCard';
import { useSuggestions } from '../context/SuggestionsContext';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function SuggestPage() {
    const [searchTerm, setSearchTerm]           = useState('');
    const [showInfo, setShowInfo]               = useState(false);
    const [searchResults, setSearchResults]     = useState([]);
    const [popularMovies, setPopularMovies]     = useState([]);
    const [selectedMovies, setSelectedMovies]   = useState([]);
    const [submitted, setSubmitted]             = useState(false);

    const navigate      = useNavigate();
    const { suggestMovies } = useSuggestions();
    const TITLE_BAR_HEIGHT = 100;

    const handleSearch = async () => {
        if (!searchTerm) return;
        try {
            const res = await fetch(
                `https://api.themoviedb.org/3/search/movie?` +
                `api_key=${API_KEY}&query=${encodeURIComponent(searchTerm)}`
            );
            const { results } = await res.json();
            if (!results?.length) {
                setSearchResults([]);
                return;
            }
            const top = results[0];
            const cred = await fetch(
                `https://api.themoviedb.org/3/movie/${top.id}/credits?api_key=${API_KEY}`
            ).then(r => r.json());
            const director = cred.crew?.find(c => c.job === 'Director')?.name || '';

            setSearchResults([
                {
                    id: `${top.id}`,
                    title: top.title,
                    director,
                    year: top.release_date?.slice(0, 4) || '',
                    poster: top.poster_path
                        ? `https://image.tmdb.org/t/p/w200${top.poster_path}`
                        : '',
                },
            ]);
        } catch {
            setSearchResults([]);
        }
    };

    const handlePopular = async () => {
        try {
            const res = await fetch(
                `https://api.themoviedb.org/3/movie/popular?` +
                `api_key=${API_KEY}&language=en-US&page=1`
            );
            const { results } = await res.json();
            const top20 = results.slice(0, 20);

            const enriched = await Promise.all(
                top20.map(async mv => {
                    const cred = await fetch(
                        `https://api.themoviedb.org/3/movie/${mv.id}/credits?api_key=${API_KEY}`
                    ).then(r => r.json());
                    const director = cred.crew?.find(c => c.job === 'Director')?.name || '';
                    return {
                        id: `${mv.id}`,
                        title: mv.title,
                        director,
                        year: mv.release_date?.slice(0, 4) || '',
                        poster: mv.poster_path
                            ? `https://image.tmdb.org/t/p/w200${mv.poster_path}`
                            : '',
                    };
                })
            );

            setPopularMovies(enriched);
        } catch {
            setPopularMovies([]);
        }
    };

    const handleClear = () => {
        setSearchResults([]);
        setPopularMovies([]);
    };

    const dynamic = [
        ...searchResults,
        ...popularMovies.filter(m => !searchResults.some(s => s.id === m.id))
    ].filter(m => !selectedMovies.some(sm => sm.id === m.id));

    const displayed = [...selectedMovies, ...dynamic];

    const toggleSelect = id => {
        if (submitted) return;
        const exists = selectedMovies.some(m => m.id === id);
        if (exists) {
            setSelectedMovies(prev => prev.filter(m => m.id !== id));
        } else {
            const movie = displayed.find(m => m.id === id);
            movie && setSelectedMovies(prev => [...prev, movie]);
        }
    };

    const handleSubmit = () => {
        if (!selectedMovies.length) {
            return alert('Pick at least one movie!');
        }
        if (
            window.confirm(
                `Submit suggestions for: ${selectedMovies
                    .map(m => m.title)
                    .join(', ')}?`
            )
        ) {
            suggestMovies(selectedMovies);
            setSubmitted(true);
            navigate('/');
        }
    };

    return (
        <div style={{ minHeight: '100vh', width: '100vw', background: '#222' }}>
            <Header
                title="Suggest a Movie"
                subtitle="Search or view popular, select as many as you like, then submit"
            />

            <div
                style={{
                    paddingTop: TITLE_BAR_HEIGHT,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '1rem',
                }}
            >

                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        placeholder="Search…"
                        style={{
                            padding: '0.5rem',
                            width: '240px',
                            borderRadius: '20px',
                            border: '1px solid #555',
                            background: '#333',
                            color: '#eee',
                        }}
                    />
                    <button onClick={handleSearch} style={btnStyle('#0066CC')}>
                        Search
                    </button>
                    <button onClick={handlePopular} style={btnStyle('#00AA66')}>
                        View Popular Movies
                    </button>
                    <button onClick={handleClear} style={btnStyle('#AA0066')}>
                        Clear Unselected
                    </button>
                </div>

                <label style={{ marginBottom: '1rem', color: '#eee' }}>
                    <input
                        type="checkbox"
                        checked={showInfo}
                        onChange={e => setShowInfo(e.target.checked)}
                        style={{ marginRight: '0.5rem' }}
                    />
                    Show Movie Info
                </label>

                <div
                    style={{
                        display:          'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 240px))',
                        justifyContent:   'center',
                        columnGap:        '1rem',
                        rowGap:           '1rem',
                        width:            '100%',
                        padding:          '1rem 0',
                    }}
                >
                    {displayed.map(m => (
                        <MovieCard
                            key={m.id}
                            movie={m}
                            showInfo={showInfo}
                            selected={selectedMovies.some(sm => sm.id === m.id)}
                            onSelect={toggleSelect}
                        />
                    ))}
                </div>

                <div style={{ color: 'red', margin: '1rem 0' }}>
                    Note: you cannot change these suggestions once submitted.
                </div>
                <button
                    disabled={submitted}
                    onClick={handleSubmit}
                    style={{
                        padding:      '1rem 2rem',
                        borderRadius: '20px',
                        background:   submitted ? '#555' : '#FFAF3F',
                        color:        submitted ? '#999' : '#000',
                        border:       'none',
                        cursor:       submitted ? 'not-allowed' : 'pointer',
                        fontSize:     '1rem',
                    }}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

// helper for control buttons
const btnStyle = bg => ({
    padding:      '0.5rem 1rem',
    borderRadius: '20px',
    border:       'none',
    background:   bg,
    color:        '#fff',
    cursor:       'pointer',
});
