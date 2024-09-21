"use client";
import { ReactNode } from "react";
import Image from "next/image";
import { Box } from "@chakra-ui/layout";
import { useRouter } from "next/navigation";

interface ListingsLayoutProps {
  children: ReactNode;
}

export default function ListingsLayout({ children }: ListingsLayoutProps) {
  const router = useRouter();
  return (
    <>
    <Box
      display={"flex"}
      alignItems={"center"}
      w={"100%"}
      h={50}
      bg={"primary.100"}
      borderBottomColor={"secondary.100"}
      borderBottomWidth={2}
      paddingX={5}
    >
      <Image
        src="/assets/images/Nawy_Logo.png"
        alt="Logo"
        width={120}
        height={40}
        style={{cursor:'pointer'}}
        onClick={()=>{router.push('/listings');}}
      />
    </Box>
    {children}
    </>
  );
}
