import Image from "next/image";
import styles from '@/styles/Home.module.css'
import Dashboard from "./dashboard/page";
import Header from "./Header/page";
import Sidemenu from "./sidemenu/Sidemenu";

export default function Home() {
  return (
   <>
   <head>
    <title>Data Dashboard</title>
    <meta name="description" content="A comprehensive data dashboard to visualize and analyze your data effectively." />
    <meta name='viewport' content='width=device-width, initial-scale=1' />
    <link rel="icon" href="/favicon.ico" />
   </head>
   <main className={styles.main}>
    <Header/>
    <Sidemenu/>
    <Dashboard />
    </main>
   </>
  );
}
