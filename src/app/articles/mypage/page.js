'use client'

import ButtonAppBar from '../../components/AppBar';
import Footer from '../../components/Footer';
import CreateArticle from './components/CreateArticle';
import styles from '../page.module.css';
import { useState, useEffect } from 'react';
import { fetchMyarticles, deleteArticle, updateArticle } from '../api';

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

    // 編集状態のための状態変数を追加
    const [editMode, setEditMode] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedText, setEditedText] = useState('');
    const [editArticleId, setEditArticleId] = useState(null);


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

    // 編集機能の追加
    // 編集モードに入るための関数
    const enterEditMode = (articleId, title, text) => {
        setEditArticleId(articleId);
        setEditedTitle(title);
        setEditedText(text);
        setEditMode(true);
    };

    // 編集モードから出るための関数
    const exitEditMode = () => {
        setEditArticleId(null);
        setEditedTitle('');
        setEditedText('');
        setEditMode(false);
    };

    // 編集フォームでの変更を処理する関数
    const handleEditChange = (event) => {
        const { name, value } = event.target;
        if (name === 'title') {
            setEditedTitle(value);
        } else if (name === 'text') {
            setEditedText(value);
        }
    };

    const handleSaveEdit = async () => {
        try {
            const response = await updateArticle(editArticleId, {
                title: editedTitle,
                text: editedText
            });

            // 更新が成功した場合の処理
            console.log('Article updated successfully:', response.data);

            // 編集された内容でstate内の記事を更新
            setArticles((prevArticles) =>
                prevArticles.map((article) =>
                    article.id === editArticleId
                        ? { ...article, title: editedTitle, text: editedText }
                        : article
                )
            );

            // 編集モードから出る
            exitEditMode();
        } catch (error) {
            console.error('記事を編集できませんでした:', error);
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
                        {/* 編集モードの場合は編集された内容を表示、そうでない場合は元の内容を表示 */}
                        <Typography variant="h5" component="div">
                            {editArticleId === article.id ? (
                                <input
                                    type="text"
                                    name="title"
                                    value={editedTitle}
                                    onChange={handleEditChange}
                                />
                            ) : (
                                article.title
                            )}
                        </Typography>
                        <Typography variant="body2">
                            {editArticleId === article.id ? (
                                <textarea
                                    name="text"
                                    value={editedText}
                                    onChange={handleEditChange}
                                />
                            ) : (
                                article.text
                            )}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        {/* 編集モードに応じて「編集」ボタンと「保存」ボタンを切り替える */}
                        {editMode && editArticleId === article.id ? (
                            <Button
                                variant="outlined"
                                color="success"
                                size="small"
                                onClick={handleSaveEdit}
                            >
                                保存
                            </Button>
                        ) : (
                            <Button
                                variant="outlined"
                                color="success"
                                size="small"
                                onClick={() =>
                                    enterEditMode(article.id, article.title, article.text)
                                }
                            >
                                編集
                            </Button>
                        )}
                        <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() => handleDeleteArticle(article.id)}
                        >
                            削除
                        </Button>
                    </CardActions>
                </Card>
            ))}


            <Footer />
        </main>
    );
}

export default mypage;