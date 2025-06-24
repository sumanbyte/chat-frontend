import moment from "moment";

const fileFormat = (url) => {
  const fileExtension = url.split(".").pop();
  if (
    fileExtension === "mp4" ||
    fileExtension === "mov" ||
    fileExtension === "avi" ||
    fileExtension === "mkv" ||
    fileExtension === "webm" ||
    fileExtension === "flv" ||
    fileExtension === "wmv"
  ) {
    return "video";
  } else if (
    fileExtension === "mp3" ||
    fileExtension === "wav" ||
    fileExtension === "ogg" ||
    fileExtension === "flac"
  ) {
    return "audio";
  } else if (
    fileExtension === "pdf" ||
    fileExtension === "doc" ||
    fileExtension === "docx" ||
    fileExtension === "xls" ||
    fileExtension === "xlsx" ||
    fileExtension === "ppt" ||
    fileExtension === "pptx"
  ) {
    return "document";
  } else if (
    fileExtension === "jpg" ||
    fileExtension === "jpeg" ||
    fileExtension === "png" ||
    fileExtension === "gif" ||
    fileExtension === "bmp"
  ) {
    return "image";
  } else {
    return "file";
  }
};

const transformImage = (url = "", width = 100) => {
  const newUrl = url.replace("upload/", `upload/dpr_auto/w_${width}/`);
  return newUrl;
};

export { fileFormat, transformImage };

export const getLastSevenDays = () => {
  const currentDate = moment();
  const last7Days = [];

  for (let i = 0; i < 7; i++) {
    const dayDate = currentDate.clone().subtract(i, "days");
    const dayName = dayDate.format("dddd");
    last7Days.unshift(dayName);
  }

  return last7Days;
};

export const getAllSavedStorage = ({ key, value, get }) => {
  if (get)
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : null;
  else localStorage.setItem(key, JSON.stringify(value));
};
