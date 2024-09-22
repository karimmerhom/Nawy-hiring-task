import React, { ReactNode } from "react";
import { Box, Text } from "@chakra-ui/react";

interface CardProps {
  title: string;
  children: ReactNode;
}

const DetailsCard: React.FC<CardProps> = ({ title, children }) => {
  return (
    <>
      <Box
        mx={5}
        mt={20}
        bg={"primary.40"}
        h={50}
        display={"flex"}
        alignItems={"center"}
        px={5}
        borderRadius={10}
      >
        <Text fontSize={20} fontWeight={"bold"}>
          {title}
        </Text>
      </Box>
      <Box w={"100%"} display={"flex"} flexWrap={"wrap"} px={10} mt={5} gap={5}>
        {children}
      </Box>
    </>
  );
};

export default DetailsCard;
