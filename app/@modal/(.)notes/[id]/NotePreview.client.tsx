"use client";

import Modal from "@/components/Modal/Modal";
import { Note } from "@/types/note";

interface NotePreviewProps {
  note: Note;
}

export default function NotePreviewClient({ note }: NotePreviewProps) {
  return (
    <Modal>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p style={{ marginTop: "1rem", color: "#666" }}>
        <strong>Tag:</strong> {note.tag}
      </p>
    </Modal>
  );
}
