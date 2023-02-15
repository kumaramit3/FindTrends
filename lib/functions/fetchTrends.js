const { S3 } = require("../client");

const fetchTrends = async (id) => {
  try {
    const objectLists = await S3.listObjects({ Bucket: id }).promise();
    objectLists.Contents.sort(
      (a, b) =>
        new Date(b.LastModified).getTime() - new Date(a.LastModified).getTime()
    );
    const objectPromise = objectLists.Contents.map(async (object) => {
      const res = await S3.getObject({
        Bucket: id,
        Key: object.Key,
      }).promise();
      return JSON.parse(res.Body.toString());
    });
    const objectResponse = await Promise.all(objectPromise);
    return objectResponse;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { fetchTrends };
