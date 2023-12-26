"use client"

import { useCallback, useEffect, useState } from "react"
import Quill from "quill"
import "quill/dist/quill.snow.css"
import "./TextEditorStyles.css"
import { io } from "socket.io-client"
import { useParams } from "next/navigation"

const SAVE_INTERVAL_MS = 2000
const TOOLLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
]

export default function TextEditor() {
  const { documentId } = useParams()
  const [socket, setSocket] = useState()
  const [quill, setQuill] = useState()

  // Connect to server
  useEffect(() => {
    const s = io(process.env.NEXT_PUBLIC_SERVER_URL)
    setSocket(s)

    return () => {
      s.disconnect()
    }
  }, [])

  // Allow document to be distinct
  useEffect(() => {
    if (socket == null || quill == null) return

    socket.once("load-document", document => {
      quill.setContents(document)
      quill.enable()
    })

    socket.emit("get-document", documentId, localStorage.getItem('username'))
  }, [socket, quill, documentId])

  // Save document per interval
  useEffect(() => {
    if (socket == null || quill == null) return

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents())
    }, SAVE_INTERVAL_MS)

    return () => {
      clearInterval(interval)
    }
  }, [socket, quill])

  // Receive text-changes from server broadcast
  useEffect(() => {
    if (socket == null || quill == null) return

    const handler = (delta) => {
      quill.updateContents(delta)
    } 
    socket.on("receive-changes", handler)

    return () => {
      socket.off("receive-changes", handler)
    }
  }, [socket, quill])

  // Record text-changes and emit to server
  useEffect(() => {
    if (socket == null || quill == null) return

    const handler = (delta, oldDelta, source) => {
      if (source !== 'user') return
      socket.emit("send-changes", delta, localStorage.getItem('username'))
    } 
    quill.on('text-change', handler)

    return () => {
      quill.off('text-change', handler)
    }
  }, [socket, quill])

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return
    
    wrapper.innerHTML = ""
    const editor = document.createElement('div')
    wrapper.append(editor)
    const q = new Quill(editor, { theme: "snow", modules: { toolbar: TOOLLBAR_OPTIONS } })
    q.disable()
    q.setText('Loading...')
    setQuill(q)
  }, [])

  return <div className="container" ref={wrapperRef}></div>
}