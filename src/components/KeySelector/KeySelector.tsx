import React from "react";
import { Box, Select } from "@chakra-ui/react";
import { Key, keys } from "../../data/keyInfo";

interface KeySelectorProps {
  selectedKey: Key;
  onChange: (selectedKey: Key) => void;
}

export function KeySelector({ selectedKey, onChange }: KeySelectorProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    if (keys.includes(newValue as Key)) {
      onChange(newValue as Key);
    }
  };

  return (
    <Box maxW="200px" w="100%">
      <Select
        value={selectedKey}
        onChange={handleChange}
        size={{ base: "md", sm: "sm" }}
        variant="outline"
        borderColor="gray.300"
        _hover={{ borderColor: "gray.400" }}
        _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182ce" }}
      >
        {keys.map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </Select>
    </Box>
  );
}
