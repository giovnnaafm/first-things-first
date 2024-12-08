import Title from "@/components/title";
import Wrapper from "@/components/wrapper";
import AboutView from "@/features/about/view";

export default function AboutPage() {
  return (
    <Wrapper  >
      <Title title="About this application"/>
      <AboutView />
    </Wrapper>
  );
}
