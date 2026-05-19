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

////
export type TitleDetailsType = {
  id: string;
  type: string;
  primaryTitle: string;
  primaryImage: {
    url: string;
    width: number;
    height: number;
  };
  startYear: number;
  genres: string[];
  rating: {
    aggregateRating: number;
    voteCount: number;
  };
  plot: string;

  directors: {
    id: string;
    displayName: string;
    alternativeNames?: string[];
    primaryImage: {
      url: string;
      width: number;
      height: number;
    };
    primaryProfessions: string[];
  }[];

  writers: {
    id: string;
    displayName: string;
    alternativeNames?: string[];
    primaryImage: {
      url: string;
      width: number;
      height: number;
    };
    primaryProfessions: string[];
  }[];

  stars: {
    id: string;
    displayName: string;
    alternativeNames?: string[];
    primaryImage: {
      url: string;
      width: number;
      height: number;
    };
    primaryProfessions: string[];
  }[];

  originCountries: {
    code: string;
    name: string;
  }[];

  spokenLanguages: {
    code: string;
    name: string;
  }[];

  interests: {
    id: string;
    name: string;
  }[];
};