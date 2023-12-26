"use client"

import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"

const TextEditor = dynamic(() => import('@/app/components/TextEditor'), { ssr: false })

const DocumentPage = () => {
  const router = useRouter()

  function back() {
    if (localStorage.getItem('username') !== null) {
      router.push(`/user/${localStorage.getItem('username')}`)
    }
  }

  return (
    <>
      <button style={{
        position: "absolute",
        margin: "10px 20px",
        padding: "3px",
        top: 0, 
        zIndex: 3
      }} onClick={back}>
        Kembali
      </button>
      <TextEditor />
    </>
  )
}

export default DocumentPage