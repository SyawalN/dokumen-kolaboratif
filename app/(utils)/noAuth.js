import { useEffect } from "react";
import { useRouter } from "next/navigation";

const noAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter()

    useEffect(() => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem('token')
        if (token) {
          router.push(`/user/${localStorage.getItem('username')}`)
        }
      }
    }, [router])

    return <WrappedComponent {...props} />
  }

  return Wrapper
}

export default noAuth