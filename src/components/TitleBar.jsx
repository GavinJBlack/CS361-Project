import React from 'react';

export default function TitleBar({
                                     title = 'Movie Night Planner',
                                     subtitle = 'Use this app to suggest, view, and vote on movies for you and your friends to have a movie night!'
                                 }) {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 1000,
                background: '#C45D00',
                padding: '1rem 0',
                textAlign: 'center',
            }}
        >
            <h1 style={{ margin: 0, fontSize: '1.8rem' }}>{title}</h1>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.9rem', color: '#444' }}>
                {subtitle}
            </p>
        </div>
    );
}