import { Link } from "react-router-dom";
import type { MoviesCardType } from "../../lib/types";
import StarIcon from "@mui/icons-material/Star";
type Props = {
    data: MoviesCardType;
};

export default function MovieCard({ data }: Props) {

    return (
        <Link to={`/movie/${data.id} `} className="group relative w-full aspect-2/3 rounded-2xl overflow-hidden cursor-pointer bg-black shadow-md  hover:shadow-2xl transition-all ">

            {/* Poster */}
            {data.primaryImage?.url && (
                <img
                    src={data.primaryImage.url}
                    alt={data.primaryTitle}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            )}


            <div className="absolute inset-0 bg-linear-to-t   group-hover:from-black/95 group-hover:via-black/40 transition-all " />

            {/* Rating badge */}
            {data.rating?.aggregateRating && (
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-black backdrop-blur-sm rounded-lg px-2 py-0.5">
                    <StarIcon className="size-5 text-amber-300" />
                    <span className="text-[0.68rem] font-bold text-white">
                        {data.rating?.aggregateRating}
                    </span>
                </div>
            )}
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-black backdrop-blur-sm rounded-lg px-2 py-0.5">
                🤍

            </div>

            {/* Content — slides up on hover */}
            <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 pt-2 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all text-white">

                {/* Title */}
                <h3 className="font-serif font-bold text-sm sm:text-[0.95rem] leading-snug line-clamp-2 mb-1">
                    {data.primaryTitle}
                </h3>

                {/* Type · Year */}
                <p className="text-[0.68rem] text-white/55 tracking-wide mb-2">
                    {[
                        data.type,
                        data.startYear,
                        data.endYear ? `– ${data.endYear}` : null,
                    ]
                        .filter(Boolean)
                        .join(" · ")}
                </p>

                {/* Genres */}
                {data.genres?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                        {data.genres.slice(0, 2).map((genre) => (
                            <span
                                key={genre}
                                className="text-[0.6rem] text-white/80 bg-white/10 border border-white/15 backdrop-blur-sm rounded-md px-2 py-0.5"
                            >
                                {genre}
                            </span>
                        ))}
                    </div>
                )}


            </div>
        </Link>
    );
}