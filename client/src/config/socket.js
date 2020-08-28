import io from 'socket.io-client';

const END_POINT = 'http://localhost:8080/';
const token = localStorage.getItem('token');
const socket = io(END_POINT, { query: { token } });

export default socket;
