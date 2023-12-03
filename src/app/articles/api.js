import { redirect } from "next/navigation";
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

export const userLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    let mypage = undefined;

    const requestData = {
        "session": true,
        "name": formData.get('name'),
        "password": formData.get('password')
    };

    try {   //ログイン処理
        const response = await axios.post(`${BASE_URL}/user/login`, requestData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        console.log('Login Response:', response);
    } catch (error) {
        console.error('Error fetching login data:', error);
    }

    try {   // ログイン成功時に記事一覧を取得する
        const mypageResponse = await axios.get(`${BASE_URL}/articles/myarticles`);
        console.log('Mypage Response:', mypageResponse.data);

        // 得られた情報をmypageにセット
        mypage = mypageResponse.data;
    } catch (error) {
        console.error('Error fetching myarticles data:', error);
    }

    //リダイレクト処理
    if (mypage) {
        redirect('/mypage');
    }

};
