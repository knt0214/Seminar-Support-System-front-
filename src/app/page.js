import * as React from 'react';
import Image from 'next/image'
import styles from './page.module.css'
import ButtonAppBar from './components/AppBar';
import Link from 'next/link';
import AppRouter from 'next/dist/client/components/app-router';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className={styles.main}>
      <ButtonAppBar />

      <div className={styles.card}>
        <Link href="/attendance">
            <h2>
              Attendance <span>-&gt;</span>
            </h2>
            <p>Register for class or seminar attendance</p>
        </Link>
      </div>
      <div className={styles.card}>
        <Link href="/articles">
          <h2>
            Articles <span>-&gt;</span>
          </h2>
          <p>Browse articles that may be helpful to you</p>
        </Link>
      </div>
      <div className={styles.card}>
        <Link href="/chat">
          <h2>
            Chat <span>-&gt;</span>
          </h2>
          <p>Ask your questions in the real-time chat section</p>
        </Link>
      </div>
      <Footer />
    </main>
  )
}
