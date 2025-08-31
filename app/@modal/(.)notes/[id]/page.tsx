import { getSingleNoteServer } from "@/lib/api/serverApi";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotePreviewClient from "./NotePreview.client";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NotePreview({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  const noteId = id;
  await queryClient.prefetchQuery({
    queryKey: ["note", noteId],
    queryFn: () => getSingleNoteServer(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient noteId={noteId} />
    </HydrationBoundary>
  );
}
