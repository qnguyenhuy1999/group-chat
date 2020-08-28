import React, { useEffect, useRef, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Input } from 'antd';
import ScrollToBottom from 'react-scroll-to-bottom';

import './style.css';
import MessageItem from '../MessageItem';
import socket from '../../config/socket';

function MessageContainer() {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const inputRef = useRef(null);
  const match = useRouteMatch();
  const { id } = match.params;

  useEffect(() => {
    inputRef.current.focus();

    socket.emit('join', id);

    socket.on('readAllMessages', (messagesSocket) => {
      setMessages([...messagesSocket]);
    });

    socket.on('newMessage', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.emit('getAllMessage', id);

    return () => {
      socket.off('readAllMessages');
      setMessages([]);
    };
  }, [id]);

  const sendMessage = (e) => {
    if (e.target.value) {
      socket.emit('message', {
        roomId: id,
        text: e.target.value,
      });

      setMessageText('');
    }
  };

  return (
    <div className='message-container'>
      <ScrollToBottom className='show-message'>
        {messages.length > 0 &&
          messages.map((item, index) => (
            <MessageItem key={index} message={item} />
          ))}
      </ScrollToBottom>

      <div className='input'>
        <Input
          ref={inputRef}
          type='text'
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder='Type your text ...'
          onPressEnter={sendMessage}
        />
      </div>
    </div>
  );
}

export default MessageContainer;
