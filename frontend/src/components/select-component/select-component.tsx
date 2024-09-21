import React from "react";
import { Select as ChakraSelect } from "@chakra-ui/react";

interface Option {
  value: string | number;
  label: string;
}

interface BedsSelectProps {
  onChange: (key: string, value: string) => void;
  bg: string;
  width: string | number;
  placeholder: string;
  borderWidth: number;
  keyToUpdate: string;
  options: Option[];
  value: string | number | undefined;
}

const Select: React.FC<BedsSelectProps> = ({
  onChange,
  bg,
  width,
  placeholder,
  borderWidth,
  keyToUpdate,
  options,
  value,
}) => {
  return (
    <ChakraSelect
      bg={bg}
      w={width}
      value={value ?? -1}
      borderRadius={30}
      borderWidth={borderWidth}
      onChange={(e) => onChange(keyToUpdate, e.target.value)}
    >
      <option value={-1} disabled>
        {placeholder}
      </option>

      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </ChakraSelect>
  );
};

export default Select;
