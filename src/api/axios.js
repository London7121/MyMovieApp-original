import axios from "axios";

export default async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {}
    };
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error("API request error: ", error);
        throw error;
    }
}