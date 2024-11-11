import axios from 'axios';

const API_KEY = 'AIzaSyDXg1J7toebfHpEAT1j_dQrNQo7uqO2D_0';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

const youtube = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
    maxResults: 21,
  },
});

export default youtube;
