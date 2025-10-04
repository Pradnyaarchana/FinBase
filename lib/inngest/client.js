import { Inngest } from "inngest";


export const inngest = new Inngest({
    id: "Finwise",
    name: "Finwise",
    retryFunction: async( attemp) =>({
        delay: Math.pow(2 , attemp) * 1000,
        maxAttempts: 2
        
    }),
});
