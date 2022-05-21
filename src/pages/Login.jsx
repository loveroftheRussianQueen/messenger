import React from 'react';
import styled from "styled-components";
import google from '../assets/google.png';
import logo from '../assets/logo.png';

const Login = () => {
  return (
    <Container>
        <Header>
            <img src={logo}/>
            Messenger
        </Header>
      <Button>
      Sign in with Google
        <img src={google} alt="Google" />
      </Button>
    </Container>
  )
}

export default Login;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #212121;
`;

const Header = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 2rem;
    margin-bottom: 2em;
    color: #4F78C7;
    justify-self: first baseline;
    cursor: pointer;
    img{
        width:100px;
        height:100px;
        object-fit: contain;
    }
`

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 1em;
  border-radius: 20px;
  background-color: white;
  display: flex;
  align-items: center;
  img {
    height: 1.5rem;
    object-fit: contain;
    margin-left: 10px;
  }
  font-weight: 700;
  color: rgba(107, 114, 128, 1);
  white-space: 1px;
  cursor: pointer;
`;