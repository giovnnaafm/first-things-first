import Title from "@/components/title";
import Wrapper from "@/components/wrapper";
import CreateTask from "@/features/task/create";

export default function CreateBacklogPage() {
  return (
    <Wrapper>
      <Title title="Create new task" />
      <CreateTask />
    </Wrapper>
  );
}
