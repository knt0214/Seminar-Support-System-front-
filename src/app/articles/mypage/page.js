'use client'

import ButtonAppBar from '../../components/AppBar';
import Footer from '../../components/Footer';
import styles from '../page.module.css'

import { Typography } from '@mui/material';


const mypage = () => {
    return (
        <main className={styles.main}>
            <ButtonAppBar />
            <Typography variant="h3" >マイページ！</Typography>
            <Footer />
        </main>
    );
}

export default mypage;