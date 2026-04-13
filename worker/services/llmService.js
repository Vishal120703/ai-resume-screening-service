import axios from "axios";
import fs from "fs";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const evaluateResume = async (resumeText, jobDescription) => {
  const promptTemplate = fs.readFileSync(
    "../prompts/evaluation_prompt.txt",
    "utf-8"
  );

  const finalPrompt = `
${promptTemplate}

Job Description:
${jobDescription}

Resume:
${resumeText}
`;

  let attempts = 3;

  while (attempts > 0) {
    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: finalPrompt,
            },
          ],
          temperature: 0.2,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.LLM_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.choices[0].message.content;

    } catch (error) {
      if (error.response?.status === 429) {
        console.warn("⚠️ Rate limit hit. Retrying...");

        await sleep(2000); // wait 2 sec
        attempts--;

      } else {
        throw error;
      }
    }
  }

  throw new Error("LLM failed after retries");
};