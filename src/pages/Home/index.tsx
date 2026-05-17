import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../../api/movies";

const Home = () => {
    const [pageToken, setPageToken] = useState("");
    const dispatch = useDispatch<any>();

    const { movies } = useSelector((state: any) => state.movies);
    console.log(movies[0]);

    useEffect(() => {
        dispatch(getMovies(pageToken));
    }, [pageToken]);
    // nextPageToken
    return <>
        {
            movies.map((movie: any) => (
                <div key={movie.id}>
                    <h2>{movie.originalTitle}</h2>
                    <p>{movie.startYear}</p>

                </div>
            ))
        }
        {/* <button onClick={()=>setPageToken(data.nextPageToken)}>Next</button> */}


    </>;
};

export default Home;