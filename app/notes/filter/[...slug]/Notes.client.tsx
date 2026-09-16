"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { fetchNotes, createNote, deleteNote } from "@/lib/api";
import { NewNote, NoteTag } from "@/types/note";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./Notes.client.module.css";

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    setDebouncedSearch(value);
    setCurrentPage(1);
  }, 300);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    debouncedSetSearch(value);
  };

  const queryParams: any = {
    page: currentPage,
    search: debouncedSearch,
  };

  if (tag && tag !== "all") {
    queryParams.tag = tag;
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", currentPage, debouncedSearch, tag || "all"],
    queryFn: () => fetchNotes(queryParams),
  });

  const createMutation = useMutation({
    mutationFn: (newNote: NewNote) => createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setIsModalOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const handleCreateNote = async (values: NewNote) => {
    await createMutation.mutateAsync(values);
  };

  const handleDeleteNote = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onChange={handleSearchChange} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button
          type="button"
          className={css.button}
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading, please wait...</p>}
      {isError && (
        <p>
          Could not fetch the list of notes.{" "}
          {error instanceof Error ? error.message : ""}
        </p>
      )}

      {notes.length > 0 && (
        <NoteList notes={notes} onDelete={handleDeleteNote} />
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NoteForm
          onSubmit={handleCreateNote}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
};

