"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { useContext, ReactNode } from "react";
import { ThemeContext } from "@/context/theme";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {

  const themeContext = useContext(ThemeContext);

  if (!themeContext || !themeContext.theme) {
    throw new Error("ThemeContext is not properly initialized");
  }

  const theme = extendTheme(themeContext.theme);

  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
