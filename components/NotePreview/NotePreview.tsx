"use client";

import { Note } from "@/types/note";
import css from "./NotePreview.module.css";

interface NotePreviewProps {
  note: Note;
  onBack: () => void;
}

export default function NotePreview({ note, onBack }: NotePreviewProps) {
  return (
    <div className={css.container}>
      <button className={css.backBtn} onClick={onBack}>
        ← Back
      </button>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <span className={css.tag}>{note.tag}</span>
        </div>
        <p className={css.content}>{note.content}</p>
        <div className={css.date}>{note.createdAt}</div>
      </div>
    </div>
  );
}
