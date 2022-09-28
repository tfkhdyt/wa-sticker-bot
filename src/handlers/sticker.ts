import { Message } from 'whatsapp-web.js';

import goErrorHandler from '../utils/goErrHandler';
import printLog from '../utils/logger';
import parseOptions from '../utils/parseOptions';
import { client } from './../index';

type StickerHandlerParams = {
  options: string[];
  command: string[];
  message: Message;
  phoneNumber: string;
};

const stickerHandler = async ({
  options,
  command,
  message,
  phoneNumber,
}: StickerHandlerParams) => {
  const { stickerName, stickerAuthor } = parseOptions(options);

  if (command[0] === '!sticker' && message.type === 'image') {
    const [media, err] = await goErrorHandler(() => message.downloadMedia());
    if (err instanceof Error || !media) {
      message.reply('Terjadi kesalahan pada saat mendownload gambar');
      return console.error('Error when downloading media |', err);
    }

    client.sendMessage(message.from, media, {
      sendMediaAsSticker: true,
      stickerName: stickerName ?? 'tfkhdyt sticker',
      stickerAuthor: stickerAuthor ?? 'tfkhdyt',
    });

    printLog(phoneNumber, stickerName, stickerAuthor);
  }
};

export default stickerHandler;
