import React, { useEffect, useState } from "react";
import { db, auth, storage } from "../../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import User from '../../components/User/User';
import MessageForm from "../../components/Messages/MessageForm";
import Message from "../../components/Messages/Message";
import spike from '../../assets/spike_pic.jpg';
import Navbar from "../../components/NavBar/Navbar";
import './Home.scss';

import icons from '../../assets/svg/DialogIcons/IconsArray';
import ArrowIcon from '../../assets/svg/ArrowIcon';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [active, setActive] = useState(false);
  const [activeUser, setActiveUser] = useState(true);

  const user1 = auth.currentUser.uid;

  console.log(active);
  useEffect(() => {
    const usersRef = collection(db, "users");
    // create query object
    const q = query(usersRef, where("uid", "not-in", [user1]));
    // execute query
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unsub();
  },);

  const selectUser = async (user) => {
    setChat(user);

    const user2 = user.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const msgsRef = collection(db, "messages", id, "chat");
    const q = query(msgsRef, orderBy("createdAt", "asc"));

    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });

    const docSnap = await getDoc(doc(db, "lastMsg", id));
    if (docSnap.data() && docSnap.data().from !== user1) {
      await updateDoc(doc(db, "lastMsg", id), { unread: false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user2 = chat.uid;

    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    let url;
    if (img) {
      const imgRef = ref(
        storage,
        `images/${new Date().getTime()} - ${img.name}`
      );
      const snap = await uploadBytes(imgRef, img);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }

    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
    });

    await setDoc(doc(db, "lastMsg", id), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      unread: true,
    });

    setText("");
    setImg("");
  };
  return (
    <>
      <div className="home_container">
      <div className={activeUser ? 'users_container active' : 'users_container'}>
      <div className="title">
        <h4 className="chats">Chats</h4>
      </div>
        {users.map((user) => (
          <User
            key={user.uid}
            user={user}
            selectUser={selectUser}
            setActive={setActive}
            setActiveUser={setActiveUser}
            user1={user1}
            chat={chat}
          />
        ))}
      </div>
      <div className={active ? `messages_container active` : `messages_container`}>
        {chat ? (
          <>
            <div className="messages_container__user">
            <div className="user_info">
            <img src={chat.avatar || spike} alt="avatar"/>
            <div className="user_text">
              <h3 className="user_name">{chat.name}</h3>
              <p className="user_status">{chat.isOnline ? 'Online' : 'Offline'}</p>
            </div>
            </div>
            <div className="user_icons">
                {icons.map((icon) =>
                   <div className="icon">{icon}</div>
                )}
            </div>
                <ArrowIcon id="exit" onClick={() => {setActive(false); setActiveUser(true)}}/>
            </div>
            <div className="messages">
              {msgs.length
                ? msgs.map((msg, i) => (
                    <Message key={i} msg={msg} user1={user1} />
                  ))
                : null}
            </div>
            <MessageForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
              setImg={setImg}
            />
          </>
        ) : (
          <div className="bg">
            <div className="no_conv">Выберите диалог</div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Home;
