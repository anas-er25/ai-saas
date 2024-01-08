import * as z from 'zod';

export const formScema = z.object({
    prompt: z.string().min(1,{
        message: "Prompt is requied",
    }),
});