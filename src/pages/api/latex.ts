import { openai } from "@/lib/openai";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { exit } from "process";
import { promisify } from "util";
const exec = promisify(require("child_process").exec);

const generateLatexDocument = async (document: string) => {
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

const generateHeader = async (context: string) => {
  const defaultHeader = `\\title{Empathy Mapping for Binder App}
        \\subtitle{Understanding our Users}
        \\date{\\today}
        \\author{Mohammed Bermime}
        \\institute{}`;
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Modify the following Latex code (make sure to escape using backslashes) using the context below:
      ${defaultHeader}.
      Context: ${context}`,
    max_tokens: 1000,
  });

  return { text: completion.data.choices[0].text as string };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const { input } = req.body;

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
\\setbeamercolor{progress bar}{fg=gray, bg=gray}`;

  const postamble = "\\end{document}";

  let document = `
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
\\end{frame}
\\section[Intro]{Introduction}
\\begin{frame}[fragile]{Introduction}
In this presentation, we will discuss the empathy mapping of our two user types - Businesses and Customers.
\\end{frame}
\\section{Empathy Map for Businesses}
\\begin{frame}{Think and Feel}
Concerned about reaching more customers, excited about the potential for growth, worried about maintaining customer loyalty, curious about digital marketing and its benefits.
    \\end{frame}`;

  const { text } = await generateHeader(
    "Presenatioin about an app that I'm building. It's called Label and it would revolutionize the way we label things. My name is Said Hamid from the univerity of Ben M'Sik."
  );
  document = `${preamble}\n${text}\n\\begin{document}\\textbf{Hello World!}${postamble}`;

  const latexPath = await generateLatexDocument(document);

  try {
    const pdfPath = await compileLaTeX(latexPath);
    const pdf = fs.readFileSync(pdfPath);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=document.pdf");
    res.send(pdf);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
}
