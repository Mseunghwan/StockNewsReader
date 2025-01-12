import axios from 'axios';

const BASE_URL = "http://localhost:8081/api/posts";


// API 서비스를 구현합니다
const postService = {
    getAllPosts: async () => {
        const response = await axios.get(BASE_URL);
        return response.data;
    },

    createPost: async(post) => {
        const response = await axios.post(BASE_URL, post);
        return response.data
    },

    updatePost: async (id, post) => {
        const response = await axios.put(`${BASE_URL}/${id}`, post);
        return response.data;
    },
    deletePost: async(id) => {
        const response = await axios.delete(`${BASE_URL}/${id}`);
    }
};

export default postService;