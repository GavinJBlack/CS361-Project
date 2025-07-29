import { Link } from 'react-router-dom';

export default function Header({ title, subtitle }) {
    return (
        <header style={{ background: '#C45D00', padding: '1rem', color: '#000' }}>
            <Link to="/" style={{ color: '#000', textDecoration: 'none', fontSize: '1.2rem' }}>
                ←
            </Link>
            <h1 style={{ margin: 0 }}>{title}</h1>
            {subtitle && <small>{subtitle}</small>}
        </header>
    );
}
