import { Message } from 'whatsapp-web.js';

import goErrorHandler from '../utils/goErrHandler';
import printLog from '../utils/logger';

type StickerHandlerParams = {
  message: Message;
  phoneNumber: string;
  stickerName: string | null;
  stickerAuthor: string | null;
};

const stickerHandler = async ({
  message,
  phoneNumber,
  stickerName,
  stickerAuthor,
}: StickerHandlerParams) => {
  // prevent empty value
  if (stickerName) stickerName = stickerName === '' ? stickerName : './tfkhdyt';
  if (stickerAuthor)
    stickerAuthor =
      stickerAuthor === '' ? stickerAuthor : './tfkhdyt sticker bot';

  // download media
  const { data: media, error: downloadError } = await goErrorHandler(() =>
    message.downloadMedia()
  );
  if (!media) {
    message.reply('Terjadi kesalahan pada saat mendownload gambar');
    return console.error('Error when downloading media.', downloadError);
  }

  // send sticker
  const { error: replyError } = await goErrorHandler(() =>
    message.reply(media, message.from, {
      sendMediaAsSticker: true,
      stickerName: stickerName ?? './tfkhdyt',
      stickerAuthor: stickerAuthor ?? './tfkhdyt sticker bot',
    })
  );
  if (replyError instanceof Error) {
    message.reply('Terjadi kesalahan pada saat mengirim stiker');
    return console.error('Error when sending sticker.', replyError);
  }

  // print log
  printLog(phoneNumber, stickerName, stickerAuthor);
};

export default stickerHandler;
