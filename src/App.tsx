import { Center, Heading, Text, VStack } from "@chakra-ui/react";
import { KeySelector } from "./components/KeySelector/KeySelector";
import { useState } from "react";
import { Key } from "./data/keyInfo";
import { ChordGrid } from "./components/ChordGrid/ChordGrid";
import { MusicStave } from "./components/MusicStave/MusicStave";

function App() {
  const [selectedKey, setSelectedKey] = useState<Key>("C");
  const [selectedChord, setSelectedChord] = useState<string | null>(null);

  const onKeyChange = (key: Key) => {
    setSelectedKey(key);
    setSelectedChord(null);
  };

  const onChordSelection = (chord: string) => {
    if (chord) {
      setSelectedChord(chord);
    } else {
      console.error(`No notes found for chord: ${chord}`);
      setSelectedChord(null);
    }
  };

  return (
    <Center height="100vh" bg="whitesmoke">
      <VStack>
        <Heading>Music Key Selector</Heading>
        <KeySelector selectedKey={selectedKey} onChange={onKeyChange} />
        <Text>Key is {selectedKey}</Text>
        {selectedChord ? (
          <Text>Selected Chord is {selectedChord}</Text>
        ) : (
          <Text>Click on a chord to view more info</Text>
        )}
        <ChordGrid
          selectedKey={selectedKey}
          handleChordSelect={onChordSelection}
        />
        <MusicStave keySignature={selectedKey} chord={selectedChord} />
      </VStack>
    </Center>
  );
}

export default App;
