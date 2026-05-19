import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../../api/movies";
import MovieCard from "../../components/MovieCard";
import { Spinner } from "../../components/Spinner";
import type { MoviesCardType } from "../../lib/types";


const Home = () => {
    const dispatch = useDispatch();
    const { movies, paginationValues, loading, error } = useSelector(
        (state: any) => state.movies
    );

    const { nextPageToken, totalCount } = paginationValues;

    const handleLoadMore = () => {
        if (nextPageToken) {
            dispatch(getMovies(nextPageToken) as any);
        }
        window.scrollTo({
            top: 5,
            behavior: "smooth",
        });

    }
    useEffect(() => {
        dispatch(getMovies() as any);
    }, [dispatch])
    console.log(movies);

    return (
        <div>


            {loading && (
                <Spinner loading={loading} />
            )}

            {error && (
                <div className="p-4 text-center">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 inline-block">
                        <p className="text-red-600 font-medium">⚠️ Error</p>
                        <p className="text-red-500 text-sm">{error}</p>
                    </div>
                </div>
            )}

            {!loading && !error && (
                <div>
                    <h1 className="font-extrabold text-3xl m-2">Trending</h1>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 p-4">
                        {movies.length > 0 ? (
                            movies.map((movie: MoviesCardType) => (
                                <MovieCard key={movie.id} data={movie} />
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-500">No movies found</p>
                        )}
                    </div>
                </div>
            )}

            {!loading && !error && nextPageToken && (
                <div className="flex justify-center my-4">
                    <button
                        onClick={handleLoadMore}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
};

export default Home;