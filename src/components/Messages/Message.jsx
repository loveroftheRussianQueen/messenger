import React, { useRef, useEffect } from 'react';
import Moment from 'react-moment';
import './Message.scss';

const Message = ({msg, user1}) => {
    const scrollRef = useRef();

    useEffect(() =>{
        scrollRef.current?.scrollIntoView({behavior:"smooth"});
    }, [msg])

  return (
    <div 
    className={`message_wrapper ${msg.from === user1 ? "own" : ""}`}
    ref={scrollRef}
    >
        <p className={msg.from === user1 ? "me" : "friend"}>
            {msg.media ? <img src={msg.media} alt={msg.text}/> : null}
            {msg.text}
            <br />
        </p>
        <div className={`message_time ${msg.from === user1 ? "own" : ""}`}>
        <Moment format="HH:MM">{msg.createdAt.toDate()}</Moment>
        </div>
    </div>
  );
}

export default Message;