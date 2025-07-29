/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';

const SuggestionsContext = createContext();

export function SuggestionsProvider({ children }) {
    const [suggestedMovies, setSuggestedMovies] = useState([]);
    const [votes, setVotes] = useState({});

    function suggestMovies(moviesArray) {
        setSuggestedMovies(moviesArray);
        setVotes({});
    }

    function voteFor(id) {
        setVotes(prev => ({
            ...prev,
            [id]: (prev[id] || 0) + 1
        }));
    }

    return (
        <SuggestionsContext.Provider
            value={{ suggestedMovies, suggestMovies, votes, voteFor }}
        >
            {children}
        </SuggestionsContext.Provider>
    );
}

export function useSuggestions() {
    return useContext(SuggestionsContext);
}
