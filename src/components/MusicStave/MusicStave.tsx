import { useEffect, useRef } from "react";
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

  useEffect(() => {
    if (containerRef.current) {
      const width = window.outerWidth - 30; // Use current window width
      const height = Math.max(200, Math.min(400, width * 0.5));

      if (!rendererRef.current) {
        rendererRef.current = new Renderer(
          containerRef.current,
          Renderer.Backends.SVG
        );
      }
      rendererRef.current.resize(width + 1, height);

      const context = rendererRef.current.getContext();
      context.clear();

      const staveWidth = width - 80;
      const staveY = height * 0.2;
      const stave = new Stave(0, staveY, staveWidth);

      stave.addClef(clef);
      stave.addKeySignature(keySignature);
      stave.setWidth(width);

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
  }, [clef, keySignature, chord, chordColor]);

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
