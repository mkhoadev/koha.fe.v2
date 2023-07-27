export const getBase64 = (file: any) => {
  if (!file) return;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString());
    reader.onerror = (error) => reject(error);
  });
};

export const getEllipsisTxt = (text: string, n = 5) => {
  if (!text) return "";
  return `${text.slice(0, n)}...${text.slice(text.length - n, text.length)}`;
};
