import prisma from "../prismaClient.js";

export const createEvent = async (req, res) => {
  try {
    const { name, date, organizerId } = req.body;

    const event = await prisma.event.create({
      data: { name, date, organizerId },
    });

    res.status(201).json({ message: "Event created", event });
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: "asc" },
    });

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
};
