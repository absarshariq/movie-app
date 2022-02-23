import { Container } from '@material-ui/core';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import './App.css';
import SimpleBottomNavigation from './components/BottomNav';
import Header from './components/Header';
import Movies from './components/pages/Movies/Movies';
import Series from './components/pages/Series/Series';
import Trending from './components/pages/Trending/Trending';
import SearchPage from './components/pages/Search/SearchPage';
import SearchMovies from './components/pages/Search/searchContent/SearchMovies';
import SearchTv from './components/pages/Search/searchContent/SearchTv';

function App() {
  return (

    <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
          <Routes>
            <Route path='/' element={<Trending />} />
            <Route path='/movies' element={<Movies />} />
            <Route path='/series' element={<Series />} />
            <Route path='/SearchPage' element={<SearchPage />} >
              <Route path='/SearchPage/SearchMovies' element={<SearchMovies />} />
              <Route path='/SearchPage/SearchTv' element={<SearchTv />} />
            </Route>
          </Routes>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </BrowserRouter>

  );
}

export default App;
