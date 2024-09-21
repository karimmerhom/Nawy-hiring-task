"use client";
import React, { useEffect, useState, createContext, ReactNode } from "react";

const themeColors = {
  primary: {
    100: "#FFFFFF",
    80: "#00D4C4",
    60: "#FF5B19",
    40: "#E2E8F0"
  },
  secondary: {
    100: "#EFF0F6",
  },
  text: {
    primary: "#FF5B19",
    secondary: "#FFFFFF",
    tertiary: '#7F7F7F',
  },
};

// Define types for the context and props
interface Theme {
  colors: typeof themeColors;
  styles: {
    global: {
      body: {
        bg: string;
        fontFamily: string;
      };
      html: {
        fontFamily: string;
      };
      a: {
        color: string;
        _hover: {
          textDecoration: string;
        };
      };
    };
  };
  components: {
    baseStyle: {
      Text: {
        primaryFontColor: string;
        secondaryFontColor: string;
      };
    };
  };
}

interface ThemeContextProps {
  theme: Theme;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const theme: Theme = {
      colors: themeColors,
      styles: {
        global: {
          body: {
            bg: "primary.100",
            fontFamily: "Quicksand, sans-serif", // Updated font
          },
          html: {
            fontFamily: "Quicksand, sans-serif", // Updated font
          },
          a: {
            color: "secondary.100",
            _hover: {
              textDecoration: "underline",
            },
          },
        },
      },
      components: {
        baseStyle: {
          Text: {
            primaryFontColor: "primary.100",
            secondaryFontColor: "secondary.100",
          },
        },
      },
    };

    setTheme(theme);
  }, []);

  if (!mounted || !theme) return null;

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
