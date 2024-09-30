import React, { useEffect, useRef } from "react";
import Vex from "vexflow";
import { notesByKey, Key } from "../../data/keyInfo";

interface MusicStaveProps {
  clef?: "treble" | "bass" | "alto" | "tenor";
  keySignature: Key;
}

export const MusicStave: React.FC<MusicStaveProps> = ({
  clef = "treble",
  keySignature,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = "";

      const VF = Vex.Flow;
      const renderer = new VF.Renderer(
        containerRef.current,
        VF.Renderer.Backends.SVG
      );

      // Set a default size
      renderer.resize(300, 120);
      const context = renderer.getContext();

      const stave = new VF.Stave(10, 40, 280);

      // Add clef and key signature
      stave.addClef(clef);
      stave.addKeySignature(keySignature);

      stave.setContext(context).draw();

      const notes = notesByKey[keySignature];
      const staveNotes = notes.map(
        (note) => new VF.StaveNote({ clef, keys: [note], duration: "h" })
      );

      // Automatically determine if we need to add accidentals
      // staveNotes.forEach((staveNote, index) => {
      //   const noteName = notes[index].split("/")[0];
      //   if (noteName.includes("#")) {
      //     (staveNote as any).addAccidental(0, new VF.Accidental("#"));
      //   } else if (noteName.includes("b")) {
      //     (staveNote as any).addAccidental(0, new VF.Accidental("b"));
      //   }
      // });

      const voice = new VF.Voice({ num_beats: 6, beat_value: 4 });
      voice.addTickables(staveNotes);

      new VF.Formatter().joinVoices([voice]).format([voice], 250);

      voice.draw(context, stave);
    }
  }, [clef, keySignature]);

  return <div ref={containerRef} />;
};
