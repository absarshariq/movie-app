import './SearchPage.css';
import SearchIcon from '@material-ui/icons/Search';
import { Box, Tab, Tabs, TabPanel, TextField, ThemeProvider } from '@material-ui/core';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SingleContent from '../SingleContent';
import { img_300 } from '../../../config/config';
import CustomPagination from '../Pagination/CustomPagination';
import { createMuiTheme } from '@material-ui/core';
const SearchPage = () => {
    const [type, setType] = useState(0);
    const [page, setPage] = useState(0);
    const [content, setContent] = useState();
    const [search, setSearch] = useState();
    const [searchText, setSearchText] = useState("");
    // const [value, setValue] = useState(0);
    const fetchdata = async () => {
        try {
            const { data } = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}`);
            setContent(data.results);
            setPage(data.total_pages);
            // console.log(data.results);

        } catch (error) {
            // setContent();
        }
    }
    const theme = createMuiTheme({
        palette: {
            type: "dark",
            primary: {
                main: "#fff"
            }
        }
    })

    const handleChange = (event, newValue) => {
        console.log(newValue);
        setType(newValue);
        setPage(1);
        console.log(type);
        console.log(searchText);
        console.log(content);
    }
    console.log(content);
    useEffect(() => {
        window.scroll(0,0);
        fetchdata();
    }, [page, type, searchText])

    return (
        <ThemeProvider theme={theme}>
            <div className="container">
                <div className='search'>
                    {/* <input placeholder="Search Content" onChange={(event) => setSearchText(event.target.value)} /> */}
                    <TextField id="standard-basic" label="Search Content" variant="standard" onChange={(event) => setSearchText(event.target.value)}>
                        {/* <button onClick={fetchdata}><SearchIcon /></button> */}
                    </TextField>
                    <SearchIcon />
                </div>
                <Tabs
                    value={type}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                    
                >
                    <Tab style={{ width: "50%" }} label="Movies" />
                    <Tab style={{ width: "50%" }} label="Series" />
                </Tabs>
                {/* <span>No data Found</span> */}

                <div className="trending">{content && content.map(m => <SingleContent
                    key={m.id}
                    id={m.id}
                    title={m.title || m.original_title || m.name}
                    image={`${img_300}/${m.poster_path}`}
                    media_type={type ? "Tv Series" : "Movie"}
                    release_date={m.release_date || m.first_air_date || "----"}
                    vote_average={m.vote_average}
                />
                )
                }
                </div>
                {searchText && content !== 0 && (
                    type ? <h1>No Series Found</h1> : <h1>No Movie Found</h1>)}
                {page > 1 && <CustomPagination setPage={setPage} numOfPages={page} />}
            </div>
        </ThemeProvider>
    )
}
export default SearchPage;