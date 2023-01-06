// import Head from "next/head";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import styles from "../styles/Home.module.css";
// import Card from "../components/card";
// import React from "react";

// export default function Home() {
//   const [data, setData] = useState(null);
//   const [isLoading, setLoading] = useState(false);

//   if (isLoading) return <p>Loading...</p>;
//   if (!data) return <p>No profile data</p>;

import { useSession, signIn, signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Navbar from "../components/navbar";
import Head from "next/head";
import Card from "../components/card";
import Spinner from "../components/spinner";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

export default function Component() {
  const { data: session } = useSession();

  const { isLoading, error, data } = useQuery([session], () =>
    fetch("api/posts").then((res) => res.json())
  );

  if (session) {
    if (data) {
      return (
        <div className="">
          <Navbar text="Sign Out" handleClick={signOut} />
          <Head>
            <title>Post It!</title>
            <meta name="description" content="post your notes here :)" />
            <link rel=" icon" href="/favicon.ico" />
          </Head>
          <main className={styles.main}>
            <Card posts={data.posts} />
          </main>
        </div>
      );
    }
    return (
      <>
        <Navbar text="Sign Out" handleClick={signOut} />
        <Spinner />
      </>
    );
  }
  return <Navbar text="Sign In" handleClick={signIn} />;
}
