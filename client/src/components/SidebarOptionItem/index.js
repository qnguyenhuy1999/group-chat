import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { NumberOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import './style.css';

function SidebarOptionItem(props) {
  const { Icon, title, id, showModal } = props;
  const history = useHistory();
  const paramRoomId = history.location.pathname.split('/')[1];

  return Icon ? (
    <div className='item' onClick={showModal}>
      <Icon />
      <h3>{title}</h3>
    </div>
  ) : (
    <div className='item'>
      <NumberOutlined />
      <h3 className={classNames({ active: id === paramRoomId })}>
        <Link to={`/${id}`}>{title}</Link>
      </h3>
    </div>
  );
}

export default SidebarOptionItem;
