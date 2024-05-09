import React, { useState } from 'react'
import styled from 'styled-components'
import BackgroundImage from '../components/BackgroundImage';
import Header from '../components/Header';
import axios from 'axios';
import { API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../store/features.js'

export default function Login() {
    const [formValues, setFormValues] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.netflix.isLoading)

    const handleLogIn = async () => {
        // console.log(formValues);
        dispatch(setLoading(true));
        try {
            const res = await axios.post(`${API_END_POINT}/login`, formValues,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res.data.success){
                toast.success(res.data.message);
                localStorage.setItem("userEmail", formValues.email)
                navigate("/")
            }
            
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        } finally {
            dispatch(setLoading(false))
            setFormValues({
                email: "",
                password: ""
            })
        }

        
        
    }
    return (
        <Container >
            <BackgroundImage />
            <div className="content">
                <Header />
                <div className="form-container flex column a-center j-center">
                    <div className="form flex column a-center j-center">
                        <div className="title">
                            <h3>Login</h3>
                        </div>
                        <div className="container flex column">
                            <input type="email" placeholder='Email Address' name='email' value={formValues.email} onChange={(e) => setFormValues({
                                ...formValues,
                                [e.target.name]: e.target.value
                            })
                            } />
                            <input type="password" placeholder='Password' name='password' value={formValues.password}
                                onChange={(e) => setFormValues({
                                    ...formValues,
                                    [e.target.name]: e.target.value
                                })
                                } />
                            <button onClick={handleLogIn}>
                                {`${isLoading ? "loading...": "Log in" }`}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

const Container = styled.div`
 position: relative;
 .content{
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .form-container {
        gap: 2rem;
        height: 85vh;
        .form {
            padding: 2rem;
            background-color: #000000b0;
            width: 25vw;
            gap: 2rem;
            color: white;
            .container {
                gap: 2rem;
                input {
                    padding: 0.5rem 2rem;
                    width: 15rem;
                }
                button{
                    padding: 0.5rem 1rem;
                    background-color: #e50914;
                    border: none;
                    cursor: pointer;
                    color: white;
                    border-radius: 0.2rem;
                    font-weight: bolder;
                    font-size: 1.05rem;
                }
            }
        }
    }
 }
 
`;


