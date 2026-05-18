import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies, searchMovies } from "../../api/movies";
import MovieCard from "../../components/MovieCard";
import type { MoviesCardType } from "../../lib/types";
import { Spinner } from "../../components/Spinner";


const Home = () => {
    const dispatch = useDispatch();
    const { movies, searchValue, loading, error } = useSelector(
        (state: any) => state.movies
    );

    useEffect(() => {
        if (searchValue === "") {
            dispatch(getMovies() as any);
            return;
        }
        // debounce search to avoid excessive API calls
        let t= setTimeout(() => {
        dispatch(searchMovies(searchValue) as any);}, 2000);

        // cleanup timeout on unmount or search value change
        return () => clearTimeout(t);
    }, [searchValue, dispatch]);

    return (
        <div>
     
            
            {loading && (
                <Spinner loading={loading}/>
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
        </div>
    );
};

export default Home;