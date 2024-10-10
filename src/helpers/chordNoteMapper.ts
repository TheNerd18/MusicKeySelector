export const chordNoteMapper = (notes: string[], chord: string[]): string[] => {
  const result: string[] = [];
  const chordSet = new Set(chord.map((note) => note.toLowerCase()));

  for (const note of notes) {
    const [noteName] = note.split("/");
    if (chordSet.has(noteName.toLowerCase())) {
      result.push(note);
    }
  }

  return result;
};
