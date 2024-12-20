/*
    const { data, error } = useSWR("/api/notes", getFetcher);
*/
export const getFetcher = async (url: string) => {
   const res = await fetch(url);
   if (!res.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
   }

   return res.json();
};

/*
    const handleAddNote = async (noteName: string) => {
      const newNote = await postFetcher("/api/notes", { name: noteName });
      console.log(newNote);
    };
*/
export const postFetcher = async <T>(url: string, body: T) => {
   const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
   });
   if (!res.ok) {
      throw new Error(`Failed to post data to ${url}`);
   }

   return res.json();
};

/*
    const handleUpdateNote = async (noteId: string, newName: string) => {
      const updatedNote = await putFetcher(`/api/notes/${noteId}`, { name: newName });
      console.log(updatedNote);
    };
*/
export const putFetcher = async <T>(url: string, body: T) => {
   const res = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
   });
   if (!res.ok) {
      throw new Error(`Failed to update data at ${url}`);
   }

   return res.json();
};

/*
const handleDeleteNote = async (noteId: string) => {
      await deleteFetcher(`/api/notes/${noteId}`);
      console.log("Note deleted");
    };
*/
export const deleteFetcher = async (url: string) => {
   const res = await fetch(url, {
      method: "DELETE",
   });

   console.log("%c<<< res >>>", "background: #222; color: goldenrod", res);
   if (!res.ok) {
      throw new Error(`Failed to delete data from ${url}`);
   }

   return res.json();
};
