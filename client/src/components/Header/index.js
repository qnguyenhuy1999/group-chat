import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Menu, Dropdown } from 'antd';
import {
  FieldTimeOutlined,
  SearchOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import axios from 'axios';

import './style.css';

function Header(props) {
  const { user, rooms, setRooms } = props;
  const [roomsSearch, setRoomsSearch] = useState([]);
  const [textSearch, setTextSearch] = useState('');
  const history = useHistory();
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    history.push('/login');
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <div onClick={logout}>Logout</div>
      </Menu.Item>
    </Menu>
  );

  const searchGroup = (e) => {
    setTextSearch(e.target.value);
    if (textSearch) {
      axios
        .post(
          'http://localhost:8080/api/room/search',
          {
            q: textSearch,
          },
          {
            headers: { authorization: `${token}` },
          }
        )
        .then((res) => {
          setRoomsSearch(res.data.rooms);
        })
        .catch((err) => {
          console.log(err?.response?.data?.message);
        });
    } else {
      setRoomsSearch([]);
    }
  };

  const register = (roomId) => {
    if (roomId) {
      axios
        .post(
          'http://localhost:8080/api/room/register',
          {
            roomId,
          },
          {
            headers: { authorization: `${token}` },
          }
        )
        .then((res) => {
          setRooms([...rooms, res.data.room]);
        })
        .catch((err) => {
          console.log(err?.response?.data?.message);
        });
    }
  };

  return (
    <header className='main-header'>
      <div className='center'>
        <FieldTimeOutlined className='mr-12' />
        <div className='search'>
          <Input
            placeholder='Search name group'
            value={textSearch}
            onChange={searchGroup}
          />
          <SearchOutlined className='icon-search' />
          <div
            className='rooms-search'
            onClick={() => {
              setRoomsSearch('');
              setTextSearch('');
            }}
          >
            {roomsSearch.length > 0 &&
              roomsSearch.map((item, index) => (
                <div className='room-item'>
                  <p key={index}>{item.name}</p>
                  <div onClick={() => register(item._id)}>Register</div>
                </div>
              ))}
          </div>
        </div>
        <QuestionCircleOutlined className='ml-12' />
      </div>
      <div className='flex-end'>
        <Dropdown overlay={menu}>
          <div className='avatar'>
            <img src={user.avatar} alt='avatar' />
          </div>
        </Dropdown>
      </div>
    </header>
  );
}

export default Header;
