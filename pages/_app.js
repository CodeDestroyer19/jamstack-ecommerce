import "../styles/globals.css"
import Layout from "../layouts/layout"
import fetchCategories from "../utils/categoryProvider"

function Ecommerce({ Component, pageProps, categories }) {
  return (
    <Layout categories={categories}>
      <Component {...pageProps} />
    </Layout>
  )
}

Ecommerce.getInitialProps = async () => {
  const categories = await fetchCategories("http://localhost:3000/")
  return {
    categories,
  }
}

export default Ecommerce
