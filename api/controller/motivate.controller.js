import { sendError } from "../utils/responses.js";

export const getModelStatus = (req, res) => {
  const { modelLoaded, modelError } = req.app.locals;

  if (modelLoaded) {
    return res.json({ status: "ready" });
  }

  if (modelError) {
    return sendError(res, 500, "error", modelError);
  }

  return res.json({ status: "loading" });
};

export const getMotivation = async (req, res) => {
  const { modelLoaded, modelError, generator } = req.app.locals;
  const { note } = req.body;

  try {
    if (!modelLoaded) {
      return sendError(res, 503, "Model loading...");
    }

    if (modelError) {
      return sendError(res, 500, "Model failed", modelError);
    }

    if (!note) {
      return sendError(res, 400, "Note required");
    }

    const result = await generator(
      `Note: ${note}. Write a short motivational response.`
    );

    // Take generated text and limit it to ~20 words
    const fullText = result[0]?.generated_text || "Stay motivated!";
    const limitedText = fullText.split(" ").slice(0, 20).join(" ");

    return res.json({ motivation: limitedText });
  } catch (err) {
    console.error(err);
    return sendError(res, 500, "Server error", err);
  }
};
