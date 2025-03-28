import prisma from "../config/prismaClient.js";
import { redisPub, redisCache } from "../config/redisClient.js";
import { analyzeSentiment } from "../utils/sentimentAnalysis.js";
import { getUserIp } from "../utils/getUserIp.js";
import geoip from "geoip-lite";

export const submitFeedback = async (req, res) => {
  const { eventId, name, email, score, comment } = req.body;

  try {
    const sentimentScore = analyzeSentiment(comment);
    const userIp = getUserIp(req);
    const geo = geoip.lookup(userIp);
    const location = geo ? (geo.city ?? geo.country) : null;

    if (location) {
      const feedback = await prisma.feedback.create({
        data: { eventId, name, email, score, comment, sentimentScore, location: location },
      });
      redisPub.publish("feedback_channel", JSON.stringify(feedback));
      res.status(201).json(feedback);
    } else {
      const feedback = await prisma.feedback.create({
        data: { eventId, name, email, score, comment, sentimentScore },
      });
      redisPub.publish("feedback_channel", JSON.stringify(feedback));
      res.status(201).json(feedback);
    }
    res.status(201).json({});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getFeedback = async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized access. Token missing.");
  }
  const { eventId } = req.params;

  try {
    const cacheKey = `feedback:${eventId}`;
    const cachedData = await redisCache.get(cacheKey);

    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    const feedback = await prisma.feedback.findMany({
      where: { eventId },
      orderBy: { createdAt: "desc" },
    });

    await redisCache.setex(cacheKey, 60, JSON.stringify(feedback));

    res.json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
