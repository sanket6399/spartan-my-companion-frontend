import axios from "axios";

const newRequests = axios.create({
  baseURL: "https://x6scf9otx8.execute-api.us-east-1.amazonaws.com/spartan-v1"
});

export default newRequests;
