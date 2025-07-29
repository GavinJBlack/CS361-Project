import React from 'react';
import Header from '../components/Header';
import { useSuggestions } from '../context/SuggestionsContext';

export default function VoteCountsPage() {
    const { suggestedMovies, votes } = useSuggestions();

    return (
        <div
            style={{
                minHeight: '100vh',
                width: '100vw',
                background: '#222',
            }}
        >
            <Header
                title="Vote Counts"
                subtitle="See how many votes each movie received"
            />

            <div
                style={{
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {suggestedMovies.map(m => (
                    <div
                        key={m.id}
                        style={{
                            width: '100%',
                            maxWidth: '320px',
                            background: '#FFAF3F',
                            borderRadius: '8px',
                            padding: '1rem',
                            margin: '0.5rem 0',
                            color: '#000',
                        }}
                    >
                        <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                            {m.title}
                        </div>
                        <div>
                            {votes[m.id] > 0
                                ? `${votes[m.id]} vote${votes[m.id] > 1 ? 's' : ''}`
                                : 'No votes'}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
