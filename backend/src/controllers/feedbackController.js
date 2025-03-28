import prisma from "../config/prismaClient.js";
import redis from "../config/redisClient.js";
import { analyzeSentiment } from "../utils/sentimentAnalysis.js";

export const submitFeedback = async (req, res) => {
  const { eventId, name, email, score, comment } = req.body;

  try {
    const sentimentScore = analyzeSentiment(comment);

    console.log(sentimentScore);

    const feedback = await prisma.feedback.create({
      data: { eventId, name, email, score, comment, sentimentScore },
    });

    // Publish feedback update
    redis.publish("feedback_channel", JSON.stringify(feedback));

    res.status(201).json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getFeedback = async (req, res) => {
  const { eventId } = req.params;

  try {
    const cacheKey = `feedback:${eventId}`;
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    const feedback = await prisma.feedback.findMany({
      where: { eventId },
      orderBy: { createdAt: "desc" },
    });

    await redis.setex(cacheKey, 60, JSON.stringify(feedback));

    res.json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
