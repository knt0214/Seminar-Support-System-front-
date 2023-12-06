import axios from "axios";

const BASE_URL = 'http://localhost:8080';

export const getAllArticles = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/articles`);
        console.log('API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching articles data:', error);
        return [];
    }

};

//ログイン処理
export const userLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const requestData = {
        "session": true,
        "name": formData.get('name'),
        "password": formData.get('password')
    };

    try {   
        const response = await axios.post(`${BASE_URL}/user/login`, requestData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        console.log('Login Response:', response);
        return response;
    } catch (error) {
        console.error('Error fetching login data:', error);
    }
};

// 自分の記事一覧を取得する
export const fetchMyarticles = async () => {
    try {   
        const mypageResponse = await axios.get(`${BASE_URL}/articles/myarticles`);
        console.log('Mypage Response:', mypageResponse.data);
        return mypageResponse;

    } catch (error) {
        console.error('Error fetching myarticles data:', error);
    }
}
