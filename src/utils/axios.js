import axios from 'axios';

export default axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_HTTP}://${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`,
  withCredentials: true,
});
