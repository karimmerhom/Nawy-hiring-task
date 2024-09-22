import React from "react";
import { Button, HStack, Text } from "@chakra-ui/react";
import {PaginationDetails} from "@/app/models/interfaces/pagination-details.interface";


interface PaginationProps {
  PaginationDetails: PaginationDetails | null;
  onChange: (key: string, value: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  PaginationDetails,
  onChange,
}) => {
  return (
    <HStack spacing={4}>
        <Button bg={'primary.40'} color={'text.quaternary'}
        onClick={() =>
          onChange("page", PaginationDetails ? PaginationDetails.page - 1 : 0)
        }
        isDisabled={PaginationDetails ? PaginationDetails.page === 1 : true}
      >
        Previous
      </Button>

      <Text color={'text.quaternary'}>
        Page {PaginationDetails?.page} of {PaginationDetails?.totalPages}
      </Text>

      <Button bg={'primary.40'} color={'text.quaternary'}
        onClick={() =>
          onChange("page", PaginationDetails ? PaginationDetails.page + 1 : 0)
        }
        isDisabled={
          PaginationDetails
            ? PaginationDetails.page === PaginationDetails.totalPages
            : true
        }
      >
        Next
      </Button>
    </HStack>
  );
};

export default Pagination;
