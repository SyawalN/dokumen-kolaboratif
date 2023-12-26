"use client"

import Login from "../components/Login";
import noAuth from "../(utils)/noAuth";
import styles from "./page.module.css"
import { useEffect } from "react";

const Page = () => {
  return (
    <main className={styles.main}>
      <div className={styles.overlay}>

        <div className={styles["top-container"]}>
          <div className={styles["top-container-box"]}>
            <h2>COLLABORATIVE DOCUMENT EDITING</h2>
          </div>
        </div>

        <div className={styles["bottom-container"]}>
          <div className={styles["bottom-container-box"]}>
            <Login />
          </div>
        </div>
        
      </div>
    </main>
  )
}

export default noAuth(Page)