const imageForm = document.getElementById("imageForm");
const loadingImage = document.getElementById("loadingImage");
const generatedImage = document.getElementById("generatedImage");

imageForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const prompt = document.getElementById("promptInput").value;
  loadingImage.style.display = "block";
  generatedImage.src = "";

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/prompthero/openjourney-v4", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: prompt })
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    generatedImage.src = imageUrl;
  } catch (err) {
    console.error("❌ Error generating image:", err);
    alert("Failed to generate image: " + err.message);
  } finally {
    loadingImage.style.display = "none";
  }
});


