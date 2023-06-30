import { openai } from "@/lib/openai";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { exit } from "process";
import { promisify } from "util";
const exec = promisify(require("child_process").exec);

const generateLatexTemplate = (slides: string[]) => {
  const preamble = `\\documentclass[10pt,xcolor=dvipsnames]{beamer}
\\usetheme[progressbar=frametitle]{metropolis}
\\usepackage{appendixnumberbeamer}
\\usepackage{booktabs}
\\usepackage[scale=2]{ccicons}
\\usepackage{pgfplots}
\\usepgfplotslibrary{dateplot}
\\usepackage{xspace}
\\newcommand{\\themename}{\\textbf{\\textsc{metropolis}}\\xspace}
\\usepackage{pdfpages}
\\\setbeamercolor{section title}{fg=Maroon,bg=Maroon}
\\setbeamercolor*{structure}{bg=Maroon!20,fg=Maroon}
\\setbeamercolor*{palette primary}{use=structure,fg=white,bg=structure.fg}
\\setbeamercolor{progress bar}{fg=gray, bg=gray}
\\title{Empathy Mapping for Binder App}
\\subtitle{Understanding our Users}
\\date{\\today}
\\author{Mohammed Bermime}
\\institute{}
\\begin{document}
\\maketitle
\\begin{frame}{Table of contents}
\\setbeamertemplate{section in toc}[sections numbered]
\\tableofcontents%[hideallsubsections]
\\end{frame}`;
  const postamble = "\\end{document}";
  let document = preamble + "\n" + postamble;
  return document;
};

const organizeSlides = (slides: string[]) => {
  let content = "";
  for (let i = 0; i < slides.length; i++) {
    content += `Slide ${i + 1}` + slides[i] + "\n";
  }
  return content;
};
const generateLatex = async ({
  template,
  slides,
}: {
  template: string;
  slides: string;
}) => {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `You're an agent specialized in generating presentations using Latex. You are given the following template: ${template} and the following slides: ${slides}. Generate the Latex document.`,
    max_tokens: 1000,
  });
  return completion.data.choices[0].text as string;
};

const writeLatexDocument = async (document: string) => {
  const tempFilePath = "/tmp/document.tex";
  fs.writeFileSync(tempFilePath, document);
  console.log("Wrote LaTeX file to", tempFilePath);
  return tempFilePath;
};

const compileLaTeX = async (documentPath: string): Promise<string> => {
  const { stdout, stderr } = await exec(
    `pdflatex -output-directory=/tmp ${documentPath}`
  );
  if (stderr) {
    throw new Error(stderr);
  }
  console.log(stdout);
  return "/tmp/document.pdf";
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { slides } = req.body;
  console.log("slides", slides);
  const template = generateLatexTemplate(slides);
  const document = await generateLatex({
    template,
    slides: organizeSlides(slides),
  });
  console.log("document", document);
  res.status(200).json({ document });

  /* 
  const latexPath = await writeLatexDocument(document);

  try {
    const pdfPath = await compileLaTeX(latexPath);
    const pdf = fs.readFileSync(pdfPath);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=document.pdf");
    res.send(pdf);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to generate PDF" });
   } */
}
