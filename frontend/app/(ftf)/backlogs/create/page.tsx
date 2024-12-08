import Title from "@/components/title";
import Wrapper from "@/components/wrapper";
import CreateBacklog from "@/features/backlog/create/create";

export default function CreateBacklogPage() {
  return (
    <Wrapper  >
      <Title title="Create new backlog" />
      <div className="lg:w-1/2">
        <CreateBacklog />
      </div>
    </Wrapper>
  );
}
