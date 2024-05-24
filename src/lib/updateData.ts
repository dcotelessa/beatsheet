import clientPromise from "./mongodb";

type BeatInput = {
  id: number;
  timestamp: number;
  description: string;
  duration: number;
  cameraAngle: string;
};

type ActInput = {
  id: number;
  timestamp: number;
  description: string;
  beats: BeatInput[];
};

type updateDataInput = {
  id: string;
  title: number;
  acts: ActInput[];
};

export async function updateData(
  collectionName: string,
  _id: string,
  body: updateDataInput,
) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection(collectionName);
    const data = await collection.findOne({ id });
    if (data) {
      console.log(data);
      data.title = body.title;
      data.acts = body.acts;
      // data.save();
    }
    //client.close();
  } catch (e) {
    console.error(e);
    return { error: "Internal Server Error" };
  }
}
