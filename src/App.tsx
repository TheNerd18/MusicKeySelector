import { Center, Heading, Text, VStack } from "@chakra-ui/react";
import { KeySelector } from "./components/KeySelector/KeySelector";
import { useState } from "react";
import { Key } from "./data/keyInfo";
import { ChordGrid } from "./components/ChordGrid/ChordGrid";
import { MusicStave } from "./components/MusicStave/MusicStave";

function App() {
  const [selectedKey, setSelectedKey] = useState<Key>("C");

  const onKeyChange = (key: Key) => {
    setSelectedKey(key);
  };

  return (
    <Center height="100vh" bg="whitesmoke">
      <VStack>
        <Heading>Music Key Selector</Heading>
        <KeySelector selectedKey={selectedKey} onChange={onKeyChange} />
        <Text>Key is {selectedKey}</Text>
        <ChordGrid selectedKey={selectedKey} />
        <MusicStave keySignature={selectedKey} />
      </VStack>
    </Center>
  );
}

export default App;
