import { useState } from "react";

const API_URL = "http://127.0.0.1:8000/api/dog-from-photo";

export const useBreedIdentification = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const identifyBreed = async (file: File, preview: string) => {
    setIsAnalyzing(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || `AI server error: ${response.status}`);
      }

      const data = await response.json();
      setResult({
        breed: data.breed,
        advice: data.advice,
        raw_predictions: data.raw_predictions,
      });

    } catch (error: any) {
      console.error("Breed identification failed:", error.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    isAnalyzing,
    result,
    identifyBreed,
  };
};