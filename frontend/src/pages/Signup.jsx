import React, { useState } from 'react'
import styled from 'styled-components'
import BackgroundImage from '../components/BackgroundImage';
import Header from '../components/Header';
import axios from 'axios';
import { API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../store/features';

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [formValues, setFormValues] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.netflix.isLoading)

    const handleSignIn = async() => {
        // console.log(formValues);
        dispatch(setLoading(true));
        try {
            const res = await axios.post(`${API_END_POINT}/register`, formValues,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/login");
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }finally {
            dispatch(setLoading(false));
            setFormValues({
                email: "",
                password: ""
            })
        }
        
    }
    return (
        <Container showPassword={showPassword}>
            <BackgroundImage login />
            <div className="content">
                <Header login />
                <div className="body flex column a-center j-center">
                    <div className="text flex column">
                        <h1>Unlimited movies, Tv shows and more</h1>
                        <h4>Watch anywhere. Cancel anytime.</h4>
                        <h6>
                            Ready to watch? Enter your email to create or restart membership
                        </h6>
                    </div>
                    <div className="form">
                        <input type="email" placeholder='Email Address' name='email' value={formValues.email} onChange={(e) => setFormValues({
                            ...formValues,
                            [e.target.name] : e.target.value
                        }) 
                        }/>
                        {
                            showPassword && (
                            <input type="password" placeholder='Password' name='password' value={formValues.password}
                            onChange={(e) => setFormValues({
                                ...formValues,
                                [e.target.name] : e.target.value
                            }) 
                            }/>
                        )}
                        
                        {
                            !showPassword && (
                            <button onClick={() => setShowPassword(true)}>Get Started</button>
                        )}
                        
                    </div>
                    <button onClick={handleSignIn}>
                        {`${isLoading ? "loading...": "Sign Up"}`}
                    </button>
                </div>
            </div>
        </Container>
    )
}

const Container = styled.div.attrs(props => ({
    showPassword: undefined // Filter out the showPassword prop
}))`
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
    .body{
        gap: 1rem;
        .text{
            gap: 0.5rem;
            text-align: center;
            font-size: 1.6rem;
            h1{
                padding: 0 18rem;
            }
        }
        .form {
            display: grid;
            grid-template-columns: ${({showPassword}) => showPassword?"1fr 1fr":"2fr 1fr"};
            width: 60%;
            input {
                color: black;
                border: none;
                padding: 0.8rem;
                font-size: 1rem;
                border: 1px solid black;
                &:focus {
                    outline: none;
                }
            }
            button {
                padding: 0.5rem 1rem;
                background-color: #e50914;
                border: none;
                cursor: pointer;
                color: white;
                border-radius: 0;
                font-weight: bolder;
                font-size: 1.05rem;
            }
        }
        button {
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
 
`;


