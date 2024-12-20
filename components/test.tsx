"use client";

import { Note } from "@prisma/client";
import { useState } from "react";

export default function Test() {
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState<Note | null>(null);

  const handleAddNote = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to create note");
      }

      const data: Note = await res.json(); //TODO Note TS
      setNote(data);
      console.log("New Note:", data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleAddNote}
        disabled={loading}
        style={{
          padding: "10px",
          backgroundColor: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {loading ? "Adding..." : "Add Note"}
      </button>

      {note && (
        <div>
          <h3>New Note:</h3>
          <p>ID: {note.id}</p>
          <p>Name: {note.name}</p>
          <p>Created At: {note.created_at.toString()}</p>
        </div>
      )}
    </div>
  );
}
