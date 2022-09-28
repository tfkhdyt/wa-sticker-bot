import { Message } from 'whatsapp-web.js';

import goErrorHandler from '@/utils/goErrHandler';
import printLog from '@/utils/logger';

import { client } from '../index';

const messageListener = async (message: Message) => {
  // stop the listener if message is from a status or from a group
  if (message.isStatus || message.author) return;

  // get contact info
  // const contact = await message.getContact();
  const [contact, err] = await goErrorHandler(() => message.getContact());
  if (err instanceof Error || !contact) {
    message.reply('Terjadi kesalahan pada saat mendapatkan info kontak');
    return console.error('Error when getting contact |', err);
  }

  // get command
  const command = message.body.split('--').map((cmd) => cmd.trim());
  const options = command.slice(1).join(' ').split('" ');

  let stickerName = null;
  let stickerAuthor = null;

  options.forEach((option) => {
    if (option.startsWith('name="')) {
      stickerName = option.split('=')[1].replaceAll('"', '');
    } else if (option.startsWith('author="')) {
      stickerAuthor = option.split('=')[1].replaceAll('"', '');
    }
  });

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
    printLog(contact.id.user, stickerName, stickerAuthor);
  }
};

export default messageListener;
