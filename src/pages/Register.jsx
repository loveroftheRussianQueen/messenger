import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import {setDoc, doc, Timestamp} from 'firebase/firestore';

const Register = () => {

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        error: null,
        loading: false
    })

    const {name, email, password, error, loading} = data;

    const handleChange = e =>{
        setData({...data, [e.target.name]: e.target.value})
    }

    const handleSubmit = async e =>{
        e.preventDefault();
        setData({...data, error: null, loading: true})
        if(!name || !email || !password){
            setData({...data, error: 'Пожалуйста, заполните все поля'})
        }
        try{
            const result = await createUserWithEmailAndPassword(
                auth, 
                email, 
                password);
                await setDoc(doc(db, "users", result.user.uid), {
                    uid: result.user.uid,
                    name,
                    email,
                    createdAt: Timestamp.fromDate(new Date()),
                    isOnline: true,
                  });
            setData({
                name:'', 
                email:'', 
                password: '', 
                error: null, 
                loading: false})
        }catch(err){
            setData({...data, error: err.message, loading: false});
        }
    }

  return (
    <section>
        <h3>Создать аккаунт</h3>
        <form className="form" onSubmit={handleSubmit}>
            <div className="input_container">
                <label hmtlfor="name">Никнейм</label>
                <input type="text" name="name" value={name} onChange={handleChange}></input>
            </div>
            <div className="input_container">
                <label hmtlfor="email">Почта</label>
                <input type="text" name="email" value={email} onChange={handleChange}></input>
            </div>
            <div className="input_container">
                <label hmtlfor="password">Пароль</label>
                <input type="password" name="password" value={password} onChange={handleChange}></input>
            </div>
            {error ? <p className="error">{error}</p> : null}
            <div className="btn_container">
                <button className="btn">
                    Register
                </button>
            </div>
        </form>
    </section>
  )
}

export default Register;