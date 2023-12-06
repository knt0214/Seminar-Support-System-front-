'use client'

import ButtonAppBar from '../../components/AppBar';
import Footer from '../../components/Footer';
import styles from '../page.module.css'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { fetchMyarticles } from '../api';


const mypage = () => {
    const [articles, setArticles] = useState([]);

    //記事一覧を取得
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchMyarticles();
            setArticles(data);
        };
        fetchData();
    }, []);

    return (
        <main className={styles.main}>
            <ButtonAppBar />
            <Typography variant="h3" >マイページ！</Typography>
            <List>
                {articles.map((article) => (
                    <ListItem key={article.id} disableRipple>
                        <p>タイトル:</p>
                        <ListItemText primary={article.title} />
                        <p>本文:</p>
                        <ListItemText primary={article.text} />

                    </ListItem>
                ))}
            </List>

            <Footer />
        </main>
    );
}

export default mypage;