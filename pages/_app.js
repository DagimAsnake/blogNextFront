import Layout from '../components/Layout'
import '@/styles/globals.css'
import { AuthContextProvider } from "../components/store/authContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  )
}
