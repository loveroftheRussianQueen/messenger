import React from 'react';
import './message.css';
import spike from '../../assets/spike_pic.jpg';

const Message = ({own}) => {
  return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
            <img 
            className="msg_img"
            src={spike}
            alt=""/>
            <p className="msg_text">hello this is mario</p>
        </div>
        <div className="messageBottom">1 hour ago</div>
    </div>
  )
}

export default Message;