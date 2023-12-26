"use client"

import { useRouter } from "next/navigation"
import withAuth from "@/app/(utils)/withAuth"
import { useEffect } from "react"
import styles from "./page.module.css"

const Icon = ({ iconName }) => {
  return (
    <span className="material-symbols-outlined">
      {iconName}
    </span>
  )
}

const HomePage = ({ params }) => {
  const router = useRouter()

  const logOut = () => {
    localStorage.removeItem('token')
    console.log("Refresh")
    window.location.reload()
  }

  const displayContent = () => {
    const dropdownContent = document.getElementById(styles["dropdown-content"])
    if (dropdownContent) {
      dropdownContent.classList.toggle(styles["show"])
    }
  }

  const createDocument = () => {
    if (localStorage.getItem('username') !== null) {
      router.push(`/user/${localStorage.getItem('username')}/document`)
    }
  }

  return (
    <main className={styles["main"]}>
      <div className={styles["top-container"]}>
        <div className={styles["top-container-box-up"]}>
          <h2>COLLABORATIVE DOCUMENT EDITING</h2>
          <div className={[styles["dropdown"], styles["prevent-select"]].join(" ")} onClick={displayContent}>
            <div id={styles["account-icon"]}>
              <Icon iconName="account_box" />
              <p>{params.username}</p>
            </div>
            <div id={styles["dropdown-content"]}>
              <button onClick={logOut}>Logout</button>
            </div>
          </div>
        </div>
        <div className={styles["top-container-box-down"]}>
          <div id={styles["new-document-button"]} onClick={createDocument}>
            <Icon iconName="note_add" />
            <h2>New document</h2>
          </div>
        </div>
      </div>

      <div className={styles["bottom-container"]}>
        <div className={styles["bottom-container-box-up"]}>
          <h3>Recent document</h3>
        </div>
        <div className={styles["bottom-container-box-down"]}>
          <div id={styles["document-list"]}>
            <div className={styles["document-item"]}>
              <h2>Document 1</h2>
            </div>
            <div className={styles["document-item"]}>
              <h2>Document 2</h2>
            </div>
            <div className={styles["document-item"]}>
              <h2>Document 3</h2>
            </div>
            <div className={styles["document-item"]}>
              <h2>Document 4</h2>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default withAuth(HomePage)