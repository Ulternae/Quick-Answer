import { getSubmissionsAction } from "@/features/submissions/actions/get-submissions/get-submissions.action";
import { SubmissionsHeader } from "@/features/submissions/components/submissions-header";
import type { SubmissionsSearchParams } from "@/features/submissions/types/submissions.types";

interface SubmissionsPanelProps {
  searchParams: Promise<SubmissionsSearchParams>;
}

async function SubmissionsPanel({ searchParams }: SubmissionsPanelProps) {
  const query = await searchParams;
  const submissions = await getSubmissionsAction(query);

  console.info("[SubmissionsPanel] activity submissions", submissions);

  return (
    <section className="min-h-[calc(100svh-7rem)] w-full max-w-5xl">
      <SubmissionsHeader />
    </section>
  );
}

export { SubmissionsPanel };
