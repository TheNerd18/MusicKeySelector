import React from "react";
import { Select } from "@chakra-ui/react";
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
    <Select value={selectedKey} onChange={handleChange} size="md">
      {keys.map((key) => (
        <option key={key} value={key}>
          {key}
        </option>
      ))}
    </Select>
  );
}
