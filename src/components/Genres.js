import { Chip } from "@material-ui/core";
import axios from "axios"
import { useEffect } from "react";

const Genres=(props)=>{
    const {genres,setGenres,selctedGenres,setselctedGenres,page}=props;
    const fetchdata=async()=>{
        const {data}=await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        setGenres(data.genres);
    }
    const handleAdd=(val)=>{
        setselctedGenres([...selctedGenres,val]);
        setGenres(genres.filter(genre=>genre.id!==val.id));
    }
    const handleDelete=(val)=>{
        setGenres([...genres,val]);
        setselctedGenres(selctedGenres.filter(genre=>genre.id!==val.id))
    }
    useEffect(() => {
        fetchdata();
        setGenres(genres.filter(m=>m.name!=='Action'));
        return ()=>{
            setGenres({});
        };
    }, [])
    
    return (
        <div>
            {selctedGenres && selctedGenres.map(genre=><Chip  key={genre.id} label={genre.name} style={{margin:2}} size='small' color="primary" clickable onDelete={()=>handleDelete(genre)}/>)}
            {genres && genres.map(genre=><Chip  key={genre.id} label={genre.name} style={{margin:2}} size='small' clickable onClick={()=>handleAdd(genre)}/>)}
        </div>
    )
}
export default Genres;