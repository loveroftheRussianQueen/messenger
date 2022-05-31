import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import {setDoc, doc, Timestamp} from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import './Register.scss';
import girl from '../../assets/girl.png';

const Register = () => {

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        error: null,
        loading: false
    });

    const navigate = useNavigate();

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
                loading: false});
                navigate('/');
        }catch(err){
            setData({...data, error: err.message, loading: false});
        }
    }

  return (
      <div className="register">
        <h1>Messenger</h1>
        <img src={girl} alt="girl"/>
        <section>
        <h3>Добро пожаловать!</h3>
        <p>Зарегистрируйтесь чтобы <br className="line_break"/> использовать приложение</p>
        <div className="form">
        <form onSubmit={handleSubmit}>
            <div className="input_container">
                <label hmtlfor="name">Никнейм</label>
                <input type="text" name="name" placeholder="Придумайте никнейм" value={name} onChange={handleChange}></input>
            </div>
            <div className="input_container">
                <label hmtlfor="email">Почта</label>
                <input type="text" name="email" placeholder="Введите вашу почту" value={email} onChange={handleChange}></input>
            </div>
            <div className="input_container">
                <label hmtlfor="password">Пароль</label>
                <input type="password" name="password" placeholder="Придумайте сложный пароль" value={password} onChange={handleChange}></input>
            </div>
            {error ? <p className="error">{error}</p> : null}
            <div className="btn_container">
                <button className="btn" disabled={loading}>
                    {loading ? 'Создается аккаунт...' : 'Регистрация'}
                </button>
            </div>
        </form>
        <span className="question">
            У вас уже есть аккаунт?
            <Link to="/login">Войти</Link>
        </span>
        </div>
    </section>
      </div>
  )
}

export default Register;