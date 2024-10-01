import { useEffect, useRef, useState } from "react";
import { Renderer, Stave, Voice, Formatter, StaveNote } from "vexflow";
import { Key, notesByKey } from "../../data/keyInfo";

interface MusicStaveProps {
  clef?: "treble" | "bass" | "alto" | "tenor";
  keySignature: Key;
}

export function MusicStave({ clef = "treble", keySignature }: MusicStaveProps) {
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

      console.log("WINDOW WIDTH", window.innerWidth);
      console.log("STAVE WIDTH", stave.getWidth());
      stave.setContext(context).draw();

      const notes = notesByKey[keySignature];
      const staveNotes = createNotes(notes);

      const voice = new Voice({ num_beats: 4, beat_value: 4 });
      voice.addTickables(staveNotes);

      new Formatter().joinVoices([voice]).format([voice], staveWidth - 50);
      voice.draw(context, stave);
    }
  }, [clef, keySignature, dimensions]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "auto", minHeight: "200px" }}
    />
  );
}

function createNotes(notes: string[]): StaveNote[] {
  return notes.map((note, i) => {
    if (i === 0 || i === 4) {
      return new StaveNote({
        keys: [note],
        duration: "8",
      }).setStyle({ fillStyle: "red", strokeStyle: "red" });
    }
    return new StaveNote({
      keys: [note],
      duration: "8",
    });
  });
}
