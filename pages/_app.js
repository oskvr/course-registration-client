import { CssBaseline, ThemeProvider } from "@mui/material";
import Head from "next/head";
import "../styles/globals.css";
import { theme } from "./_theme";
import Layout from "./_layout";
import { AuthProvider } from "@/lib/auth";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Course Registration App</title>
      </Head>

      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
