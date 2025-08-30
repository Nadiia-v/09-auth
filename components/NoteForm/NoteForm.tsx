"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api/clientApi";
import { toast } from "react-hot-toast";
import css from "./NoteForm.module.css";
import { Tags } from "@/types/note";
import { useNoteStore } from "@/lib/store/noteStore";

export default function NoteForm() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { draft, setDraft, clearDraft } = useNoteStore();
  const [title, setTitle] = useState(draft.title);
  const [content, setContent] = useState(draft.content);
  const [tag, setTag] = useState<Tags>(draft.tag as Tags);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setDraft({ title, content, tag });
  }, [title, content, tag, setDraft]);

  const mutation = useMutation({
    mutationFn: createNote,
    onMutate: () => setIsSubmitting(true),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      toast.success("Note created successfully");
      router.push("/notes");
    },
    onError: () => {
      toast.error("Failed to create note");
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const handleSubmit = async (formData: FormData) => {
    const title = formData.get("title")?.toString().trim();
    const content = formData.get("content")?.toString().trim();
    const tag = formData.get("tag")?.toString() as Tags;

    if (!title || !content || !tag) {
      toast.error("All fields are required");
      return;
    }

    mutation.mutate({ title, content, tag });
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className={css.input}
          required
          minLength={3}
          maxLength={50}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          className={css.textarea}
          required
          maxLength={500}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          required
          value={tag}
          onChange={(e) => setTag(e.target.value as Tags)}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.buttonGroup}>
        <button
          type="submit"
          className={css.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create note"}
        </button>

        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.push("/notes")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
