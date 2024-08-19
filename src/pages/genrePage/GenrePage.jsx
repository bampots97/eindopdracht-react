import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function GenrePage() {
    const { genreId } = useParams();
    const [genre, setGenre] = useState(null);
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGenreData = async () => {
            setLoading(true);
            try {

                const genreResponse = await axios.get(`https://api.rawg.io/api/genres/${genreId}`, {
                    params: { key: 'e5cf16af5f9b4197a4de0b78162808bf' },
                });
                setGenre(genreResponse.data);


                const gamesResponse = await axios.get('https://api.rawg.io/api/games', {
                    params: {
                        key: 'e5cf16af5f9b4197a4de0b78162808bf',
                        genres: genreId,
                    },
                });
                setGames(gamesResponse.data.results);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchGenreData();
    }, [genreId]);

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {!loading && !error && (
                <>
                    <h1>{genre?.name} </h1>
                    <p>{genre?.description}</p>
                    <h2>Games in this Genre:</h2>
                    <ul>
                        {games.map(game => (
                            <li key={game.id}>
                                <img src={game['image_background']} alt={game.name} />
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

export default GenrePage;