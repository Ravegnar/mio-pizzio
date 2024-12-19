"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import {
  getFetcher,
  postFetcher,
  putFetcher,
  deleteFetcher,
} from "@/utils/fetchers";

export default function NotesPage() {
  const { data, error, isLoading } = useSWR("/api/notes", getFetcher);
  const [noteName, setNoteName] = useState("");
  const [editingNote, setEditingNote] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleAddNote = async () => {
    const previousData = data;

    try {
      await mutate(
        "/api/notes",
        (currentData: any) => [
          ...(currentData || []),
          { name: noteName, id: "temp-id" },
        ],
        { revalidate: false },
      );

      const newNote = await postFetcher("/api/notes", { name: noteName });

      await mutate(
        "/api/notes",
        (currentData: any) =>
          currentData
            ? currentData.map((note: any) =>
                note.id === "temp-id" ? newNote : note,
              )
            : [newNote],
        { revalidate: false },
      );

      setNoteName(""); // Resetuje input
    } catch (error) {
      console.error("Error creating note:", error);

      await mutate("/api/notes", () => previousData, { revalidate: false });
    }
  };

  const handleEditNote = async (id: string, newName: string) => {
    const previousData = data;

    try {
      await mutate(
        "/api/notes",
        (currentData: any) =>
          currentData
            ? currentData.map((note: any) =>
                note.id === id ? { ...note, name: newName } : note,
              )
            : [],
        { revalidate: false },
      );

      const updatedNote = await putFetcher(`/api/notes/${id}`, {
        name: newName,
      });

      await mutate(
        "/api/notes",
        (currentData: any) =>
          currentData
            ? currentData.map((note: any) =>
                note.id === id ? updatedNote : note,
              )
            : [],
        { revalidate: false },
      );

      setEditingNote(null); // Resetuje editování
    } catch (error) {
      console.error("Error editing note:", error);

      await mutate("/api/notes", () => previousData, { revalidate: false });
    }
  };

  const handleDeleteNote = async (id: string) => {
    const previousData = data;

    try {
      await mutate(
        "/api/notes",
        (currentData: any) =>
          currentData?.filter((note: any) => note.id !== id) || [],
        { revalidate: false },
      );

      console.log("%c<<< id >>>", "background: #222; color: deepskyblue", id);

      const ss = await deleteFetcher(`/api/notes/${id}`);

      console.log("%c<<< ss >>>", "background: #222; color: goldenrod", ss);
    } catch (error) {
      console.error("Error deleting note:", error);

      await mutate("/api/notes", () => previousData, { revalidate: false });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {data.map((note: { id: string; name: string; created_at: string }) => (
          <li key={note.id}>
            {editingNote?.id === note.id ? (
              <div>
                <input
                  type="text"
                  value={editingNote.name}
                  onChange={(e) =>
                    setEditingNote({ id: note.id, name: e.target.value })
                  }
                />
                <button
                  onClick={() => handleEditNote(note.id, editingNote.name)}
                >
                  Save
                </button>
                <button onClick={() => setEditingNote(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <p>{note.name}</p>
                <small>{new Date(note.created_at).toLocaleString()}</small>
                <button
                  onClick={() =>
                    setEditingNote({ id: note.id, name: note.name })
                  }
                >
                  Edit
                </button>
                <button onClick={() => handleDeleteNote(note.id)}>
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={noteName}
          onChange={(e) => setNoteName(e.target.value)}
          placeholder="Enter note name"
        />
        <button onClick={handleAddNote}>Add Note</button>
      </div>
    </div>
  );
}
