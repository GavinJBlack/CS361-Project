import { useState } from 'react';
import Header from '../components/Header';
import MovieCard from '../components/MovieCard';
import { useSuggestions } from '../context/SuggestionsContext';

export default function SuggestionsPage() {
    const [selectedId, setSelectedId]  = useState(null);
    const [voted, setVoted]            = useState(false);
    const { suggestedMovies, voteFor } = useSuggestions();

    const handleVote = () => {
        if (!selectedId) {
            return alert('Choose one!');
        }

        const movie = suggestedMovies.find(m => m.id === selectedId);
        const title = movie ? movie.title : selectedId;

        if (window.confirm(`Are you sure you want to vote for "${title}"?`)) {
            voteFor(selectedId);
            setVoted(true);
        }
    };

    return (
        <div style={{ minHeight: '100vh', width: '100vw', background: '#222' }}>
            <Header title="Suggestions" subtitle="View & Vote" />

            <div
                style={{
                    paddingTop: 100,
                    padding: '1rem',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    columnGap: '1rem',
                    rowGap: '1rem',
                    width: '100%',
                    margin: '0 auto',
                }}
            >
                {suggestedMovies.map(m => (
                    <MovieCard
                        key={m.id}
                        movie={m}
                        showInfo
                        selected={m.id === selectedId}
                        onSelect={id => {
                            if (!voted) setSelectedId(id);
                        }}
                    />
                ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
                <button
                    disabled={voted}
                    onClick={handleVote}
                    style={{
                        padding: '1rem 2rem',
                        borderRadius: '20px',
                        background: voted ? '#555' : '#FFAF3F',
                        color: voted ? '#999' : '#000',
                        border: 'none',
                        cursor: voted ? 'not-allowed' : 'pointer',
                        fontSize: '1rem',
                    }}
                >
                    {voted ? 'Voted' : 'Vote'}
                </button>
            </div>
        </div>
    );
}
