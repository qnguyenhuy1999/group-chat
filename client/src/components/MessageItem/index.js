import React from 'react';

import './style.css';

function MessageItem(props) {
  const { message } = props;

  return (
    <div className='message-item'>
      <div className='avatar'>
        <img src={message.user.avatar} alt='avatar' />
      </div>
      <div className='content'>
        <div className='header'>
          <h4 className='name'>
            <strong>{message.user.fullname}</strong>
          </h4>
          <span className='time'>
            {new Date(message.createdAt).toLocaleTimeString()}
          </span>
        </div>
        <div className='text'>
          <p>{message.text}</p>
        </div>
      </div>
    </div>
  );
}

export default MessageItem;
