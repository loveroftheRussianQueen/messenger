import React, { useContext } from 'react'
import {AuthContext} from '../context/auth';
import { Navigate} from 'react-router-dom';

const PrivateRoute = ({children, props}) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate replace to="/login"/>
}

export default PrivateRoute;