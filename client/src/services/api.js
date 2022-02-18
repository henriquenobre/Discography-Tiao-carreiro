import axios from 'axios';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

export const api = axios.create({
  baseURL: 'http://localhost:3333',
});
