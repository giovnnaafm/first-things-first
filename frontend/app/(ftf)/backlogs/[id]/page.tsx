import Title from "@/components/title";
import Wrapper from "@/components/wrapper";
import TasksView from "@/features/backlog/tasks/view";

export default function BackLogPage() {
  return (
        <Wrapper  >
      <Title title="Backlog's tasks"/>
      <TasksView />
    </Wrapper>
  );
}
