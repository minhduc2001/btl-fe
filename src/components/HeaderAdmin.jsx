import React from 'react'
import styled from 'styled-components'

function Header() {
    return (
        <Container>
            <div className="nav">
                <div className="logo">
                    <img src="https://upload.wikimedia.org/wikipedia/vi/5/5e/Zing_official_logo.png" alt="abc" />
                </div>

                <a href="#" className="logout">
                    Logout
                </a>
            </div>
        </Container>
    )
}

const Container = styled.div`
    background-color: #000;
    width: 100%;
    height: 70px;
    position: fixed;
    z-index: 2;
    
    .nav {
        width: 80%;
        height: 100%;
        margin: 0 auto;
        background-color: #000;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .logo{
            width: 8%;
            height: 100%;
            margin-left:5px;
            cursor: pointer;
            img {
                width:100%;
                object-fit: cover;
                padding: 1px;
            }
        }
        a {
            text-decoration: none;
            font-weight: bold;
            font-size:20px;
            line-height:70px;
            text-transform: uppercase;
            margin-right: 12px;
            letter-spacing:2px;
            color: white;
            &:hover {
                opacity:0.8;
            }
        }
    }
`
export default Header