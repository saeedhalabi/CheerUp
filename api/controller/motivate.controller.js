import { sendError } from "../utils/responses.js";
import { InferenceClient } from "@huggingface/inference";

export const getModelStatus = async (req, res) => {
  try {
    return res.json({ status: "ready" });
  } catch (err) {
    return sendError(res, 500, "Error checking model status", err);
  }
};

export const getMotivation = async (req, res) => {
  const { note } = req.body;

  if (!note) {
    return sendError(res, 400, "Note required");
  }

  const HF_TOKEN = req.app.locals.HF_TOKEN;
  const client = new InferenceClient(HF_TOKEN);

  try {
    const response = await client.chatCompletion({
      model: "deepseek-ai/DeepSeek-V3-0324",
      messages: [
        {
          role: "user",
          content: `Note: ${note}. Write a short motivational response in few words`,
        },
      ],
    });

    let motivation = response.choices[0]?.message?.content || "Stay motivated!";

    // Remove unwanted special characters
    motivation = motivation.replace(/[*"_~`()]/g, "").trim();

    return res.json({ motivation });
  } catch (err) {
    console.error(err);
    return sendError(res, 500, "Failed to get motivation", err);
  }
};
