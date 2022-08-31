import { prisma } from "../../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "unauthorized " });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (req.method === "GET") {
    const data = await prisma.notes.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    res.status(200).json({ posts: data });
    return;
  }
  if (req.method === "POST") {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(500).json({ error: "validation error" });
    }

    const data = await prisma.notes.create({
      data: {
        userId: user.id,
        title: title,
        content: content,
      },
    });

    res.status(200).json({ posts: data });
    return;
  }
}
