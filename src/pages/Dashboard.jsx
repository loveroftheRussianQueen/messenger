import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import spike from '../assets/spike_pic.jpg';
import Message from '../components/Message/Message';
import ChatOnline from '../components/ChatOnline/ChatOnline';

const Dashboard = () => {
  return (
      <>
      <Header>
            <img src={logo} alt =""/>
            Messenger
        </Header>
      <Container>
            <ChatMenu>
                    <ChatMenuWrapper>
                        <ChatMenuInput placeholder="Search contact"/>
                        <Conversation>
                            <img src={spike} alt="User avatar"/>
                            <span>Johny Depp</span>
                        </Conversation>
                        <Conversation>
                            <img src={spike} alt="User Avatar"/>
                            <span>Johny Depp</span>
                        </Conversation>
                        <Conversation>
                            <img src={spike} alt="User Avatar"/>
                            <span>Johny Depp</span>
                        </Conversation>
                        <Conversation>
                            <img src={spike} alt="User Avatar"/>
                            <span>Johny Depp</span>
                        </Conversation>
                    </ChatMenuWrapper>
            </ChatMenu>
            <ChatBox>
                <ChatBoxWrapper>
                    <ChatBoxTop>
                            <Message/>
                            <Message own={true}/>
                            <Message/>
                    </ChatBoxTop>
                    <ChatBoxBottom>
                        <ChatMessageInput placeholder="write a text.."/>
                        <ChatSubmitButton>Send</ChatSubmitButton>
                    </ChatBoxBottom>
                </ChatBoxWrapper>
            </ChatBox>
            <ChatOnlineMain>
                    <ChatOnlineWrapper>
                        <ChatOnline/>
                        <ChatOnline/>
                        <ChatOnline/>
                    </ChatOnlineWrapper>
            </ChatOnlineMain>
        </Container>
      </>
  )
}

export default Dashboard;

const Container = styled.div`
        height: calc(100vh - 70px);
        display: flex; 
`

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    //margin-bottom: 2em;
    color: #4F78C7;
    cursor: pointer;
    padding: 10px;
    border-bottom: 1px solid black;
   // background-color: aqua;
    img{
        width:50px;
        height:50px;
        object-fit: contain;
    }
`

const ChatMenu = styled.div`
        flex: 3.5;
        border-right: 1px solid black;
`

const Conversation = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    margin-top: 20px;

    &:hover{
        background-color: #e0dcdc;
    }

    img{
        width:40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 20px;
    }

    span{
        font-weight: 500;
    }
`

const ChatMenuWrapper = styled.div`
       height: 100%;
`

const ChatMenuInput = styled.input`
        width: 100%;
        padding: 10px 0;
        border-bottom: 1px solid black;
`

const ChatBox = styled.div`
        flex: 5.5;
`

const ChatBoxTop = styled.div`
    height: 100%;
    overflow-y: scroll;
`

const ChatBoxBottom = styled.div`
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const ChatMessageInput = styled.textarea`
    width: 80%;
    height: 90px;
    padding: 10px;
`

const ChatSubmitButton = styled.button`
    width: 70px;
    height: 40px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #4F78C7;
    color: white;
`

const ChatBoxWrapper = styled.div`
       display: flex;
       flex-direction:column;
       justify-content: space-between;
       height: 100%;
`

const ChatOnlineMain = styled.div`
        flex: 3;
`

const ChatOnlineWrapper = styled.div`
       height: 100%;
`

