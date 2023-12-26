"use client"

import { useEffect } from "react"
import withAuth from "@/app/(utils)/withAuth"
import { useRouter } from "next/navigation"
import { v4 as uuidV4 } from "uuid"

const RedirectDocument = () => {
  const router = useRouter()
  
  useEffect(() => {
    if (localStorage.getItem('username') !== null) {
      router.push(`/user/${localStorage.getItem('username')}/document/${uuidV4()}`)
    }
  }, [])

  return (
    <main className="flexful-centered" style={{fontFamily: "Cambria", letterSpacing: "2px", backgroundColor: "black", color: "white" , height: "100%"}}>
      <div className="flexful-centered">
        <h1>Loading...</h1>
      </div>
    </main>
  )
}

export default RedirectDocument