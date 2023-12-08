'use client'

import ButtonAppBar from '../../components/AppBar';
import Footer from '../../components/Footer';
import CreateArticle from './components/CreateArticle';
import styles from '../page.module.css';
import { useState, useEffect } from 'react';
import { fetchMyarticles, deleteArticle } from '../api';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';


const mypage = () => {


    const [articles, setArticles] = useState([]);
    const [showCreateArticle, setShowCreateArticle] = useState(false);
    const [deleteSuccessMessage, setDeleteSuccessMessage] = useState('');


    //記事一覧を取得
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchMyarticles();
            setArticles(data);
        };
        fetchData();
    }, []);

    // ボタンクリックでCreateArticleを表示/非表示切り替え
    const toggleCreateArticle = () => {
        setShowCreateArticle(!showCreateArticle);
    };

    const handleDeleteArticle = async (articleId) => {
        try {
            // deleteArticle APIを呼び出し、articleIdを送信
            const result = await deleteArticle(articleId);
            console.log('deleting result:', result.data);

            // 削除された記事をstateから削除
            setArticles((prevArticles) => prevArticles.filter((article) => article.id !== articleId));

            // 削除成功メッセージを表示
            setDeleteSuccessMessage('記事を削除しました！');

            // 一定時間後にメッセージをクリア（3秒後）
            setTimeout(() => {
                setDeleteSuccessMessage('');
            }, 3000);

        } catch (error) {
            console.error('記事を削除できませんでした:', error);
        }
    };

    return (


        <main className={styles.main}>
            <ButtonAppBar />
            <Typography variant="h3" >マイページ！</Typography>
            <Button variant="contained" onClick={toggleCreateArticle} >新規投稿</Button>

            {showCreateArticle && <CreateArticle />}

            {deleteSuccessMessage && (
                <Typography style={{
                    backgroundColor: 'pink',
                    padding: '8px',
                    borderRadius: '4px', color: 'red'
                }} gutterBottom>
                    {deleteSuccessMessage}
                </Typography>
            )}

            {articles.map((article) => (
                <Card sx={{ minWidth: 275 }} key={article.id} >
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {article.title}
                        </Typography>
                        <Typography variant="body2">
                            {article.text}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() => handleDeleteArticle(article.id)}
                        >
                            Delete
                        </Button>
                    </CardActions>
                </Card>

            ))}



            <Footer />
        </main>
    );
}

export default mypage;