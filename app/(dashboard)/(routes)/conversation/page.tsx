"use client";
import * as z from "zod";
import Image from "next/image";
import Heading from "@/components/Heading";
import { MessageSquare } from "lucide-react";
import { Loader } from "@/components/loader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formScema } from "./constants";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChatCompletionRequestMessage } from "openai";
import { FaPaperPlane } from "react-icons/fa";
import { Empty } from "@/components/ui/empty";

const ConversationPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [buttonText, setButtonText] = useState("Copy");
  const [tab, setTab] = useState([]);

  const copyToClipboard = (textToCopy, index) => {
    const tempInput = document.createElement("textarea");
    tempInput.value = textToCopy;

    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    // Update the buttonText for the clicked button
    setTab((prevTab) => {
      const newTab = [...prevTab];
      newTab[index].buttonText = "Copied";
      return newTab;
    });

    // Reset button text after 2 seconds
    setTimeout(() => {
      setTab((prevTab) => {
        const newTab = [...prevTab];
        newTab[index].buttonText = "Copy";
        return newTab;
      });
    }, 2000);
  };

  const form = useForm<z.infer<typeof formScema>>({
    resolver: zodResolver(formScema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formScema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });
      const newTab = [userMessage, response.data];
      setTab((prevData) => [...prevData, newTab]);

      setMessages((current) => [...current, userMessage, response.data]);

      form.reset();
    } catch (error: any) {
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <div className="sticky top-16 bg-[#1d1c1c]">
        <Heading
          title="Conversation"
          description="description"
          icon={MessageSquare}
          iconColor="text-violet-500"
          bgColor="bg-violet-500/10"
        />
        <div className="px-4 lg:px-8 flex justify-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border-none p-4 px-3 md:px-6 w-full focus-within:shadow-sm grid grid-cols-9 gap-2 lg:w-3/4"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 md:col-span-8">
                    <FormControl className="m-0 p-0">
                      <Input
                        type="text"
                        className="border-none text-white ps-5 placeholder:text-white bg-[#424242]"
                        style={{
                          caretColor: "white",
                        }}
                        disabled={isLoading}
                        placeholder="Type your message..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 md:col-span-1 bg-[#424242] hover:bg-[#4d4d4b] w-full"
                disabled={isLoading}
              >
                <FaPaperPlane size={24} color="white" />
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-20">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label="No conversation started." />
          )}
          <div className="">
            {tab.map((message, index) => {
              return (
                <>
                  <div className="flex flex-col border-none rounded-3xl ms-10 me-10 mt-5 bg-[#424242] text-white p-6">
                    <p className="pb-3">{message[0]["content"]}</p>
                    <hr />
                    <div className="bg-[#424242] text-white flex justify-between mt-3">
                      <div className="sticky h-8 w-8">
                        <Image fill alt="logo" src="/logo.png" />
                      </div>
                      <button
                        onClick={() => {
                          copyToClipboard(message[1]["content"], index);
                        }}
                      >
                        {message.buttonText || "Copy"}
                      </button>
                    </div>

                    <div className="mt-5" key={message[0]["content"]}>
                      {message[1]["content"]}
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
