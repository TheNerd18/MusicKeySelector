import { useEffect, useRef, useState } from "react";
import { Renderer, Stave, Voice, Formatter, StaveNote } from "vexflow";
import { chordNotesByChord, Key, notesByKey } from "../../data/keyInfo";
import { chordNoteMapper } from "../../helpers/chordNoteMapper";

interface MusicStaveProps {
  clef?: "treble" | "bass" | "alto" | "tenor";
  keySignature: Key;
  chord: string | null;
  chordColor?: string;
}

export function MusicStave({
  clef = "treble",
  keySignature,
  chord,
  chordColor = "#FFA500",
}: MusicStaveProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        // Adjust the height calculation
        const height = Math.max(200, Math.min(400, width * 0.5));
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (containerRef.current && dimensions.width > 0) {
      if (!rendererRef.current) {
        rendererRef.current = new Renderer(
          containerRef.current,
          Renderer.Backends.SVG
        );
      }
      rendererRef.current.resize(dimensions.width + 125, dimensions.height);

      const context = rendererRef.current.getContext();
      context.clear();

      const staveWidth = Math.max(dimensions.width + 25, 200);
      // Adjust vertical positioning
      const staveY = dimensions.height * 0.2;
      const stave = new Stave(15, staveY, staveWidth);

      stave.addClef(clef);
      stave.addKeySignature(keySignature);
      stave.setWidth(parent.innerWidth - 30);

      stave.setContext(context).draw();

      const notes = notesByKey[keySignature];

      const chordNotes = chord ? chordNotesByChord[chord] : [];

      const mappedChordNotes = chordNoteMapper(notes, chordNotes);
      const staveNotes = createNotes({
        notes,
        chordNotes: mappedChordNotes,
        chordColor,
      });

      const voice = new Voice({ num_beats: 10, beat_value: 4 });
      voice.addTickables(staveNotes);

      new Formatter().joinVoices([voice]).format([voice], staveWidth - 50);
      voice.draw(context, stave);
    }
  }, [clef, keySignature, dimensions, chord, chordColor]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "auto", minHeight: "200px" }}
    />
  );
}

interface CreateNotes {
  notes: string[];
  chordNotes?: string[];
  chordColor: string;
}

function createNotes({
  notes,
  chordColor,
  chordNotes,
}: CreateNotes): StaveNote[] {
  const staveNotes: StaveNote[] = [];

  const mappedNotes = notes.map((note, i) => {
    if (chordNotes?.includes(note)) {
      return new StaveNote({
        keys: [note],
        duration: "4",
      }).setStyle({ fillStyle: chordColor, strokeStyle: chordColor });
    }

    if (i === 0 || i === 4) {
      return new StaveNote({
        keys: [note],
        duration: "4",
      }).setStyle({ fillStyle: "red", strokeStyle: "red" });
    }
    return new StaveNote({
      keys: [note],
      duration: "4",
    });
  });

  staveNotes.push(...mappedNotes);

  return staveNotes;
}
