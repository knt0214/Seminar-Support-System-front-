'use client'

import ButtonAppBar from '../../components/AppBar';
import Footer from '../../components/Footer';
import CreateArticle from './components/CreateArticle';
import styles from '../page.module.css';
import { useState, useEffect } from 'react';
import { fetchMyarticles } from '../api';

import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';


const mypage = () => {


    const [articles, setArticles] = useState([]);
    const [showCreateArticle, setShowCreateArticle] = useState(false);

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

    return (


        <main className={styles.main}>
            <ButtonAppBar />
            <Typography variant="h3" >マイページ！</Typography>
            <Button variant="contained" onClick={toggleCreateArticle}>新規投稿</Button>

            {showCreateArticle && <CreateArticle />}


            {articles.map((article) => (
                <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                >
                    <Grid item xs={10} md={6}>
                        <Card md={minwidth = "900"} >
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {article.title}
                                </Typography>
                                <Typography variant="body2">
                                    {article.text}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            ))}



            <Footer />
        </main>
    );
}

export default mypage;