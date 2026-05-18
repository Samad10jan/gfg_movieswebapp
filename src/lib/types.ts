export type MoviesCardType = {
    id: string;
    type: string;
    primaryTitle: string;
    originalTitle: string;

    primaryImage?: {
        url: string;
        width: number;
        height: number;
    };

    startYear: number;
    endYear?: number;

    runtimeSeconds?: number;

    genres: string[];

    rating?: {
        aggregateRating: number;
        voteCount: number;
    };

    plot: string;
};

export type MoviesResponseType = {
    titles: MoviesCardType[];
    totalCount: number;
    nextPageToken: string;
};