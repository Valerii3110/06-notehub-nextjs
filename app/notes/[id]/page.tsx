import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/getQueryClient';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from '@/app/notes/[id]/NoteDetails.client';

interface NoteDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function NoteDetailsPage({ params }: NoteDetailsPageProps) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', params.id],
    queryFn: () => fetchNoteById(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={params.id} />
    </HydrationBoundary>
  );
}
