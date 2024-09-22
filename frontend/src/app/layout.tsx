'use client';
import { ReactNode } from "react";
import { Providers } from "./providers";
import { ThemeProvider } from "@/context/theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
       <head>
        <title>Nawy</title>
      </head>
      <body>
        <ToastContainer
          position="bottom-center"
          autoClose={3500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          pauseOnHover={false}
          theme="colored"
          limit={1}
        />
        <ThemeProvider>
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
