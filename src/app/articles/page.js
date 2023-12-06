import styles from './page.module.css'
import ButtonAppBar from '../components/AppBar';
import SeachField from './components/SeachField';
import KeyWordSearch from './components/KeyWordSearch';
import ArticleList from './ArticleList';
import Link from 'next/link';
import Footer from '../components/Footer';

import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const articles = () => {
    return (
        <main className={styles.main}>
            <ButtonAppBar />
            <Typography variant="h3" gutterBottom>
                就活情報掲示板
            </Typography>
            <Typography variant="h5" gutterBottom className={styles.description} mb={10}>
                就活の体験談や役立つ情報を閲覧・書込できる掲示板です。
            </Typography>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
                spacing={2}
                mb={3}
            >
                <Grid item mb={3}>
                    <SeachField />
                </Grid>
                <Grid item >
                    <KeyWordSearch />

                </Grid>
            </Grid>

            <Link href='/articles/login'>
                <Button variant="contained">新規投稿</Button>
            </Link>

            <h3 mb={3}>記事一覧</h3>
            

            <Footer />
        </main>
    );
}

export default articles;