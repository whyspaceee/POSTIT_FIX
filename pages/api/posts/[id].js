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
    const { id } = req.query;
    const data = await prisma.notes.findFirst({
      where: {
        AND: [
          {
            id: id,
          },
          {
            userId: user.id,
          },
        ],
      },
    });

    if (!data) {
      return res.status(401).json({ error: "data not found " });
    }
    res.status(200).json({ posts: data });
    return;
  }

  if (req.method === "DELETE") {
    const { id } = req.query;
    if (!id) {
      res.status(400).json({
        error:
          "item id is empty, please specify a post id that is to be deleted",
      });
      return;
    }
    const data = await prisma.notes.delete({
      where: {
        id: id,
      },
    });
    if (!data) {
      return res.status(401).json({ error: "data not found " });
    }

    res.status(200).json({ deleted: data });
    return;
  }

  if (req.method === "PUT") {
    const { id } = req.query;
    const { title, content } = req.body;

    if (!id) {
      res.status(400).json({
        error:
          "item id is empty, please specify a post id that is to be deleted",
      });
      return;
    }

    if (!title || !content) {
      res.status(400).json({ error: "title or method is empty" });
      return;
    }

    const data = await prisma.notes.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        content: content,
      },
    });

    if (!data) {
      return res.status(401).json({ error: "data not found " });
    }
    res.status(200).json({ updated: data });
    return;
  }
}
