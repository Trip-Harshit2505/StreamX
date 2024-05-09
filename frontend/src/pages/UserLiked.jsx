import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUsersLikedMovies } from '../store/features';
import { API_END_POINT } from '../utils/constant';
import axios from 'axios';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Card from '../components/Card';

export default function UserLiked() {

    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const movies = useSelector((state) => state.netflix.movies);
    const dispatch = useDispatch();
    const email = localStorage.getItem("userEmail");

    useEffect(() => {
        if (email) {
            dispatch(getUsersLikedMovies(email));
        }
    }, [email]);

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
            <Navbar isScrolled={isScrolled} />
            <div className="content flex column">
                <h1>My List</h1>
                <div className="grid flex">
                    {
                        movies.map((movie, index) => {
                            return <Card movieData={movie} index={index} key={movie.id} isLiked={true} />
                        })
                    }
                </div>
            </div>
        </Container>
    )
}

const Container = styled.div`
    .content {
        margin: 2.3rem;
        margin-top: 8rem;
        gap: 3rem;
        h1 {
        margin-left: 3rem;
        }
        .grid {
        flex-wrap: wrap;
        gap: 1rem;
        }
    }
`;
