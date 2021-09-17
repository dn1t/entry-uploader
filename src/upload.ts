const toBase64 = async (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const upload = async (file: File) => {
  const imageData = await toBase64(file);

  const formData = new FormData();
  const blob = await (await fetch(imageData)).blob();

  formData.append('file', blob);
  formData.append('type', 'notcompress');

  const data = await (
    await fetch('https://playentry.org/rest/picture', {
      method: 'POST',
      body: formData,
    })
  ).json();

  return data;
};
