import { useEffect, useRef } from "react";
import { Renderer, StaveNote, Vex } from "vexflow";
import { Key, notesByKey } from "../../data/keyInfo";

interface MusicStaveProps {
  clef?: "treble" | "bass" | "alto" | "tenor";
  keySignature: Key;
}

export function TestStave({ clef = "treble", keySignature }: MusicStaveProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<Renderer | null>(null);

  useEffect(() => {
    if (divRef.current) {
      const { Renderer, Stave, Voice, Formatter } = Vex.Flow;

      // Create an SVG renderer and attach it to the DIV element only if it doesn't exist
      if (!rendererRef.current) {
        rendererRef.current = new Renderer(
          divRef.current,
          Renderer.Backends.SVG
        );
        rendererRef.current.resize(500, 250);
      }

      const context = rendererRef.current.getContext();

      // Clear the previous content
      context.clear();

      // Create a stave of width 400 at position 10, 40 on the canvas.
      const stave = new Stave(10, 40, 450);

      // Add a clef and time signature.
      stave.addClef(clef).addTimeSignature("4/4");
      stave.addKeySignature(keySignature);

      // Connect it to the rendering context and draw!
      stave.setContext(context).draw();

      // Create the notes
      const notes = notesByKey[keySignature];

      const staveNotes = createNotes(notes);

      console.log("Stave notes", staveNotes);

      // Create a voice in 4/4 and add above notes
      const voice = new Voice({ num_beats: 4, beat_value: 4 });
      voice.addTickables(staveNotes);

      // Format and justify the notes to 400 pixels.
      new Formatter().joinVoices([voice]).format([voice], 350);

      // Render voice
      voice.draw(context, stave);
    }
  }, [clef, keySignature]);

  return <div ref={divRef} />;
}

function createNotes(notes: string[]): StaveNote[] {
  const staveNotes = notes.map((note) => {
    // const accidental = getNoteAccidental(note);

    // if (accidental === "#") {
    //   return new StaveNote({
    //     keys: [note],
    //     duration: "q",
    //   }).addModifier(new Accidental("#"));
    // } else if (accidental === "b") {
    //   return new StaveNote({
    //     keys: [note],
    //     duration: "q",
    //   }).addModifier(new Accidental("b"));
    // }
    return new StaveNote({
      keys: [note],
      duration: "8",
    });
  });

  // staveNotes.push(new StaveNote({ keys: ["b/4"], duration: "8r" }));
  return staveNotes;
}

// export function getNoteAccidental(note: string): string {
//   return note.length > 1 ? note[1] : "";
// }
