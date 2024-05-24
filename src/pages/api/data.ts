// pages/api/data.ts
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

type Data = {
  data: any[];
};

type ErrorResponse = {
  error: string;
};

export default async function fetchData(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorResponse>,
) {
  try {
    if (!process.env.MONGODB_COLLECTION) {
      throw new Error("Add your Mongo Collection to .env.local");
    }

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection(process.env.MONGODB_COLLECTION);
    const data = await collection.find({}).toArray();

    if (data.length === 0) {
      res.status(404).json({ error: "No data found" });
      return;
    }

    res.status(200).json({ data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
