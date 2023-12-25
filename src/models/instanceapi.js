import axios from "axios";

const instanceapi = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    withCredentials: true
})

instanceapi.defaults.headers.common['token_access'] = '$2y$12$VQ5nBJwty/0Lbb2YTPXL9ujrln8LFyXFnjcOGsXLTFjPqqX477H3u';
instanceapi.defaults.headers.common['Content-Type'] = 'multipart/form-data';

export default instanceapi;