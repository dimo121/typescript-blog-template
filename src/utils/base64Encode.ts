export const base64Encode = (file:File):Promise<any> => new Promise((res,rej) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => res(reader.result);
    reader.onerror = error => rej(error);

});