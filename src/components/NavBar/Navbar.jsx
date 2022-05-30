import React, {useContext} from 'react';
import { Link, NavLink } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { signOut } from '@firebase/auth';
import { updateDoc, doc } from '@firebase/firestore';
import { AuthContext } from '../../context/auth';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '../../assets/svg/HomeIcon';
import './NavBar.scss';
import UserIcon from '../../assets/svg/UserIcon';
import RegisterIcon from '../../assets/svg/RegisterIcon';
import LoginIcon from '../../assets/svg/LoginIcon';
import LogoutIcon from '../../assets/svg/LogoutIcon';
import CallIcon from '../../assets/svg/CallIcon';
import BookMarkIcon from '../../assets/svg/BookMarkIcon';
import SettingsIcon from '../../assets/svg/SettingsIcon';

const Navbar = () => {
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    const handleSignout = async() =>{
        await updateDoc(doc(db, 'users', auth.currentUser.uid),{
            isOnline: false,
        })
        await signOut(auth);
        navigate('/login');
    }

  return (
      <div className="nav_bar">
          <div className="nav_bar__links">
          <NavLink to="/"
                children={({ isActive }) => 
                (isActive ? <HomeIcon className="active"/> : <HomeIcon className=""/>)}
                />
                {user ? (
                <>
                    <NavLink to="/profile"
                    children={({ isActive }) => 
                    (isActive ? <UserIcon className="active"/> : <UserIcon className=""/>)}/>
                    <LoginIcon onClick={handleSignout}/>
                </>    )
                :(
                    <>
                    <NavLink to="/register"
                    children={({ isActive }) => 
                    (isActive ? <RegisterIcon className="active"/> : <RegisterIcon className=""/>)}/>
                    <NavLink to="/login"
                    children={({ isActive }) => 
                    (isActive ? <LogoutIcon className="active"/> : <LogoutIcon className=""/>)}/>
                    </>
                )   
            }
        <CallIcon/>
        <BookMarkIcon/>
        <SettingsIcon/>
          </div>
      </div>
  );
}

export default Navbar;