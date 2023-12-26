"use client"

import Register from "../components/Register";
import styles from "./page.module.css"

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
            <Register />
          </div>
        </div>
        
      </div>
    </main>
  )
}

export default Page