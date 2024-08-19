import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './NavBar.css';

function NavBar() {
    const [genreItems, setGenreItems] = useState([]);
    const [creatorItems, setCreatorItems] = useState([]);

    const fetchGenreItems = async () => {
        try {
            const response = await axios.get('https://api.rawg.io/api/genres', {
                params: { key: 'e5cf16af5f9b4197a4de0b78162808bf' },
            });
            setGenreItems(response.data.results);
        } catch (error) {
            console.error('Error fetching genre items:', error);
        }
    };

    const fetchCreatorItems = async () => {
        try {
            const response = await axios.get('https://api.rawg.io/api/creators', {
                params: { key: 'e5cf16af5f9b4197a4de0b78162808bf' },
            });
            setCreatorItems(response.data.results);
        } catch (error) {
            console.error('Error fetching creator items:', error);
        }
    };

    useEffect(() => {
        fetchGenreItems();
        fetchCreatorItems();
    }, []);

    return (
        <nav>
            <div className="nav-container">
                <h3>TitleWhatEver</h3>
                <ul className="nav">
                    <li>
                        <NavLink to="/" className="nav-link">Home</NavLink>
                    </li>
                    <li className="dropdown">
                        <NavLink to="/genres" className="nav-link">Genres</NavLink>
                        <div className="dropdown-content">
                            <ul>
                                {genreItems.map(item => (
                                    <li key={item.id}>
                                        <NavLink to={`/genres/${item.id}`}>{item.name}</NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                    <li className="dropdown">
                        <NavLink to="/creators" className="nav-link">Creators</NavLink>
                        <div className="dropdown-content">
                            <ul>
                                {creatorItems.map(item => (
                                    <li key={item.id}>
                                        <NavLink to={`/creators/${item.id}`}>{item.name}</NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
