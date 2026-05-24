import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../../api/movies";
import MovieCard from "../../components/MovieCard";
import { Spinner } from "../../components/Spinner";
import type { MoviesCardType } from "../../utils/types";
import type { RootState, AppDispatch } from "../../store";
import { clearFilters } from "../../slice/movieSlice";

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { movies, paginationValues, loading, error, filters } = useSelector(
        (state: RootState) => state.movies
    );

    const { nextPageToken, totalCount } = paginationValues;

    const filteredMovies = movies
        .filter((movie) => {
            if (filters.type && movie.type?.toLowerCase() !== filters.type.toLowerCase()) {
                return false;
            }
            if (
                filters.genre &&
                !movie.genres?.some(
                    (genre) => genre.toLowerCase() === filters.genre?.toLowerCase()
                )
            ) {
                return false;
            }
            return true;
        });

    const handleLoadMore = () => {
        if (nextPageToken) {
            dispatch(getMovies(nextPageToken) as any);
        }
        window.scrollTo({
            top: 5,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        dispatch(getMovies() as any);
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            {loading && <Spinner/>}

            {error && (
                <div className="p-4 text-center">
                    <div className="bg-red-50/10 border border-red-500/10 rounded-3xl p-4 inline-block">
                        <p className="text-red-300 font-semibold">⚠️ Error</p>
                        <p className="text-red-200 text-sm">{error}</p>
                    </div>
                </div>
            )}

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <section className="mb-8 rounded-4xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-xl">
                    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300 mb-2">Discover titles</p>
                            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                                Explore movies, series, and documentaries.
                            </h1>
                            <p className="mt-3 max-w-2xl text-slate-400">
                                Browse all titles, search by name, and refine results using genre and type filters.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <button
                                type="button"
                                onClick={() => dispatch(clearFilters())}
                                className="rounded-full border border-slate-700 bg-slate-800/80 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300 hover:text-white"
                            >
                                Clear filters
                            </button>
                            <div className="rounded-full bg-slate-950/80 px-4 py-2 text-sm text-slate-300 ring-1 ring-white/10">
                                {filteredMovies.length} results{totalCount ? ` of ${totalCount}` : ''}
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-300">
                        {filters.type && (
                            <span className="rounded-full bg-cyan-500/15 px-3 py-2 text-cyan-200">Type: {filters.type}</span>
                        )}
                        {filters.genre && (
                            <span className="rounded-full bg-fuchsia-500/15 px-3 py-2 text-fuchsia-200">Genre: {filters.genre}</span>
                        )}
                    </div>
                </section>

                {!loading && !error && (
                    <div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {filteredMovies.length > 0 ? (
                                filteredMovies.map((movie: MoviesCardType) => (
                                    <MovieCard key={movie.id} data={movie} />
                                ))
                            ) : (
                                <div className="col-span-full rounded-3xl border border-white/10 bg-slate-900/70 p-8 text-center text-slate-400">
                                    <p className="text-xl font-semibold text-white">No titles matched your filters.</p>
                                    <p className="mt-2 text-sm">Try clearing filters or searching for a different title.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {!loading && !error && nextPageToken && filteredMovies.length > 0 && (
                    <div className="flex justify-center mt-10">
                        <button
                            onClick={handleLoadMore}
                            className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                        >
                            Load More
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;