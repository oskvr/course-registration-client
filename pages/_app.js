import "../styles/globals.css";
import Head from "next/head";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Layout from "./_layout";
const theme = createTheme({
  // Custom theme props
});
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Course Registration App</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
