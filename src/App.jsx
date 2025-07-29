import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SuggestPage from './pages/SuggestPage';
import SuggestionsPage from './pages/SuggestionsPage';
import VoteCountsPage from './pages/VoteCountsPage';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/"        element={<Home />} />
                <Route path="/suggest" element={<SuggestPage />} />
                <Route path="/view"    element={<SuggestionsPage />} />
                <Route path="/counts"  element={<VoteCountsPage />} />
            </Routes>
        </BrowserRouter>
    );
}
