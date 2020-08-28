import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';
import { auth, provider } from '../../firebase';
import axios from 'axios';

import './style.css';

function Login() {
  const history = useHistory();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((res) => {
        const { isNewUser, profile } = res.additionalUserInfo;
        const { email, name, picture } = profile;
        if (isNewUser) {
          axios
            .post('http://localhost:8080/api/user/login', {
              email,
              fullname: name,
              avatar: picture,
            })
            .then((res) => {
              localStorage.setItem('token', `Bearer ${res.user.email}`);
            })
            .catch((err) => {
              alert(err.response?.data);
            });
        } else {
          localStorage.setItem('token', `Bearer ${email}`);
        }
        history.push('/');
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className='login'>
      <div className='login-container'>
        <img
          src='https://a.slack-edge.com/bv1-8/slack_logo-ebd02d1.svg'
          alt='logo'
        />
        <h1 style={{ color: '#000' }}>Sign in to Group Chat App</h1>
        <p>qnguyenhuy1999@gmail.com</p>
        <Button onClick={signIn}>Sign In With Google</Button>
      </div>
    </div>
  );
}

export default Login;
