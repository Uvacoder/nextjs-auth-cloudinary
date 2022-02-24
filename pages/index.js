import { useState, useEffect } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import { useSession, signIn, signOut } from "next-auth/react"

import styles from '../styles/Home.module.css'

export default function Home() {
  const [data, setData] = useState();
  const { data: session } = useSession()

  useEffect(() => {
    if ( !session ) return;
    (async function run() {
      const response = await fetch('/api/cloudinary/search', {
        method: 'POST'
      }).then(res => res.json());
      setData(response.data);
    })()
  }, [session]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Cloudinary X NextAuth.js
        </h1>

        { session && (
          <>
            <p>
              Signed in as {session.user.email} <br />
              <button onClick={() => signOut()}>Sign out</button>
            </p>
          </>
        )}

        { !session && (
          <p>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
          </p>
        )}

        { session && (
          <div className={styles.grid}>
            {data?.resources.map(({ asset_id, secure_url }) => {
              return (
                <div key={asset_id} className={styles.card}>
                  <img src={secure_url} />
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
