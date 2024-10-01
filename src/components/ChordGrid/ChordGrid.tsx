import { SimpleGrid, Box, Text, VStack } from "@chakra-ui/react";
import { chordsByKey } from "../../data/keyInfo"; // Adjust the import path as needed
import { Key } from "../../data/keyInfo";

interface ChordGridProps {
  selectedKey: Key;
}

export const ChordGrid = ({ selectedKey }: ChordGridProps) => {
  if (!selectedKey) {
    return <Text>Please select a key to see the chord grid.</Text>;
  }

  const chords = chordsByKey[selectedKey];

  // Split the chords into three rows
  const firstRow = chords.slice(0, 3);
  const secondRow = chords.slice(3, 6);
  const lastChord = chords[6];

  return (
    <VStack spacing={4} width="100%" maxWidth="400px">
      <SimpleGrid columns={3} spacing={2} width="80%">
        {firstRow.map((chord, index) => (
          <ChordBox key={index} chord={chord} index={index} />
        ))}
      </SimpleGrid>
      <SimpleGrid columns={3} spacing={2} width="80%">
        {secondRow.map((chord, index) => (
          <ChordBox key={index + 3} chord={chord} index={index + 3} />
        ))}
      </SimpleGrid>
      <SimpleGrid columns={1} spacing={2} width="25%  ">
        <ChordBox chord={lastChord} index={6} />
      </SimpleGrid>
    </VStack>
  );
};

interface ChordBoxProps {
  chord: string;
  index: number;
}

const ChordBox = ({ chord, index }: ChordBoxProps) => (
  <Box
    bg="blue.500"
    color="white"
    borderRadius="md"
    p={2}
    textAlign="center"
    fontWeight="bold"
  >
    <Text>{chord}</Text>
    <Text fontSize="sm">{getRomanNumeral(index)}</Text>
  </Box>
);

function getRomanNumeral(index: number): string {
  const numerals = ["I", "ii", "iii", "IV", "V", "vi", "vii°"];
  return numerals[index];
}
