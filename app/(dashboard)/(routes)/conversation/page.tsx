"use client";
import * as z from "zod";
import Heading from "@/components/Heading";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formScema } from "./constants";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useState } from "react";
import {ChatCompletionRequestMessage} from "openai";
import { FaPaperPlane } from 'react-icons/fa';


const ConversationPage = () => {
const router =useRouter();
const [messages,setMessages]=useState<ChatCompletionRequestMessage[]>([]);
const [ buttonText, setButtonText] = useState('Copy');
const [tab, setTab] = useState([]);


const copyToClipboard = (textToCopy) => {
 
  const tempInput = document.createElement('textarea');
  tempInput.value = textToCopy;

  document.body.appendChild(tempInput);
  tempInput.select();
  tempInput.setSelectionRange(0, 99999);
  document.execCommand('copy');
  document.body.removeChild(tempInput);

  setButtonText('Copied');
 // Reset button text after 2 seconds
 setTimeout(() => {
  setButtonText('Copy');
}, 1000);

};



  const form = useForm<z.infer<typeof formScema>>({
    resolver: zodResolver(formScema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formScema>) => {
    try{
        const userMessage:ChatCompletionRequestMessage={
          role:"user",
          content:values.prompt,
        };
        const newMessages = [...messages,userMessage];

        const response = await axios.post("/api/conversation",{
          messages:newMessages,
        });
        const ta= [userMessage,response.data];
        setTab({...tab,ta});
        

        setMessages((current)=>[...current,userMessage,response.data]);
        
        
        form.reset();
    }catch(error:any){
      console.log(error);
      
    }finally{
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
      <div className="px-4 lg:px-8flex items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="
          rounded-lg 
          border-none 
          p-4 
          px-3 
          md:px-6 
          w-full
          focus-within:shadow-sm
          grid
          grid-cols-9
          gap-2
          lg:w-3/4
        "
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
                        caretColor: 'white',
                      }}
                      disabled={isLoading}
                      placeholder="Type your message..."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="col-span-12 md:col-span-1 bg-[#424242] hover:bg-[#4d4d4b] w-full" disabled={isLoading}>
            <FaPaperPlane size={24} color="white" />

            </Button>
          </form>
        </Form>
      </div>
      </div>
      <div className="">
          
            {messages.map((message)=>{
              console.log(message)
              console.log("tab:",tab);
              
              // if(message.role==="assistant"){
                return(
                <div className="flex flex-col border-none rounded-3xl ms-10 me-10 mt-5 bg-[#424242] text-white p-6">
                <div className="bg-[#424242] text-white flex justify-between">
                  
                  
                            <h3>POTA.AI</h3>
                          <button onClick={()=>{copyToClipboard(message.content)}}>{buttonText}</button>
                        </div>
                          
                            <div className="mt-5" key={message.content}>
                              {message.content}
                            </div>
                            
                  
                      
                </div>
) })}
{/* ============================= */}
<div className="flex flex-col border-none rounded-3xl ms-10 me-10 mt-5 bg-[#424242] text-white p-6">
                <div className="bg-[#424242] text-white flex justify-between">
                  
                  
                            <h3>POTA.AI</h3>
                          <button>{buttonText}</button>
                        </div>
                          
                            <div className="mt-5">
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti ratione nesciunt praesentium, quas dolor eveniet perspiciatis nemo recusandae modi, iure, dolorum cumque. Laudantium vitae minus fugit totam incidunt voluptas molestias!
                            </div>
                            
                  
                      
                </div>

                <div className="flex flex-col border-none rounded-3xl ms-10 me-10 mt-5 bg-[#424242] text-white p-6">
                <div className="bg-[#424242] text-white flex justify-between">
                  
                  
                            <h3>POTA.AI</h3>
                          <button>{buttonText}</button>
                        </div>
                          
                            <div className="mt-5">
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti ratione nesciunt praesentium, quas dolor eveniet perspiciatis nemo recusandae modi, iure, dolorum cumque. Laudantium vitae minus fugit totam incidunt voluptas molestias!
                            </div>
                            
                  
                      
                </div>
                <div className="flex flex-col border-none rounded-3xl ms-10 me-10 mt-5 bg-[#424242] text-white p-6">
                <div className="bg-[#424242] text-white flex justify-between">
                  
                  
                            <h3>POTA.AI</h3>
                          <button>{buttonText}</button>
                        </div>
                          
                            <div className="mt-5">
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti ratione nesciunt praesentium, quas dolor eveniet perspiciatis nemo recusandae modi, iure, dolorum cumque. Laudantium vitae minus fugit totam incidunt voluptas molestias!
                            </div>
                            
                  
                      
                </div>
                <div className="flex flex-col border-none rounded-3xl ms-10 me-10 mt-5 bg-[#424242] text-white p-6">
                <div className="bg-[#424242] text-white flex justify-between">
                  
                  
                            <h3>POTA.AI</h3>
                          <button>{buttonText}</button>
                        </div>
                          
                            <div className="mt-5">
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti ratione nesciunt praesentium, quas dolor eveniet perspiciatis nemo recusandae modi, iure, dolorum cumque. Laudantium vitae minus fugit totam incidunt voluptas molestias!
                            </div>
                            
                  
                      
                </div>
                <div className="flex flex-col border-none rounded-3xl ms-10 me-10 mt-5 bg-[#424242] text-white p-6">
                <div className="bg-[#424242] text-white flex justify-between">
                  
                  
                            <h3>POTA.AI</h3>
                          <button>{buttonText}</button>
                        </div>
                          
                            <div className="mt-5">
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti ratione nesciunt praesentium, quas dolor eveniet perspiciatis nemo recusandae modi, iure, dolorum cumque. Laudantium vitae minus fugit totam incidunt voluptas molestias!
                            </div>
                            
                  
                      
                </div>
                <div className="flex flex-col border-none rounded-3xl ms-10 me-10 mt-5 bg-[#424242] text-white p-6">
                <div className="bg-[#424242] text-white flex justify-between">
                  
                  
                            <h3>POTA.AI</h3>
                          <button>{buttonText}</button>
                        </div>
                          
                            <div className="mt-5">
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti ratione nesciunt praesentium, quas dolor eveniet perspiciatis nemo recusandae modi, iure, dolorum cumque. Laudantium vitae minus fugit totam incidunt voluptas molestias!
                            </div>
                            
                  
                      
                </div>
                <div className="flex flex-col border-none rounded-3xl ms-10 me-10 mt-5 bg-[#424242] text-white p-6">
                <div className="bg-[#424242] text-white flex justify-between">
                  
                  
                            <h3>POTA.AI</h3>
                          <button>{buttonText}</button>
                        </div>
                          
                            <div className="mt-5">
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti ratione nesciunt praesentium, quas dolor eveniet perspiciatis nemo recusandae modi, iure, dolorum cumque. Laudantium vitae minus fugit totam incidunt voluptas molestias!
                            </div>
                            
                  
                      
                </div>
                <div className="flex flex-col border-none rounded-3xl ms-10 me-10 mt-5 bg-[#424242] text-white p-6">
                <div className="bg-[#424242] text-white flex justify-between">
                  
                  
                            <h3>POTA.AI</h3>
                          <button>{buttonText}</button>
                        </div>
                          
                            <div className="mt-5">
                              Lorem dolor sit amet consectetur adipisicing elit. Deleniti ratione nesciunt praesentium, quas dolor eveniet perspiciatis nemo recusandae modi, iure, dolorum cumque. Laudantium vitae minus fugit totam incidunt voluptas molestias!
                            </div>
                            
                  
                      
                </div>
                
{/* =============== */}
      </div>
    </div>
  );
};

export default ConversationPage;

