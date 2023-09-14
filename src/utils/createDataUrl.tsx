export default function createDataUrl(file: File | Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = () => {
        resolve(reader.result); // The result will be a data URL
      };
      
      reader.onerror = (error) => {
        reject(error);
      };
      
      reader.readAsDataURL(file); // Read the file as a data URL
    });
  }