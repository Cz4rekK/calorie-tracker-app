import './App.css';
import TopBar from './components/UI/TopBar';
import Logo from './components/TopBar/Logo';
import TopBarLink from './components/TopBar/TopBarLink';
import TopBarBox from './components/TopBar/TopBarBox';
import Footer from './components/Footer/Footer';
import Login from './pages/Login';
import Welcome from './components/TopBar/Welcome';
import Home from './pages/Home';

import { useState, useEffect } from 'react';
import Register from './pages/Register';
import axiosInstance from './axios';

function App() {
  const [visibleSite, setVisibleSite] = useState('login');
  const [username, setUsername] = useState('');

  const changeWelcomeHandler = (username, loggedIn) => {
    if (loggedIn) {
      setVisibleSite('home');
      setUsername(username);
    } else {
      setVisibleSite('login');
    }
  };

  const handleLogout = () => {
    setUsername('');
    setVisibleSite('login');
    const response = axiosInstance.post('user/logout/blacklist/', {
      refresh_token: localStorage.getItem('refresh_token'),
    });
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    axiosInstance.defaults.headers['Authorization'] = null;
  };

  useEffect(() => {
    if (username === '') {
      setVisibleSite('login');
      console.log(username);
    } else {
      setVisibleSite('home');
    }
  }, [username]);

  return (
    <div className="App">
      <TopBar>
        <Logo />
        <Welcome message={username !== '' ? `Welcome, ${username}` : `Log in to use calorie tracker`} />
        <TopBarBox>
          {username !== '' && <TopBarLink title="Home" onClick={() => setVisibleSite('home')} />}
          {username === '' && <TopBarLink title="Login" onClick={() => setVisibleSite('login')} />}
          {username === '' && <TopBarLink title="Register" onClick={() => setVisibleSite('register')} />}
          <TopBarLink title="Logout" onClick={() => handleLogout()} />
        </TopBarBox>
      </TopBar>
      {visibleSite === 'home' && <Home />}
      {visibleSite === 'login' && <Login changeWelcome={changeWelcomeHandler} />}
      {visibleSite === 'register' && <Register />}
      <Footer text="Copyright &#169; Cezary Kuźma 2022" />
    </div>
  );
}

export default App;
