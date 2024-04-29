// axios.js

import axios from "axios";
import Socket from "./socket"; 

// const baseURL = "https://api-artist.ideawolf.net";
const baseURL = process.env.REACT_APP_FASTAPI_BASE_URL;
// const baseURL = 'http://localhost:8090';

// const wsbaseURL = "wss://api-artist.ideawolf.net/ws/";
const wsbaseURL = process.env.REACT_APP_FASTAPI_WS_URL;
// const wsbaseURL = 'ws://localhost:8090/ws/';
let phoneWsbaseURL = new Socket(); // Use let instead of const

const axiosInstance = axios.create({
    baseURL: baseURL,
});

const setPhoneWsbaseURL = (Socket) => {
    phoneWsbaseURL = Socket;
};

const getPhoneWsbaseURL = () => {
    return phoneWsbaseURL;
};

export default axiosInstance;

export {wsbaseURL, setPhoneWsbaseURL, getPhoneWsbaseURL };
