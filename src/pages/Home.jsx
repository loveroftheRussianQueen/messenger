import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, onSnapshot} from 'firebase/firestore';

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() =>{
      const userRef = collection(db, 'users');
      const q = query(userRef, where('uid', 'not-in', [auth.currentUser.uid]));
      const unsub = onSnapshot(q, querySnapshot => {
        let users = []
        querySnapshot.forEach(doc =>{
            users.push(doc.data())
        })
        setUsers(users);
      });
      return () => unsub();
  }, []);
  
  console.log(users);
  return (
    <div>Home</div>
  )
}

export default Home;