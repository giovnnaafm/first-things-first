import {ReactNode} from "react";

interface TopicSectionProps {
  title: string;
  content: string;
}

function TopicSection({ title, content }:TopicSectionProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-primary">{title}</h2>
      <p className="text-gray-700 mt-2">{content}</p>
    </div>
  );
};

export default function AboutView() {
  return (
      <section className="max-w-4xl mx-auto px-6 py-8 bg-white rounded-md">
      <TopicSection
        title="Managing Tasks"
        content="Managing tasks effectively is crucial for team productivity and project success.
          This application provides features designed to streamline task assignment, tracking,
          and organization, ensuring that everyone on the team stays aligned and can focus on
          high-impact work."
      />
      <TopicSection
        title="Importance of Prioritizing Tasks"
        content="Prioritizing tasks helps teams focus on what truly matters, maximizing the impact
          of their efforts. By establishing a clear order of priorities, this application allows
          teams to tackle tasks in a way that aligns with overall goals and minimizes time
          spent on low-priority work."
      />
      <TopicSection
        title="MoSCoW Method"
        content="The MoSCoW method is a simple, effective technique for prioritizing features and tasks
          into four categories: Must have, Should have, Could have, and Won’t have. By using this
          method, teams can ensure essential tasks are completed first, followed by tasks that
          provide added value."
      />
      <TopicSection
        title="Kano Model"
        content="The Kano Model helps teams understand and categorize features based on customer satisfaction.
          Features are divided into categories, such as basic needs, performance needs, and excitement
          factors. This approach ensures that resources are invested in features that truly resonate
          with users."
      />
      <TopicSection
        title="RICE Scoring"
        content="The RICE method (Reach, Impact, Confidence, Effort) is a data-driven way to prioritize tasks.
          By assigning a numerical score to each task based on its reach, impact, confidence level, and
          estimated effort, teams can objectively decide which tasks will deliver the most value."
      />
      <TopicSection
        title="Prioritization by ChatGPT"
        content="This application allows you to leverage AI with ChatGPT to help prioritize tasks based on specific
          criteria. By crafting prompts and using ChatGPT, teams can get quick suggestions on which tasks
          might be more impactful or time-sensitive, making prioritization simpler."
      />
      <TopicSection
        title="Integration with Jira"
        content="Our application integrates seamlessly with Jira, allowing users to import their backlog and sync
          tasks. With this integration, users can prioritize and manage tasks directly within the application,
          combining the strengths of both tools for a comprehensive task management experience."
      />
    </section>
  );
}
