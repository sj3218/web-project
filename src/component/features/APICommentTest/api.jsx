import axios from 'axios';

export async function getComments() {
    const response = await axios.get(
        'https://jsonplaceholder.typicode.com/comments'
    );
    return response.data;
}

export async function getComment(id) {
    const response = await axios.get(
        `https://jsonplaceholder.typicode.com/comments/${id}`
    );
    return response.data;
}
