import axios from "axios";

const pinata = axios.create({
  baseURL: "https://api.pinata.cloud",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_TOKEN}`,
    pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
    pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY,
  },
});

pinata.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

pinata.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const uploadMultiFile = async (
  files: any,
  name: string,
  symbol: string,
  description: string,
) => {
  const dataFile: any = new FormData();
  const dataJson: any = new FormData();
  const urlFile = `/pinning/pinFileToIPFS`;
  const time = new Date().getTime();

  let i = 1;
  for (const file of files) {
    dataFile.append("file", file, `/${symbol}_images_${time}/${i}.png`);
    i++;
  }

  const res = await pinata.post(urlFile, dataFile, {
    headers: {
      "Content-Type": `multipart/form-data; boundary=${dataFile._boundary}`,
    },
  });

  const uriData = res.data.IpfsHash;

  for (let i = 1; i <= files.length; i++) {
    var data = JSON.stringify({
      name,
      description,
      image: `${uriData}/${i + 1}.png`,
    });

    const blob = new Blob([data], {
      type: "application/json",
    });

    dataJson.append("file", blob, `/${symbol}_metadata_${time}/${i}.json`);
  }

  const resMeta = await pinata.post(urlFile, dataJson, {
    headers: {
      "Content-Type": `multipart/form-data; boundary=${dataJson._boundary}`,
    },
  });

  return { metadataHash: `${process.env.NEXT_PUBLIC_GATEWAY_URL}/${resMeta.data.IpfsHash}/` };
};

export const uploadSingleFile = async (file: any, symbol: string) => {
  const dataFile: any = new FormData();
  const urlFile = `/pinning/pinFileToIPFS`;
  const time = new Date().getTime();

  dataFile.append("file", file, `/images_${time}/${symbol}.png`);

  const res = await pinata.post(urlFile, dataFile, {
    headers: {
      "Content-Type": `multipart/form-data; boundary=${dataFile._boundary}`,
    },
  });

  const uriData = res.data.IpfsHash;

  return { imageHash: `${process.env.NEXT_PUBLIC_GATEWAY_URL}/${uriData}/${symbol}.png` };
};

export default pinata;

export const getOneUrl = (uri: string) => {
  if (!uri.includes("/ipfs/")) {
    return process.env.NEXT_PUBLIC_GATEWAY_URL + uri + "/1.json";
  }
  return uri;
};

export const getUrl = (uri: string) => {
  const gateway = process.env.NEXT_PUBLIC_GATEWAY_URL;
  if (!uri) {
    return undefined;
  }
  uri = uri.replace("ipfs://", `${gateway}/`);
  if (uri.includes("/ipfs/")) {
    const split = uri.split("/ipfs/");
    return `${gateway}/${split[1]}`;
  } else {
    return `${gateway}/${uri}`;
  }
};
