import axios from "axios";
import { useEffect, useState } from "react";
import SingleContent from "../SingleContent";
import { img_300 } from '../../../config/config';
import '../SingleContent.css'
import CustomPagination from "../Pagination/CustomPagination";
import useGenre from "../../../hooks/useGenre";
import Genres from "../../Genres";


const Movies = () => {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const [genres, setGenres] = useState([]);
    const [selctedGenres, setselctedGenres] = useState([]);
    const genreURL=useGenre(selctedGenres);
    const fetchdata = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_video=false&with_genres=${genreURL}`);
        setContent(data.results);
        setPage(data.total_pages);
        window.scroll(0,0);
    }
    useEffect(() => {
        fetchdata();
    }, [page,genres])

    return (
        <div className="conatiner">
            <span className="heading">Movies</span>
            <Genres 
            genres={genres}
            setGenres={setGenres}
            selctedGenres={selctedGenres}
            setselctedGenres={setselctedGenres}
            setPage={setPage}
            />
            <div className="trending">{content.map(movie => <SingleContent
                key={movie.id}
                id={movie.id}
                title={movie.title || movie.original_title}
                image={`${img_300}/${movie.poster_path}`}
                media_type={'Movie'}
                release_date={movie.release_date}
                vote_average={movie.vote_average} 
                />
                
            )
            }
            </div>
            <CustomPagination setPage={setPage} numOfPages={page}/>
        </div>);
}
export default Movies;