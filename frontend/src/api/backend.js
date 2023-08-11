import axios from "axios";

const backend = axios.create({
    baseURL: "http://localhost:5001/api"
});

export default backend;