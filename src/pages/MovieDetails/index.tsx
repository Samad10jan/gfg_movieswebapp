import { Chip, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../../api/movies";
import type { TitleDetailsType } from "../../lib/types";

// inlined person shape (derived from TitleDetailsType)
type PersonEntry = TitleDetailsType["stars"][number];

// helpers 
function StarRating({ value }: { value: number }) {
    return (
        <div className="flex items-center gap-2">
            <div className="relative inline-block text-2xl leading-none" >

                <span
                    className=" text-amber-400"

                >
                    ★★★★★
                </span>
            </div>
            <span className="text-[#f5c518] font-bold text-lg tabular-nums">{value.toFixed(1)}</span>
            <span className="text-gray-500 text-sm">/10</span>
        </div>
    );
}

function PersonCard({ person, role }: { person: PersonEntry; role: string }) {
    return (
        <div className="flex items-center gap-3 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
            {person.primaryImage?.url ? (
                <img
                    src={person.primaryImage.url}
                    alt={person.displayName}
                    className="w-10 h-10 rounded-full object-cover object-top shrink-0 ring-1 ring-white/20"
                />
            ) : (
                <div className="w-10 h-10 rounded-full bg-gray-700 shrink-0 flex items-center justify-center text-gray-400 text-xs font-bold">
                    {person.displayName[0]}
                </div>
            )}
            <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">{person.displayName}</p>
                <p className="text-xs text-gray-500 truncate capitalize">{role}</p>
            </div>
        </div>
    );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
            {children}
        </h3>
    );
}

// main component  
export default function MovieDetails() {
    const params = useParams();
    const dispatch = useDispatch();
    const { movieDetails: movie, loading, error } = useSelector((state: any) => state.movieDetails);

    useEffect(() => {
        dispatch(getMovieDetails(params.id as string) as any);
    }, [dispatch, params.id]);

    if (loading)
        return (
            <div className="flex justify-center items-center h-screen bg-gray-950">
                <CircularProgress sx={{ color: "#f5c518" }} />
            </div>
        );
    if (error)
        return (
            <div className="flex justify-center items-center h-screen bg-gray-950 text-red-400 text-sm">
                {error}
            </div>
        );
    if (!movie) return (
        <div className="flex justify-center items-center h-screen bg-gray-950 text-red-400 text-sm">
            404 - Movie not found
        </div>
    );

    const m = movie as TitleDetailsType;

    const voteDisplay =
        m.rating?.voteCount >= 1000
            ? `${(m.rating.voteCount / 1000).toFixed(1)}K`
            : m.rating?.voteCount;

    return (
        <div className="min-h-screen bg-gray-950 text-white font-sans">

            {/* Main content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 relative">

                {/* Poster + title row */}
                <div className="flex gap-6 items-end mb-8 pt-10">
                    <img
                        src={m.primaryImage?.url}
                        alt={m.primaryTitle}
                        className="w-32 sm:w-40 rounded-2xl shadow-2xl shrink-0 ring-1 ring-white/10"
                    />
                    <div className="pb-1">
                        <div className="flex flex-wrap gap-1.5 mb-2">
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#f5c518]/20 text-[#f5c518] uppercase tracking-wide">
                                {m.type === "tvSeries" ? "TV Series" : m.type}
                            </span>
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/10 text-gray-300 uppercase tracking-wide">
                                {m.startYear}
                            </span>
                        </div>

                        <h1 className="text-2xl sm:text-3xl font-bold leading-tight mb-3">
                            {m.primaryTitle}
                        </h1>

                        {m.genres?.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                                {m.genres.map((g) => (
                                    <Chip
                                        key={g}
                                        label={g}
                                        size="small"
                                        variant="outlined"
                                        sx={{
                                            color: "#d1d5db",
                                            borderColor: "#374151",
                                            fontSize: 11,
                                            height: 22,
                                            borderRadius: "6px",
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {m.rating && (
                        <div className=" absolute top-10 right-5 mb-6 p-2 rounded-2xl bg-white/5 border border-white/10 inline-flex flex-col gap-1">
                            <StarRating value={m.rating.aggregateRating} />
                            <p className="text-xs text-gray-500">{voteDisplay} ratings</p>
                        </div>
                    )}
                </div>

                {/* Rating */}


                {/* Plot */}
                <p className="text-gray-300 text-sm leading-relaxed mb-10 max-w-2xl">{m.plot}</p>

                {/* ── Cast & crew grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

                    {m.stars?.length > 0 && (
                        <div>
                            <SectionLabel>Stars</SectionLabel>
                            <div className="flex flex-col gap-2">
                                {m.stars.map((p) => (
                                    <PersonCard key={p.id} person={p} role="actor" />
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col gap-6">
                        {m.directors?.length > 0 && (
                            <div>
                                <SectionLabel>
                                    {m.directors.length === 1 ? "Director" : "Directors"}
                                </SectionLabel>
                                <div className="flex flex-col gap-2">
                                    {m.directors.map((p) => (
                                        <PersonCard key={p.id} person={p} role="director" />
                                    ))}
                                </div>
                            </div>
                        )}

                        {m.writers?.length > 0 && (
                            <div>
                                <SectionLabel>
                                    {m.writers.length === 1 ? "Writer" : "Writers"}
                                </SectionLabel>
                                <div className="flex flex-col gap-2">
                                    {m.writers.map((p) => (
                                        <PersonCard key={p.id} person={p} role="writer" />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Footer meta ── */}
                <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap gap-6 text-sm text-gray-400">
                    {m.originCountries?.length > 0 && (
                        <div>
                            <span className="text-gray-600 uppercase text-[10px] tracking-wider font-semibold block mb-0.5">
                                Country
                            </span>
                            {m.originCountries.map((c) => c.name).join(", ")}
                        </div>
                    )}
                    {m.spokenLanguages?.length > 0 && (
                        <div>
                            <span className="text-gray-600 uppercase text-[10px] tracking-wider font-semibold block mb-0.5">
                                Language
                            </span>
                            {m.spokenLanguages.map((l) => l.name).join(", ")}
                        </div>
                    )}
                    {m.interests?.length > 0 && (
                        <div>
                            <span className="text-gray-600 uppercase text-[10px] tracking-wider font-semibold block mb-0.5">
                                Interests
                            </span>
                            {m.interests.map((i) => i.name).join(", ")}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}