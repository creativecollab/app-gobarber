import Axios from 'axios';

const Api = Axios.create({
  baseURL: 'http://localhost:7000',
});

export default Api;
