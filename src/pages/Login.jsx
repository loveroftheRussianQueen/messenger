import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import {updateDoc, doc} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [data, setData] = useState({
        email: "",
        password: "",
        error: null,
        loading: false
    });

    const navigate = useNavigate();

    const { email, password, error, loading} = data;

    const handleChange = e =>{
        setData({...data, [e.target.name]: e.target.value})
    }

    const handleSubmit = async e =>{
        e.preventDefault();
        setData({...data, error: null, loading: true})
        if(!email || !password){
            setData({...data, error: 'Пожалуйста, заполните все поля'})
        }
        try{
            const result = await signInWithEmailAndPassword(
                auth, 
                email, 
                password);
                await updateDoc(doc(db, "users", result.user.uid), {
                    isOnline: true,
                  });
            setData({ 
                email:'', 
                password: '', 
                error: null, 
                loading: false});
                navigate('/');
        }catch(err){
            setData({...data, error: err.message, loading: false});
        }
    }

  return (
    <section>
        <h3>Войти в аккаунт</h3>
        <form className="form" onSubmit={handleSubmit}>
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
                <button className="btn" disabled={loading}>
                    {loading ? 'Вход в аккаунт..' : 'Войти'}
                </button>
            </div>
        </form>
    </section>
  )
}

export default Login;