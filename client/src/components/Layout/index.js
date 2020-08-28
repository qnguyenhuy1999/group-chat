import React, { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import axios from 'axios';

import Header from '../Header';
import Sidebar from '../Sidebar';
import MessageContainer from '../MessageContainer';

function Layout() {
  const [user, setUser] = useState({});
  const [rooms, setRooms] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios
      .get('http://localhost:8080/api/user/getUser', {
        headers: { authorization: `${token}` },
      })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err?.response?.data?.message);
        history.push('/login');
        localStorage.removeItem('token');
      });

    axios
      .get('http://localhost:8080/api/room/get', {
        headers: { authorization: `${token}` },
      })
      .then((res) => {
        setRooms(res.data.rooms);
      })
      .catch((err) => {
        console.log(err?.response?.data?.message);
        history.push('/login');
        localStorage.removeItem('token');
      });
  }, []);

  return (
    <div>
      <Header user={user} rooms={rooms} setRooms={setRooms} />
      <main className='main-content'>
        <Sidebar user={user} rooms={rooms} setRooms={setRooms} />

        <Route exact path='/:id/'>
          <MessageContainer />
        </Route>
      </main>
    </div>
  );
}

export default Layout;
