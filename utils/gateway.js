import axios from 'axios'

const gateway = axios.create({
  baseURL: 'http://localhost:8001',
})

gateway.interceptors.response.use((res) => res.data)

export default gateway
