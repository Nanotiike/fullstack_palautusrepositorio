import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

// Fetch all blogs from the backend
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// Add a new blog to the backend
const addBlog = async blogObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, blogObject, config)
  return response.data
}

// Update likes for a specific blog
const addLike = async (id, blogObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, blogObject)
  return response.data
}

// Remove a blog from the backend
const removeBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, addBlog, setToken, addLike, removeBlog }