import React from 'react';

export default function MovieCard({ movie, showInfo, onSelect, selected }) {
    return (
        <div
            onClick={() => onSelect(movie.id)}
            style={{
                width: '100%',
                maxWidth: '320px',
                border: selected
                    ? '3px solid #0a0'
                    : '1px solid #333',
                borderRadius: '8px',
                padding: '1rem',
                margin: '0.5rem 0',
                background: '#FFAF3F',
                cursor: 'pointer',
            }}
        >
            <img
                src={movie.poster}
                alt={movie.title}
                style={{ width: '100%', borderRadius: '4px' }}
            />
            {showInfo && (
                <div style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                    <div><strong>Title:</strong> {movie.title}</div>
                    <div><strong>Directed By:</strong> {movie.director}</div>
                    <div><strong>Released:</strong> {movie.year}</div>
                </div>
            )}
        </div>
    );
}
