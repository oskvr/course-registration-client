import { CssBaseline, ThemeProvider } from "@mui/material";
import Head from "next/head";
import "../styles/globals.css";
import { theme } from "./_theme";
import Layout from "./_layout";
import { AuthProvider } from "@/lib/hooks/use-auth";
import { SnackbarProvider } from "@/lib/hooks/use-snackbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Course Registration App</title>
      </Head>

      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <AuthProvider>
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
