import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/userSlice';
import './navbar.css'
import AuthUser from './AuthUser';
import axios from 'axios';

const Navbar = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate()
  const user = useSelector((state) => state.user.username);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const dispatch = useDispatch()

  const {setToken, setUser, token} = AuthUser()

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleLogout = () => {

    axios.post('http://127.0.0.1:8000/api/logout', null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      dispatch(logoutUser())
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      sessionStorage.clear();
      navigate('/');
    })
    .catch(error => {
      console.error(error);
    });

  };
  

  return (
    <div className='navbarDiv'>
      <h1 className='comName' onClick={()=> navigate('/home')}>Dev</h1>
      <div className='navbarContent'>
        <p className='navbarUsername' onClick={toggleDropdown}>{user}</p>
        {isDropdownVisible && (
          <div className='dropdown'>
            { isAdmin  && <p className='navbarUsername' onClick={()=> navigate('/admin')}>Dashboard</p> }
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
