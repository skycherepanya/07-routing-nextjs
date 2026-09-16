"use client";

interface NoteDetailsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function NoteDetailsError({
  error,
  reset,
}: NoteDetailsErrorProps) {
  return (
    <div>
      <p>Could not fetch note details. {error.message}</p>
      <button type="button" onClick={reset}>
        Спробувати знову
      </button>
    </div>
  );
}
