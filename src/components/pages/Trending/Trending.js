import axios from "axios";
import { useEffect, useState } from "react";
import SingleContent from "../SingleContent";
import { img_300 } from '../../../config/config';
import '../SingleContent.css'
// import BasicPagination from "../Pagination/BasicPagination";
// import Pagination from "../Pagination/Pagination";
import CustomPagination from "../Pagination/CustomPagination";


const Trending = () => {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const fetchdata = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);
        // console.log(data.results);
        setContent(data.results);
        window.scroll(0,0);
    }

    useEffect(() => {
        fetchdata();
    }, [page])

    return (
        <div className="conatiner">
            <span className="heading">Trending</span>
            <div className="trending">{content.map(movie => <SingleContent
                key={movie.id}
                id={movie.id}
                title={movie.title || movie.original_title}
                image={`${img_300}/${movie.poster_path}`}
                media_type={movie.media_type?'Movie':'Tv Series'}
                release_date={movie.release_date}
                vote_average={movie.vote_average} 
                />
                
            )
            }
            </div>
            <CustomPagination setPage={setPage} numOfPages={10}/>
        </div>);
}
export default Trending;