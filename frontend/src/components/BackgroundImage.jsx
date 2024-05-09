import React from 'react'
import background from '../assets/login.jpg'
import styled from 'styled-components'

function BackgroundImage() {
    return (
        <Container>
            <img src={background} alt="background" />
        </Container>
    )
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    img {
    width: 100vw;
    height: 100vh;
    }
`

export default BackgroundImage
