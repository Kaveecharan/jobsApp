import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './RegisterForm.css'
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice'; 
import AuthUser from './AuthUser';

const RegisterForm = () => {

  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const {setToken} = AuthUser()

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const navigate = useNavigate()

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: name,
      email: email,
      password: password,
    };

    axios
      .post('http://127.0.0.1:8000/api/register', formData)
      .then((response) => {
        console.log(response.data);
        setName('');
        setEmail('');
        setPassword('');
        setIsRegisterOpen(false);
      })
      .catch((error) => {
        console.error(error);
        setName('');
        setEmail('');
        setPassword('');
      });
  };

  const handleLoginEmailChange = (e) => {
    setLoginEmail(e.target.value);
  };

  const handleLoginPasswordChange = (e) => {
    setLoginPassword(e.target.value);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const formData = {
      email: loginEmail,
      password: loginPassword,
    };

    console.log('formData ', formData)

    axios
      .post('http://127.0.0.1:8000/api/login', formData)
      .then((response) => {
        console.log(response.data);
        setLoginEmail('');
        setLoginPassword('');
        const user  = {
          username: response.data.user.name,
          isAdmin: response.data.user.role == 'admin'
        };
        setToken(response.data.user, response.data.access_token)
        dispatch(setUser(user));
        navigate('/home')
      })
      .catch((error) => {
        console.error(error);
        setLoginEmail('');
        setLoginPassword('');
      });
  };

  const [disableRegisterBtn, setDisableRegisterBtn] = useState(true)
  const [disableLoginBtn, setDisableLoginBtn] = useState(true)

  useEffect(()=>{
    {(name == '' || email == '' || password.length < 6) ? setDisableRegisterBtn(true) : setDisableRegisterBtn(false)  }
  }, [name, email, password])

  useEffect(()=>{
    {(loginEmail == '' || loginPassword.length < 6 ) ? setDisableLoginBtn(true) : setDisableLoginBtn(false)   }
  }, [loginEmail, loginPassword])


  return (
    <>
    {
    isRegisterOpen
    ?
    <form className='accForm' onSubmit={handleSubmit}>
      <h1 className='formHeader'>Sign up</h1>
      <div>
        <input
          className='accInput'
          type="text"
          id="name"
          value={name}
          placeholder='Username'
          onChange={handleNameChange}
        />
      </div>
      <div>
        <input
          className='accInput'
          type="email"
          id="email"
          value={email}
          placeholder='Email'
          onChange={handleEmailChange}
        />
      </div>
      <div>
        <input
          className='accInput'
          type="password"
          id="password"
          value={password}
          placeholder='Password (< 6 Characters)'
          onChange={handlePasswordChange}
        />
      </div>
      <button  disabled={disableRegisterBtn} type="submit">Register</button>
          <p className='formLabel'>Already have an Account?</p>
          <button type="button" onClick={()=> setIsRegisterOpen(false)}>Login</button>
    </form>
    : 
    <form className='accForm' onSubmit={handleLoginSubmit}>
    <h1>Login</h1>
    <div>
      <input
        className='accInput'
        type="email"
        id="email"
        value={loginEmail}
        placeholder='Email'
        onChange={handleLoginEmailChange}
      />
    </div>
    <div>
      <input
        className='accInput'
        type="password"
        id="password"
        value={loginPassword}
        placeholder='Password (< 6 Characters)'
        onChange={handleLoginPasswordChange}
      />
    </div>
    <button disabled={disableLoginBtn} type="submit">Login</button>
    <p className='formLabel'>Don't have an Account?</p>
    <button type="button" onClick={()=> setIsRegisterOpen(true)}>Register</button>
  </form>
    }
    </>
  );
};

export default RegisterForm;
