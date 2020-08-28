import React, { useState } from 'react';
import {
  EditOutlined,
  MessageOutlined,
  InfoOutlined,
  FlagOutlined,
  SaveOutlined,
  UserOutlined,
  TableOutlined,
  FileDoneOutlined,
  AppstoreAddOutlined,
} from '@ant-design/icons';
import { Modal, Input } from 'antd';
import axios from 'axios';

import './style.css';
import SidebarOptionItem from '../SidebarOptionItem';

function Sidebar(props) {
  const { user, rooms, setRooms } = props;

  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');

  const token = localStorage.getItem('token');

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    axios
      .post(
        'http://localhost:8080/api/room/create',
        { name },
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

    setVisible(false);
    setName('');
  };

  const handleCancel = () => {
    setVisible(false);
    setName('');
  };

  return (
    <div className='main-sidebar'>
      <div className='sidebar-header'>
        <div className='sidebar-info mr-12'>
          <h2>{user.email}</h2>
          <h3 style={{ color: '#dedede!important' }}>{user.fullname}</h3>
        </div>
        <EditOutlined />
      </div>

      <div className='sidebar-options'>
        <SidebarOptionItem Icon={MessageOutlined} title={'Threads'} />
        <SidebarOptionItem Icon={InfoOutlined} title={'Mentions & reactions'} />
        <SidebarOptionItem Icon={FlagOutlined} title={'Channel browser'} />
        <SidebarOptionItem Icon={SaveOutlined} title={'Saved items'} />
        <SidebarOptionItem Icon={UserOutlined} title={'People & user groups'} />
        <SidebarOptionItem Icon={TableOutlined} title={'Apps'} />
        <SidebarOptionItem Icon={FileDoneOutlined} title={'File browser'} />
      </div>

      <div className='sidebar-options'>
        <SidebarOptionItem
          showModal={showModal}
          Icon={AppstoreAddOutlined}
          title={'Add Chanel'}
        />
        {rooms.map((item, index) => (
          <SidebarOptionItem key={index} title={item.name} id={item._id} />
        ))}
      </div>

      <Modal
        title='Add new channel'
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          type='text'
          placeholder='Type name channel'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Modal>
    </div>
  );
}

export default Sidebar;
