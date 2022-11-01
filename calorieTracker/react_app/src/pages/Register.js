import React from 'react';
import Container from '../components/UI/Container';
import axiosInstance from '../axios';

import styles from './Register.module.css';

const Register = (props) => {
  const [formData, setFormData] = React.useState({
    username: '',
    email: '',
    password: '',
  });

  const registerHandler = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    const email = e.target.email.value;
    if (password === confirmPassword) {
      axiosInstance
        .post('user/create/', {
          email: email,
          user_name: username,
          password: password,
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          alert('User created successfully');
        });
    } else {
      alert('Passwords do not match');
    }
    setFormData({
      username: username,
      email: email,
      password: password,
    });
    e.target.username.value = '';
    e.target.password.value = '';
    e.target.confirmPassword.value = '';
    e.target.email.value = '';
  };
  return (
    <div className={styles.Login} onSubmit={registerHandler}>
      <Container>
        <form className={styles.Form}>
          <label className={styles.Label}>Email</label>
          <input name="email" className={styles.Input} type="email" placeholder="Email" />
          <label className={styles.Label}>Username</label>
          <input name="username" className={styles.Input} type="text" placeholder="Username" />
          <label className={styles.Label}>Password</label>
          <input name="password" className={styles.Input} type="password" placeholder="Password" />
          <label className={styles.Label}>Confirm passwrord</label>
          <input name="confirmPassword" className={styles.Input} type="password" placeholder="Password" />
          <button className={styles.Button} type="submit">
            Register
          </button>
        </form>
      </Container>
    </div>
  );
};

export default Register;
