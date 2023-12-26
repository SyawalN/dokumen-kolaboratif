"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../register/page.module.css"

const Register = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async (event) => {
    event.preventDefault()
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'register',
        username,
        password
      })
    })

    if (response.ok) {
      console.log('Registration Successful')
      router.push('/login')
    } else {
      console.error('Registration failed')
    }
  }

  return (
    <div className={styles["form-container"]}>
      <h1>Register</h1>
      <form onSubmit={(e) => {handleRegister(e)}}>
        <label htmlFor="username">Username:</label>
        <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

        <label htmlFor="password">Password:</label>
        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="off" />

        <div className={styles["endForm"]}>
          <a href="/login">Login Account</a>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  )
}

export default Register