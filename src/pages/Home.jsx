import { useNavigate } from 'react-router-dom';
import TitleBar from '../components/TitleBar';
import { useSuggestions } from '../context/SuggestionsContext';

export default function Home() {
    const nav = useNavigate();
    const { suggestedMovies } = useSuggestions();
    const hasSuggested = suggestedMovies.length > 0;
    const TITLE_BAR_HEIGHT = 100;

    return (
        <div
            style={{
                minHeight: '100vh',
                width: '100vw',
                background: '#222',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <TitleBar />

            <div
                style={{
                    flex: 1,
                    paddingTop: TITLE_BAR_HEIGHT,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '2rem',
                }}
            >
                <button
                    onClick={() => nav('/suggest')}
                    disabled={hasSuggested}
                    style={{
                        padding: '1rem 2rem',
                        borderRadius: '20px',
                        background: hasSuggested ? '#555' : '#8B5E00',
                        color: hasSuggested ? '#888' : '#fff',
                        border: 'none',
                        fontSize: '1rem',
                        textDecoration: hasSuggested ? 'line-through' : 'none',
                        cursor: hasSuggested ? 'not-allowed' : 'pointer',
                    }}
                >
                    Suggest a Movie
                </button>

                <button
                    onClick={() => nav('/view')}
                    style={{
                        padding: '1rem 2rem',
                        borderRadius: '20px',
                        background: '#FFAF3F',
                        color: '#000',
                        border: 'none',
                        fontSize: '1rem',
                        cursor: 'pointer',
                    }}
                >
                    View Suggestions
                </button>

                {hasSuggested && (
                    <button
                        onClick={() => nav('/counts')}
                        style={{
                            padding: '1rem 2rem',
                            borderRadius: '20px',
                            background: '#0066CC',
                            color: '#fff',
                            border: 'none',
                            fontSize: '1rem',
                            cursor: 'pointer',
                        }}
                    >
                        View Vote Counts
                    </button>
                )}
            </div>
        </div>
    );
}
