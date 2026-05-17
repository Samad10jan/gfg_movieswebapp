import axios from "axios";
import { setMovies } from "../slice/movieSlice";

const URL= import.meta.env.API_URL;
//thunk action creator function have thunk function as return type
export const getMovies = (pageToken?:string) => async (dispatch: any) => {

    
    try {
        const response = await axios.get(`https://api.imdbapi.dev/titles?pageToken=${pageToken || ""}`);
        console.log(response.data);
        dispatch(setMovies(response.data.titles));
        
    } catch (error) {
        
    }

}