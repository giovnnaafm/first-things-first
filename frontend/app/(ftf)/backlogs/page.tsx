import Title from "@/components/title";
import Wrapper from "@/components/wrapper";
import BackLogView from "@/features/backlog/view";

export default function BackLogPage() {
    return(
            <Wrapper  >
            <Title title="Your backlogs"/>
           <BackLogView/>
        </Wrapper>
    )
}