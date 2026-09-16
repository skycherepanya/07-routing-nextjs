import { getSingleNote } from "@/lib/api";
import Modal from "@/components/Modal/Modal";

interface Props {
  params: Promise<{ id: string }>;
}

const NotePreview = async ({ params }: Props) => {
  const { id } = await params;
  const note = await getSingleNote(id);

  if (!note) return null;

  return (
    <Modal>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p style={{ marginTop: "1rem", color: "#666" }}>
        <strong>Tag:</strong> {note.tag}
      </p>
    </Modal>
  );
};

export default NotePreview;
