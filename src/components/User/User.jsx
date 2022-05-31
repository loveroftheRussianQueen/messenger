import React, { useEffect, useState } from "react";
import spike from '../../assets/spike_pic.jpg';
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase";
import './User.scss';
import Moment from 'react-moment';

const User = ({ user1, user, selectUser, chat, setActive, setActiveUser }) => {
  const user2 = user?.uid;
  const [data, setData] = useState("");

  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    let unsub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
      setData(doc.data());
    });
    return () => unsub();
  }, []);

  return (
    <>
      <div
        className={`user ${chat.name === user.name && "selected_user"}`}
        onClick={() => {selectUser(user)}}
      >
        <div className="user__info">
          <div className="user__detail">
            <img src={user.avatar || spike} alt="avatar" className="avatar" />
            <h5>{user.name}</h5>
          </div>
          <div
            className={`user__status ${user.isOnline ? "online" : "offline"}`}
          ></div>
        </div>
        <div className="open_dialog" onClick={() => {selectUser(user); setActive(true); setActiveUser(false)}}></div>
        <Moment className="time" format="HH:MM">{data?.createdAt?.toDate()}</Moment>
        {data?.from !== user1 && data?.unread && (
              <small className="unread">1</small>
        )}
      </div>
    </>
  );
};

export default User;