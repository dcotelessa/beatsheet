import { useContext, useEffect } from "react";
import { GetServerSideProps } from "next";
import useBeatSheet from "@/hooks/useBeatSheet";
import { BeatSheetContext, BeatSheetDispatchContext } from "@/context/";
import BeatSheet, { BeatSheetItem } from "@/components/beatsheet";
import clientPromise from "../lib/mongodb";

interface PageProps {
  data: BeatSheetItem[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collectionName = process.env.MONGODB_COLLECTION as string;
    const collection = db.collection<PageProps>(collectionName);
    const data = await collection.find({}).toArray();

    return {
      props: {
        data: JSON.parse(JSON.stringify(data)), // Serialize MongoDB data
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        data: [],
      },
    };
  }
};

const HomePage = ({ data }) => {
  const [beatSheet, beatsheetDispatch] = useBeatSheet();

  useEffect(() => {
    beatsheetDispatch({
      type: "LOAD_BEATSHEET",
      payload: { beatSheet: data[0] },
    });
  }, [data, beatsheetDispatch]);

  return (
    <BeatSheetContext.Provider value={beatSheet}>
      <BeatSheetDispatchContext.Provider value={beatsheetDispatch}>
        {beatSheet && <BeatSheet />}
      </BeatSheetDispatchContext.Provider>
    </BeatSheetContext.Provider>
  );
};

export default HomePage;
