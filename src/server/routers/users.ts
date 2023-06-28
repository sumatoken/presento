import { z } from "zod";
import { procedure, router } from "../trpc";
import { openai } from "../../lib/openai";
export const usersRouter = router({
  hello: procedure.query(async (opts) => {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Hello world",
    });
    console.log(completion.data.choices[0].text);
    return { text: completion.data.choices[0].text as string };
  }),
});
