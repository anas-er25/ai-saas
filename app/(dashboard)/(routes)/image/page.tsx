"use client";
import * as z from "zod";
import Image from "next/image";
import Heading from "@/components/Heading";
import {  Download, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {resolutionOptions, amountOptions, formScema } from "./constants";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { Loader } from "@/components/loader";
import { Empty } from "@/components/ui/empty";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";



const ImagePage = () => {
  const router = useRouter();
  const [Images, setImages]= useState<string[]>([]);


  const form = useForm<z.infer<typeof formScema>>({
    resolver: zodResolver(formScema),
    defaultValues: {
      prompt: "",
      amount:"1",
      resolution:"512x512"
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formScema>) => {
    try {
      setImages([]);
      const response = await axios.post("/api/image", values);
      const urls = response.data.map((image:{url: string}) => image.url);
      setImages(urls);
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
          title="Image Generation"
          description="Create your image from your imagination"
          icon={ImageIcon}
          iconColor="text-pink-700"
          bgColor="bg-pink-700/10"
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
                  <FormItem className="col-span-12 md:col-span-4">
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
              <FormField name="amount" render={({ field })=>
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select 
                    disabled={isLoading} 
                    onValueChange={field.onChange} 
                    value={field.value} 
                    defaultValue={field.value}
                  >
                    <FormControl className="bg-[#424242] text-white border-none">
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-[#424242] text-white">
                      {amountOptions.map((option) => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  </FormItem>
            } control={form.control}/>
            
              <Button
                className="col-span-12 md:col-span-1 bg-[#424242] hover:bg-[#4d4d4b] w-full"
                disabled={isLoading}
              >
                <FaPaperPlane size={24} color="white" />
              </Button>
            </form>
          </Form>
        </div>
        </div>
        <div className="space-y-4 mt-4">
        {isLoading && (
            <div className="p-20">
              <Loader />
            </div>
          )}
          {Images.length === 0 && !isLoading && (
            <Empty label="No images generated." />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
          {Images.map((src) => (
            
            <Card key={src} className="rounded-lg overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  fill
                  alt="Generated"
                  src={src}
                />
              </div>
              <CardFooter className="p-2">
                <Button onClick={() => window.open(src)} variant="secondary" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
            
              </CardFooter>
            </Card>
          ))}
        </div>
        </div>
      </div>
  );
};

export default ImagePage;