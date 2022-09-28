const printLog = (
  phoneNumber: string,
  stickerName: string | null,
  stickerAuthor: string | null
) => {
  // get current timestamp
  const timeStamp = new Date().toLocaleString('id-ID', {
    timeZone: 'Asia/Jakarta',
  });

  // print log
  console.log(
    `[${timeStamp}] ${phoneNumber} just creating a new sticker. (Name: ${
      stickerName ?? 'Default'
    }, Author: ${stickerAuthor ?? 'Default'})`
  );
};

export default printLog;
