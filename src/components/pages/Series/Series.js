import axios from "axios";
import { useEffect, useState } from "react";
import SingleContent from "../SingleContent";
import { img_300 } from '../../../config/config';
import '../SingleContent.css'
import CustomPagination from "../Pagination/CustomPagination";
import useGenre from "../../../hooks/useGenre";
import Genres from "../../Genres";


const Series = () => {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const [genres, setGenres] = useState([]);
    const [selctedGenres, setselctedGenres] = useState([]);
    const genreURL=useGenre(selctedGenres);
    const fetchdata = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_video=false&with_genres=${genreURL}`);
        setContent(data.results);
        console.log(content);
        setPage(data.total_pages);
        window.scroll(0,0);
    }
    useEffect(() => {
        fetchdata();
    }, [page,genres])

    return (
        <div className="conatiner">
            <span className="heading">Tv Series</span>
            <Genres 
            genres={genres}
            setGenres={setGenres}
            selctedGenres={selctedGenres}
            setselctedGenres={setselctedGenres}
            setPage={setPage}
            />
          <div className="trending">{content.map(tv => <SingleContent
                key={tv.id}
                id={tv.id}
                title={tv.name}
                image={`${img_300}/${tv.poster_path}`}
                media_type={'Series'}
                release_date={tv.release_date || tv.first_air_date}
                vote_average={tv.vote_average} 
                />  
            )
            }
            </div>
            {content.length==0 && <h1>No Series Found</h1>}
            <CustomPagination setPage={setPage} numOfPages={page}/>
        </div>);
}
export default Series;
