import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CreatorPage() {
    const { id } = useParams();
    const [creator, setCreator] = useState(null);
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCreatorData = async () => {
            setLoading(true);
            try {
                const creatorResponse = await axios.get(`https://api.rawg.io/api/creators/${id}`, {
                    params: { key: 'e5cf16af5f9b4197a4de0b78162808bf' },
                });

                setCreator(creatorResponse.data);

                const gamesResponse = await axios.get('https://api.rawg.io/api/games', {
                    params: {
                        key: 'e5cf16af5f9b4197a4de0b78162808bf',
                        creators: id,
                    },
                });
                setGames(gamesResponse.data.results);
                console.log(gamesResponse.data.results);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCreatorData();
    }, [id]);

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {!loading && !error && (
                <>
                    <h1>{creator?.name}</h1>
                    <p>{creator?.description}</p>
                    <h2>Games by this Creator:</h2>
                    <ul>
                        {games.map(game => (
                            <li key={game.id}>
                                <a href={game.url} target="_blank" rel="noopener noreferrer">
                                    {game.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

export default CreatorPage;
