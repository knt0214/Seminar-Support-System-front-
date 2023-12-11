'use client'
import * as React from 'react';
import { useState, useEffect } from 'react';
import { getAllArticles } from './api'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllArticles();
      setArticles(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      {articles.map((article) => (
        <Card sx={{ minWidth: 300, maxWidth: 1000 }} key={article.id}>
          <CardContent>
            <Typography variant="h5" component="div">
              {article.title}
            </Typography>
            <Typography variant="body2" component="div">
              投稿者：{article.author}
            </Typography>
            <Typography variant="body2">
              {article.text}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      ))}

    </div>
  );
}

export default ArticleList;