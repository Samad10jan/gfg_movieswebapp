import { CircularProgress, Button } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieDetails } from "../../api/movies";
import type { TitleDetailsType } from "../../utils/types";
import type { RootState, AppDispatch } from "../../store";

// inlined person shape (derived from TitleDetailsType)
type PersonEntry = TitleDetailsType["stars"][number];

function StarRating({ value }: { value: number }) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-2xl text-amber-400">★</span>
            <span className="text-3xl font-bold text-white tabular-nums">{value.toFixed(1)}</span>
            <span className="text-sm text-slate-400">/10</span>
        </div>
    );
}

function PersonCard({ person, role }: { person: PersonEntry; role: string }) {
    return (
        <div className="flex items-center gap-3 rounded-3xl bg-slate-900/80 p-3 transition hover:bg-slate-900">
            {person.primaryImage?.url ? (
                <img
                    src={person.primaryImage.url}
                    alt={person.displayName}
                    className="h-12 w-12 rounded-full object-cover ring-1 ring-white/10"
                />
            ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 text-sm text-slate-200">
                    {person.displayName[0]}
                </div>
            )}
            <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">{person.displayName}</p>
                <p className="truncate text-xs uppercase tracking-[0.16em] text-slate-500">{role}</p>
            </div>
        </div>
    );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
            {children}
        </h3>
    );
}

export default function MovieDetails() {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { movieDetails: movie, loading, error } = useSelector((state: RootState) => state.movieDetails);

    useEffect(() => {
        if (params.id) {
            dispatch(getMovieDetails(params.id) as any);
        }
    }, [dispatch, params.id]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
                <CircularProgress sx={{ color: '#38bdf8' }} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-950 text-red-400 px-4 text-center">
                {error}
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-300 px-4 text-center">
                404 - Movie not found
            </div>
        );
    }

    const m = movie as TitleDetailsType;
    const voteDisplay = m.rating?.voteCount >= 1000 ? `${(m.rating.voteCount / 1000).toFixed(1)}K` : m.rating?.voteCount;
    const displayType = m.type?.replaceAll('_', ' ');

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIosNewIcon fontSize="small" />}
                        onClick={() => navigate(-1)}
                        sx={{ borderColor: 'rgba(148, 163, 184, 0.2)', color: '#cbd5e1' }}
                    >
                        Back to browse
                    </Button>
                    <div className="text-sm text-slate-400">ID : {m.id}</div>
                </div>

                <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
                    <div className="space-y-6 rounded-4xl border border-white/10 bg-slate-900/80 p-5 shadow-2xl">
                        <img
                            src={m.primaryImage?.url}
                            alt={m.primaryTitle}
                            className="w-full rounded-3xl object-cover"
                        />
                        <div className="space-y-2">
                            <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">Title details</p>
                            <div className="grid gap-2 text-sm text-slate-300">
                                {displayType && (
                                    <div className="flex items-center justify-between rounded-2xl bg-slate-950/80 px-4 py-3">
                                        <span>Category</span>
                                        <span className="font-semibold text-white">{displayType}</span>
                                    </div>
                                )}
                                {m.startYear && (
                                    <div className="flex items-center justify-between rounded-2xl bg-slate-950/80 px-4 py-3">
                                        <span>Year</span>
                                        <span className="font-semibold text-white">{m.startYear}</span>
                                    </div>
                                )}
                                {m.rating && (
                                    <div className="rounded-2xl bg-slate-950/80 px-4 py-3">
                                        <StarRating value={m.rating.aggregateRating} />
                                        <p className="mt-2 text-sm text-slate-400">{voteDisplay} votes</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="rounded-4xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl">
                            <div className="mb-4 flex flex-wrap items-center gap-3">
                                <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs uppercase tracking-[0.25em] text-cyan-200">
                                    {displayType}
                                </span>
                                {m.genres?.map((genre) => (
                                    <span key={genre} className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                                        {genre}
                                    </span>
                                ))}
                            </div>
                            <h1 className="text-3xl font-bold text-white">{m.primaryTitle}</h1>
                            <p className="mt-4 text-slate-300 leading-relaxed">{m.plot}</p>
                        </div>

                        <div className="grid gap-8 sm:grid-cols-2">
                            <div className="rounded-4xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl">
                                <SectionLabel>Cast</SectionLabel>
                                {m.stars?.length ? (
                                    <div className="space-y-3">
                                        {m.stars.slice(0, 4).map((person) => (
                                            <PersonCard key={person.id} person={person} role="Actor" />
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-slate-400">Cast information is not available.</p>
                                )}
                            </div>

                            <div className="rounded-4xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl">
                                <SectionLabel>Creative team</SectionLabel>
                                <div className="space-y-3">
                                    {m.directors?.length > 0 && (
                                        <PersonCard person={m.directors[0]} role="Director" />
                                    )}
                                    {m.writers?.length > 0 && (
                                        <PersonCard person={m.writers[0]} role="Writer" />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="rounded-4xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl">
                            <SectionLabel>Production details</SectionLabel>
                            <div className="grid gap-3 text-sm text-slate-300">
                                {m.originCountries?.length > 0 && (
                                    <div className="flex items-center justify-between rounded-2xl bg-slate-950/80 px-4 py-3">
                                        <span>Country</span>
                                        <span>{m.originCountries.map((c) => c.name).join(', ')}</span>
                                    </div>
                                )}
                                {m.spokenLanguages?.length > 0 && (
                                    <div className="flex items-center justify-between rounded-2xl bg-slate-950/80 px-4 py-3">
                                        <span>Language</span>
                                        <span>{m.spokenLanguages.map((l) => l.name).join(', ')}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}