import { SubmissionsPanel } from "@/features/submissions/components/submissions-panel";
import type { SubmissionsSearchParams } from "@/features/submissions/types/submissions.types";

interface SubmissionsPageProps {
  searchParams: Promise<SubmissionsSearchParams>;
}

export default function SubmissionsPage({ searchParams }: SubmissionsPageProps) {
  return (
    <main className="flex justify-center p-6">
      <SubmissionsPanel searchParams={searchParams} />
    </main>
  );
}
