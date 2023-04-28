import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "@/store/store.js";

import "@/styles/style.scss";
import Logo from "@/components/layout/Logo";
import Logout from "@/components/layout/Logout";
import Head from "next/head";

let intial = true;
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  useEffect(() => {
    intial = false;
  }, []);

  return (
    <Provider store={store}>
      <Head>
        <title>TaskMaster || Created By Hashib</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Task Master is a powerful to-do app that helps you manage your tasks and stay organized. With features like task prioritization, due dates, and reminders, you'll never miss an important task again."
        />
      </Head>
      <SessionProvider session={session}>
        {!intial && <Toaster position="top-right" reverseOrder={false} />}
        <Logo />
        <Logout />
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
}
