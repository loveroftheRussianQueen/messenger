import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
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
                (isActive ? <HomeIcon className="icon active"/> : <HomeIcon className="icon"/>)}
                />
                {user ? (
                <>
                    <NavLink to="/profile"
                    children={({ isActive }) => 
                    (isActive ? <UserIcon className="icon active"/> : <UserIcon className="icon"/>)}/>
                    <LoginIcon onClick={handleSignout} className="icon active"/>
                </>    )
                :(
                    <>
                    <NavLink to="/register"
                    children={({ isActive }) => 
                    (isActive ? <RegisterIcon className="icon active"/> : <RegisterIcon className="icon"/>)}/>
                    <NavLink to="/login"
                    children={({ isActive }) => 
                    (isActive ? <LogoutIcon className="icon active"/> : <LogoutIcon className="icon"/>)}/>
                    </>
                )   
            }
        <CallIcon className="icon"/>
        <BookMarkIcon className="icon"/>
        <SettingsIcon className="icon"/>
          </div>
      </div>
  );
}

export default Navbar;