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
        const mypageResponse = await axios.get(`${BASE_URL}/articles/myarticles`, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        console.log('Mypage Response:', mypageResponse);
        return mypageResponse.data;

    } catch (error) {
        console.error('Error fetching myarticles data:', error);
    }
}

//新規投稿
export const createArticle = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const requestData = {
        "title": formData.get('title'),
        "text": formData.get('text')
    };

    try {
        const response = await axios.post(`${BASE_URL}/articles`, requestData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        console.log('CreateArticle Response:', response);
        return response;
    } catch (error) {
        console.error('Error Creating Article:', error);
    }
};

//記事の削除
export const deleteArticle = async (articleId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/articles/${articleId}`,{
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });
        return response;

    } catch (error) {
        console.error('Delete Article Error:', error)
    }
};

//記事の編集
export const updateArticle = async (articleId, updatedData) => {
    try {
      const response = await axios.put(`${BASE_URL}/articles/${articleId}`, updatedData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });
      return response;
    } catch (error) {
      console.error('Update Article Error:', error);
      throw error; // エラーを呼び出し元に投げる
    }
  };