import React from 'react';
import Container from '../components/UI/Container';

import styles from './Login.module.css';

import { useState } from 'react';
import axiosInstance from '../axios';

const accounts = [
  {
    username: 'test',
    password: 'test',
  },
];

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const loginHandler = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    setUsername(email);

    axiosInstance
      .post('token/', {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        axiosInstance.defaults.headers['Authorization'] = 'JWT ' + localStorage.getItem('access_token');
        setUsername(email);
        setLoggedIn(true);
      });
  };

  return (
    <div className={styles.Login}>
      <Container>
        <form className={styles.Form} onSubmit={loginHandler}>
          <label className={styles.Label}>Email</label>
          <input name="email" className={styles.Input} type="text" placeholder="Email" />
          <label className={styles.Label}>Password</label>
          <input name="password" className={styles.Input} type="password" placeholder="Password" />
          <button className={styles.Button} type="submit" onClick={() => props.changeWelcome(username, loggedIn)}>
            Login
          </button>
        </form>
      </Container>
    </div>
  );
};

export default Login;
