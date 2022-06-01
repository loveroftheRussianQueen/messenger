import React from 'react';
import Attachment from '../../assets/svg/Attachment';
import './Message.scss';
import PlaneIcon from '../../assets/svg/PlaneIcon';

const MessageForm = ({handleSubmit, text, setText, setImg}) => {
  return (
    <form className="message_form" onSubmit={handleSubmit}>
        <label htmlFor="img">
            <Attachment className="icon"/>
        </label>
        <input 
            id="img"
            onChange={(e) =>setImg(e.target.files[0])}
            type="file"  
            accept="image/*"/>
        <div className="message_input">
            <input 
            className="msg_input"
            type="text" 
            placeholder="Введите сообщение" 
            value={text} 
            onChange={e => setText(e.target.value)}/>
        </div>
        <div>
            <button className="btn"><PlaneIcon id="icon"/></button>
        </div>
    </form>
  );
}

export default MessageForm;