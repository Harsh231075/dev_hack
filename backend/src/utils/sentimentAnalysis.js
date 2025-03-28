import Sentiment from "sentiment";

const sentiment = new Sentiment();

export const analyzeSentiment = (text) => {
  const result = sentiment.analyze(text);

  if (result.score > 0) return "Positive";
  if (result.score < 0) return "Negative";
  return "Neutral";
};
