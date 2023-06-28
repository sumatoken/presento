import { exec } from "child_process";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const { input } = req.body;

  const preamble = "\\documentclass{article}\n\\begin{document}";
  const postamble = "\\end{document}";
  const document = `\documentclass[10pt,xcolor=dvipsnames]{beamer}

\\usetheme[progressbar=frametitle]{metropolis}
\\usepackage{appendixnumberbeamer}

\\usepackage{booktabs}
\\usepackage[scale=2]{ccicons}

\\usepackage{pgfplots}
\\usepgfplotslibrary{dateplot}

\\usepackage{xspace}
\newcommand{\themename}{\textbf{\textsc{metropolis}}\\xspace}

\\usepackage{pdfpages}
\setbeamercolor{section title}{fg=Maroon,bg=Maroon}
\setbeamercolor*{structure}{bg=Maroon!20,fg=Maroon}
\setbeamercolor*{palette primary}{use=structure,fg=white,bg=structure.fg}
\setbeamercolor{progress bar}{fg=gray, bg=gray}

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

\title{Empathy Mapping for Binder App}
\subtitle{Understanding our Users}
\date{\today}
\author{Mohammed Bermime}
\institute{}
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

\begin{document}

\maketitle

\begin{frame}{Table of contents}
  \setbeamertemplate{section in toc}[sections numbered]
  \tableofcontents%[hideallsubsections]
\end{frame}

\section[Intro]{Introduction}

\begin{frame}[fragile]{Introduction}
In this presentation, we will discuss the empathy mapping of our two user types - Businesses and Customers.
\end{frame}

\section{Empathy Map for Businesses}

\begin{frame}{See}
Wide range of products and stores, different prices, online and offline advertisements.
\end{frame}

\begin{frame}{Say and Do}
Share their shopping experiences, seek out the best deals, explore new stores or products, make purchasing decisions based on available information.
\end{frame}

\end{document}`;

  let writeStream = fs.createWriteStream("/tmp/document.tex");
  writeStream.write(document);
  writeStream.end();
  writeStream.on("finish", function () {
    exec(
      "/Library/TeX/texbin/pdflatex document.tex",
      { cwd: "/tmp" },
      (err, stdout, stderr) => {
        if (err) {
          console.error("Error running pdflatex:", err);
          console.log("stdout", stdout);
          console.log("stderr", stderr);
          res.status(500).json({ error: "Failed to generate PDF" });
          res.end();
          return;
        }

        const pdf = fs.readFileSync("/tmp/document.pdf");

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=document.pdf"
        );
        res.send(pdf);
      }
    );
  });
}
