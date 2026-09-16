import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { NoteTag } from "@/types/note";
import NotesClient from "@/components/NotesClient/NotesClient";
import css from "../../NotesPage.module.css";

interface NotesFilterPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function NotesFilterPage({
  params,
}: NotesFilterPageProps) {
  const { slug } = await params;
  const filter = slug?.[0] || "all";
  const tag = filter !== "all" ? (filter as NoteTag) : undefined;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", filter],
    queryFn: () => fetchNotes({ page: 1, search: "", ...(tag ? { tag } : {}) }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className={css.app}>
        <NotesClient tag={filter} />
      </div>
    </HydrationBoundary>
  );
}
