import AgentAssignments from "../../components/agent-Component/AgentAssignments";
import AgentCardSection from "../../components/agent-Component/AgentCardSection";
import AgentWelcomeSection from "../../components/agent-Component/AgentWelcomeSection";

const Agent = () => {
  return (
    <div className="">
      <AgentWelcomeSection />
      <AgentCardSection />
      <AgentAssignments />
    </div>
  );
};

export default Agent;
