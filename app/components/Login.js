"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from '@/app/login/page.module.css'

const Login = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'login',
        username,
        password
      })
    })

    if (response.ok) {
      const data = await response.json()
      if (data.error) {
        alert(data.error)
        throw data.error
      }
      try {
        localStorage.setItem('token', data.token)
        localStorage.setItem('username', data.username)
        console.log('Token stored: ', localStorage.getItem('token'))
      } catch (error) {
        console.error(error)
      }
      router.push('/user/')
    } else {
      console.error('Login failed')
    }
  }

  return (
    <div className={styles["form-container"]}>
      <h1>Login</h1>
      <form onSubmit={(e) => { handleLogin(e); }} >
        <label htmlFor="username">Username:</label>
        <input id="username" type="text" value={username} onChange={(e) => { setUsername(e.target.value) }} />

        <label htmlFor="password">Password:</label>
        <input id="password" type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} autoComplete="off" />

        <div className={styles.endForm}>
          <a href="/register">Register account</a>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login