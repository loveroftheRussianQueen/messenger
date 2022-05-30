import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import {updateDoc, doc} from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import './Login.scss';
import girl from '../../assets/girl.png';

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
      <div className="login">
          <h1>Messenger</h1>
          <img src={girl} alt="girl"/>
         <section>
        <h3>Добро пожаловать!</h3>
        <p>Войдите в аккаунт чтобы продолжить</p>
        <div className="form">
        <form onSubmit={handleSubmit}>
            <div className="input_container">
                <label hmtlfor="email">Почта</label>
                <input type="text" name="email" value={email} placeholder="Введите вашу почту" onChange={handleChange}></input>
            </div>
            <div className="input_container">
                <label hmtlfor="password">Пароль</label>
                <input type="password" name="password" value={password} placeholder="Введите пароль" onChange={handleChange}></input>
            </div>
            {error ? <p className="error">{error}</p> : null}
            <div className="btn_container">
                <button className="btn" disabled={loading}>
                    {loading ? 'Вход в аккаунт..' : 'Войти'}
                </button>
            </div>
        </form>
        <span className="question">
            У вас нет аккаунта?
            <Link to="/register">Зарегистрироваться</Link>
        </span>
        </div>
    </section>
      </div>
  )
}

export default Login;