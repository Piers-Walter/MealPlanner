import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";

import NavWrapper from "~/components/navigation/NavWrapper";
import { ThemeProvider } from "@material-tailwind/react";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <NavWrapper />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
