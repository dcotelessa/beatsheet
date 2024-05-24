// pages/api/update/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

type Data = {
  data: any[];
};

type ErrorResponse = {
  error: string;
};

export default async function updateData(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorResponse>,
) {
  const { method } = req;
  const { id } = req.query;

  try {
    if (!process.env.MONGODB_COLLECTION) {
      throw new Error("Add your Mongo Collection to .env.local");
    }

    if (!id) {
      res.status(404).json({ error: "No Id" });
      return;
    }

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection(process.env.MONGODB_COLLECTION);
    if (method === "PUT") {
      const data = await collection.findOneAndUpdate(
        { _id: id },
        { $set: req.body },
        {
          returnOriginal: false,
        },
      );
      res.status(200).json({ data });

      return;
    }
    res.status(400).json({ error: "Nothing Found" });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

