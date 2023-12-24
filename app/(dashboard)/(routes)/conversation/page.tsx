import Heading from "@/components/Heading";
import { MessageSquare } from "lucide-react";
const ConversationPage = () => {
  return (
    <div>
      <Heading
        title="Conversation"
        description="description"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
    </div>
  );
};

export default ConversationPage;