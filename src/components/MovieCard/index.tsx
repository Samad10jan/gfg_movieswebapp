import { Link } from "react-router-dom";
import type { MoviesCardType } from "../../utils/types";
import StarIcon from "@mui/icons-material/Star";

type Props = {
    data: MoviesCardType;
};

export default function MovieCard({ data }: Props) {
    return (
        <Link
            to={`/movie/${data.id}`}
            className="group relative w-full aspect-[2/3] overflow-hidden rounded-[28px] border border-white/10 bg-slate-950 shadow-xl shadow-slate-950/20 transition hover:-translate-y-1 hover:shadow-2xl"
        >
            {data.primaryImage?.url ? (
                <img
                    src={data.primaryImage.url}
                    alt={data.primaryTitle}
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900 text-slate-400">
                    No preview available
                </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

            {data.rating?.aggregateRating && (
                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-slate-900/90 px-3 py-1 text-[0.7rem] font-semibold text-amber-300 backdrop-blur-sm">
                    <StarIcon className="h-4 w-4" />
                    {data.rating.aggregateRating}
                </div>
            )}

            <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 transition duration-300 group-hover:opacity-100">
                <div className="rounded-3xl bg-slate-950/90 p-4 backdrop-blur-xl">
                    <h3 className="line-clamp-2 text-sm font-semibold text-white">{data.primaryTitle}</h3>
                    <p className="mt-2 text-[0.72rem] text-slate-300">
                        {[data.type.replaceAll('_', ' '), data.startYear, data.endYear ? `– ${data.endYear}` : null]
                            .filter(Boolean)
                            .join(' · ')}
                    </p>
                    {data.genres?.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                            {data.genres.slice(0, 2).map((genre) => (
                                <span key={genre} className="rounded-full bg-white/10 px-2 py-1 text-[0.65rem] text-slate-200">
                                    {genre}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}