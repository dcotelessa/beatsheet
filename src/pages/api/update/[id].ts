// pages/api/update/[id].ts
import { ObjectId } from 'mongodb';
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
      let data = await collection.findOneAndUpdate(
        { id },
        { $set: req.body },
        {
          returnDocument: 'after',
        },
      );
      if (!data) {
        data = { _id: new ObjectId() };
      }
      res.status(200).json(data as any);

      return;
    }
    res.status(400).json({ error: "Nothing Found" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.toString() });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
}
