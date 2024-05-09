import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMovies, getGenres } from '../store/features';
import axios from 'axios';
import { API_END_POINT } from '../utils/constant';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import NotAvailable from '../components/NotAvailable';
import Slider from '../components/Slider';
import SelectGenre from '../components/SelectGenre';

export default function TVShows() {

    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const movies = useSelector((state) => state.netflix.movies);
    const genres = useSelector((state) => state.netflix.genres);
    const genresLoaded = useSelector((state) => state.netflix.genresLoaded)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGenres());
    }, []);

    useEffect(() => {
        if (genresLoaded) {
            dispatch(fetchMovies({ genres, type: "tv" }));
        }
    }, [genresLoaded]);

    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                await axios.get(`${API_END_POINT}/protectedRoute`, {
                    withCredentials: true
                });
                // console.log(res);
            } catch (error) {
                console.log(error);
                if (error.response.status === 401) {
                    navigate("/login");
                }
            }
        };

        checkLoggedIn();

        const cleanup = () => {
            window.onscroll = null;
        };

        window.onscroll = () => {
            setIsScrolled(window.pageYOffset === 0 ? false : true);
            return () => (window.onscroll = null);
        };

        return cleanup;
    }, [navigate]);

    return (
        <Container>
            <div className="navbar">
                <Navbar isScrolled={isScrolled} />
            </div>
            <div className="data">
                <SelectGenre genres={genres} type="tv" />
                {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
            </div>
        </Container>
    )
}

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;
