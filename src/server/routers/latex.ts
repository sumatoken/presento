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
        latex: z.string(),
      })
    )
    .query(async (opts) => {
      const preamble = "\\documentclass{article}\n\\begin{document}";
      const postamble = "\\end{document}";
      const document = `${preamble}\n${opts.input.latex}\n${postamble}`;

      let writeStream = fs.createWriteStream("/tmp/document.tex");
      writeStream.write(document);
      writeStream.end();

      const pdf = await new Promise((resolve, reject) => {
        writeStream.on("finish", function () {
          exec(
            "/Library/TeX/texbin/pdflatex document.tex",
            { cwd: "/tmp" },
            (err, stdout, stderr) => {
              if (err) {
                console.error("Error running pdflatex:", err);
                console.log("stdout", stdout);
                console.log("stderr", stderr);
                reject(new Error("Failed to generate PDF"));
                return;
              }

              try {
                const pdfData = fs.readFileSync("/tmp/document.pdf");
                resolve(pdfData);
              } catch (err) {
                console.error("Error reading PDF:", err);
                reject(new Error("Failed to read PDF"));
              }
            }
          );
        });
      });

      return { pdf };
    }),
});
