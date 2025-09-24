export const getModelStatus = (req, res) => {
  const { modelLoaded, modelError } = req.app.locals;
  if (modelLoaded) return res.json({ status: "ready" });
  if (modelError)
    return res.status(500).json({ status: "error", error: modelError.message });
  return res.json({ status: "loading" });
};

export const getMotivation = async (req, res) => {
  const { modelLoaded, modelError, generator } = req.app.locals;
  const { note } = req.body;

  try {
    if (!modelLoaded)
      return res.status(503).json({ message: "Model loading..." });
    if (modelError)
      return res
        .status(500)
        .json({ message: "Model failed", error: modelError.message });
    if (!note) return res.status(400).json({ message: "Note required" });

    const result = await generator(
      `Note: ${note}. Write a short motivational response.`
    );

    // Take generated text and limit it to ~20 words
    const fullText = result[0]?.generated_text || "Stay motivated!";
    const limitedText = fullText.split(" ").slice(0, 20).join(" ");

    res.json({ motivation: limitedText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
