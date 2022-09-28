import { Message } from 'whatsapp-web.js';

import goErrorHandler from '../utils/goErrHandler';
import printLog from '../utils/logger';
import { client } from './../index';

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
  const [media, err] = await goErrorHandler(() => message.downloadMedia());
  if (err instanceof Error || !media) {
    message.reply('Terjadi kesalahan pada saat mendownload gambar');
    return console.error('Error when downloading media |', err);
  }

  await client.sendMessage(message.from, media, {
    sendMediaAsSticker: true,
    stickerName: stickerName ?? 'tfkhdyt sticker',
    stickerAuthor: stickerAuthor ?? 'tfkhdyt',
  });

  printLog(phoneNumber, stickerName, stickerAuthor);
};

export default stickerHandler;
