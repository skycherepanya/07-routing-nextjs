import { getSingleNote } from "@/lib/api";
import NotePreviewClient from "./NotePreview.client";

interface Props {
  params: Promise<{ id: string }>;
}

const NotePreview = async ({ params }: Props) => {
  const { id } = await params;
  const note = await getSingleNote(id);

  if (!note) return null;

  return <NotePreviewClient note={note} />;
};

export default NotePreview;
