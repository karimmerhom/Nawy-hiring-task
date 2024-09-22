'use client'
import { NextPageContext } from 'next';
import { Box, Heading, Text, Button, Container } from '@chakra-ui/react';
import Link from 'next/link';

interface ErrorProps {
  statusCode?: number;
}

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <Container display={'flex'} justifyContent={'center'} textAlign={'center'} alignItems="center" h={500} py={10}>
      <Box>
        <Heading as="h1" size="2xl" mb={4}>
          {error.message}
        </Heading>
        <Text fontSize="lg" mb={6}>
            An error occurred sorry for the inconvenience please try again later.
        </Text>
        <Link href="/">
          <Button bg={'primary.80'} color={'text.secindary'} >
            Go back to the Listings page
          </Button>
        </Link>
      </Box>
    </Container>
  );
};


