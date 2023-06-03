import { DeleteObjectsFromBucket, ListBucketKeys } from "./S3Client.js";

const dropTrends = async (places: { woeid: number; country: string }[]) => {
  const deleteOperations = places.map(async (place) => {
    const Bucket = `${place.woeid}`;
    try {
      const contents = await ListBucketKeys(Bucket);
      if (contents && contents.length >= 1) {
        for (const object of contents) {
          const currentDate = new Date().getTime();
          const prevDate = new Date(parseInt(object.Key as string)).getTime();
          if ((currentDate - prevDate) / 86400000 > 1)
            await DeleteObjectsFromBucket(Bucket, object.Key);
        }
      }
    } catch (error) {
      console.log(error);
    }
  });

  await Promise.all(deleteOperations);
};

export { dropTrends };
