import { storage } from "../../firebase.config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useCallback, useState } from "react";

export const useUploadFile = () => {
  const uploadAsync = useCallback(
    async (file: object, key: "image" | "sound" | "order"): string[] => {
      try {
        const fileRef = ref(storage, `${key}/`);
        console.log("file: ", file);
        //   uploadBytes(fileRef, file).then((snapshot) => {
        //     toaster(`Avatar with ${avatarId} is uploaded to firebase`);
        //     getDownloadURL(snapshot.ref).then((url) =>
        //       setAvatarUrlIsUpdated(url)
        //     );
        //   });
        return [""];
      } catch (error) {
        console.log(error);
      }
    }
  );
  const multiUploadAsync = async (
    files: [],
    key: "image" | "sound" | "order"
  ): string[] => {
    try {
      if (files.length > 0) {
        const urlResponse = files.map(
          (file) =>
            new Promise((resolve) => {
              const fileRef = ref(storage, `${key}/${file.name}`);

              uploadBytes(fileRef, file).then((snapshot) =>
                getDownloadURL(snapshot.ref).then((url) => resolve(url))
              );
            })
        );

        return Promise.all(urlResponse);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { uploadAsync, multiUploadAsync } as const;
};
