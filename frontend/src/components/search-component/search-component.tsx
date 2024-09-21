import React from "react";
import { Input, Button, Text, InputGroup, InputRightElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons'; 
interface SearchComponentProps {
  onChange: (key: string, value: string) => void;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}
const SearchComponent: React.FC<SearchComponentProps> = ({ onChange, query, setQuery }) => {
  return (
    <>
     <InputGroup  width={"30%"}>
        <InputRightElement pointerEvents="none">
          <SearchIcon color="primary.80" />
        </InputRightElement>
      <Input
        bg={"primary.100"}
        borderWidth={1}
        placeholder="Search by Ref#, Ad title or Description..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        size="md"
        borderRadius="30px"
      />
      </InputGroup>
      {query !== "" && (
        <Button
          onClick={() => onChange("search", query)}
          bg={'primary.60'}
          borderRadius="30px"
        >
          <Text fontWeight={'normal'} color="text.secondary">
            Search
          </Text>
        </Button>
      )}
    </>
  );
};

export default SearchComponent;
