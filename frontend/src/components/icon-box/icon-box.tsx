import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ThemeContext } from "@/context/theme";

interface IconBoxProps{
    icon: IconProp, 
    value: number|string,
    themeCtx?: React.ContextType<typeof ThemeContext>;
}

const IconBox: React.FC<IconBoxProps> = ({ icon, value, themeCtx }) => {
    return (
      <Box
        bg={"primary.40"}
        display={"flex"}
        flexDir={"row-reverse"}
        gap={1}
        borderRadius={2}
        alignItems={"center"}
        px={1}
      >
        <FontAwesomeIcon
          icon={icon}
          size={"2xs"}
          color={themeCtx?.theme.colors.text.tertiary}
        />
        <Text fontSize={12} fontWeight={"bold"} color={"text.tertiary"}>
          {value}
        </Text>
      </Box>
    );
  }
  export default IconBox