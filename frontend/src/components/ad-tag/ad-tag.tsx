import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { ThemeContext } from "@/context/theme";

interface AdTagProps{
    backgroundColor: string, 
    textColor: string, 
    text: string
    themeCtx?: React.ContextType<typeof ThemeContext>;
}

const AdTag: React.FC<AdTagProps> = ({ backgroundColor, textColor, text, themeCtx }) => {
    return (
        <Box bg={backgroundColor} borderRadius={5} px={2} py={1}>
        <Text fontSize={12} color={textColor} fontWeight="bold">
          {text}
        </Text>
      </Box>
    );
  }
  export default AdTag