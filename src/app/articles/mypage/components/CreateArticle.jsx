'use client'
import * as React from 'react';
import { createArticle } from '../../api';
import { useRouter } from 'next/navigation';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const defaultTheme = createTheme();

export default function CreateArticle() {
  const router = useRouter();
  const createArti = async (event) => {
    try{
      //新規投稿
      const createdArticle = await createArticle(event);
      console.log('Created Article:', createdArticle);

      router.refresh();

    } catch (error) {
      console.error('Creat Article Error: ', error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            記事情報を入力してください
          </Typography>
          <Box component="form" onSubmit={createArti} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="title"
              name="title"
              autoComplete="title"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="text"
              label="text"
              type="text"
              id="text"
              autoComplete="text"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              投稿！
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}