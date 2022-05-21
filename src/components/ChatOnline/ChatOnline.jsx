import React from 'react';
import './chatonline.css';
import spike from '../../assets/spike_pic.jpg';

const ChatOnline = () => {
  return (
    <div className="chatOnline">
        <div className="chatOnlineFriend">
            <div className="chatOnlineImgContainer">
                <img className="chatOnlineImg" src={spike} alt=""/>
                <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">Johny Depp</span>
        </div>
    </div>
  )
}

export default ChatOnline;