import { string, z } from "zod";
import { procedure, router } from "../trpc";
import { openai } from "../../lib/openai";

export const latexRouter = router({
  generatePDF: procedure
    .input(
      z.object({
        slides: z.array(
          z.object({
            context: z.string(),
            prompt: z.string(),
          })
        ),
      })
    )
    .mutation(async (opts) => {
      const { slides } = opts.input;
      const generateSlides = await fetch("http://localhost:3000/api/latex/", {
        method: "POST",
        body: JSON.stringify({ slides }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      return { generateSlides };
    }),
});
