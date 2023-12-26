import { useEffect } from "react";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter()

    useEffect(() => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem('token')
        if (!token) {
          router.push('/login')
        }
      }
    }, [router])

    return <WrappedComponent {...props} />
  }

  return Wrapper
}

export default withAuth