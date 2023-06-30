import { z } from "zod";
import { procedure, router } from "../trpc";
import { openai } from "../../lib/openai";
import { exec } from "child_process";
import fs, { promises as fsPromises } from "fs";

const preamble = `
  \\documentclass{article}
  \\usepackage{amsmath}
  \\begin{document}
  `;
const postamble = `
  \\end{document}
  `;

export const latexRouter = router({
  hello: procedure.query(async (opts) => {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Hello world",
    });
    console.log(completion.data.choices[0].text);
    return { text: completion.data.choices[0].text as string };
  }),
  generatePDF: procedure
    .input(
      z.object({
        slides: z.array(z.string()),
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
