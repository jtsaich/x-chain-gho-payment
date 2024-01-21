import formidable from "formidable";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
const pinataSDK = require("@pinata/sdk");
const PINATA_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0ZDFkMjVhOS00YmZhLTRjZmQtYWRkMy1kZTg4ODc3NWJjNGEiLCJlbWFpbCI6InMwMjI3MzczNjkxQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJmMDViYzYxMzk0YTExZDAwZmQxOCIsInNjb3BlZEtleVNlY3JldCI6Ijc3MzhiZTI4ZDZlZTliOWM5NTA0NDVkMjNjMzllYjAzZGJmMTBlODRiMDQ2NGJmMDkxNjcxYmY4NDNkZGRhYzgiLCJpYXQiOjE3MDUxNTAxNDR9.q8zBLYk-J6f5syVGOdtFGmKxGWYnJ2glKl5SwsS-yaI";
const pinata = new pinataSDK({ pinataJWTKey: PINATA_JWT });

export const config = {
  api: {
    bodyParser: false,
  },
};

const saveFile = async (file: formidable.File) => {
  try {
    const stream = fs.createReadStream(file.filepath);
    const options = {
      pinataMetadata: {
        name: file.originalFilename,
      },
    };
    const response = await pinata.pinFileToIPFS(stream, options);
    fs.unlinkSync(file.filepath);

    return response;
  } catch (error) {
    throw error;
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const form = formidable();
      form.parse(req, async function (err, fields, files) {
        if (err) {
          console.log({ err });
          return res.status(500).send("Upload Error");
        }

        if (!files.file) {
          return res.status(500).send("Upload Error");;
        }
        const response = await saveFile(files.file[0]);
        const { IpfsHash } = response;

        return res.send(IpfsHash);
      });
    } catch (e) {
      console.log(e);
      res.status(500).send("Server Error");
    }
  }
}
