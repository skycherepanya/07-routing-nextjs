"use client";

import { useEffect } from "react";
import css from "@/app/Home.module.css";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={css.container}>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()} className={css.link}>
        Try again
      </button>
    </div>
  );
}
