import { Message } from 'whatsapp-web.js';

import helpHandler from '../handlers/help';
import stickerHandler from '../handlers/sticker';
import goErrorHandler from '../utils/goErrHandler';
import parseOptions from '../utils/parseOptions';
import { client } from './../index';

const messageListener = async (message: Message) => {
  // get contact info
  const [contact, err] = await goErrorHandler(() => message.getContact());
  if (err instanceof Error || !contact) {
    message.reply('Terjadi kesalahan pada saat mendapatkan info kontak');
    return console.error('Error when getting contact |', err);
  }

  // stop the listener if message is from a status or from a group
  if (message.isStatus || contact.isGroup) return;

  const command = message.body.split('--').map((cmd) => cmd.trim());
  const options = command.slice(1).join(' ').split('" ');
  const { stickerName, stickerAuthor } = parseOptions(options);

  // handle help
  if (command[0].toLowerCase().startsWith('!help')) {
    helpHandler(message.from);
  }

  // handle sticker
  if (command[0].toLowerCase() === '!sticker' && message.type === 'image') {
    await stickerHandler({
      message,
      phoneNumber: contact.id.user,
      stickerName,
      stickerAuthor,
    });

    if (!contact.name || !contact.name.endsWith('(DONATUR)'))
      client.sendMessage(
        message.from,
        'Merasa terbantu oleh bot ini? Anda bisa bantu saya dengan donasi melalui link berikut ini\n\nhttps://saweria.co/tfkhdyt\n\nSetelah Anda melakukan donasi, pesan ini akan hilang di request selanjutnya.'
      );
  }

  if (command[0].toLowerCase() === '!sticker') {
    message.reply('Gambarnya mana?');
  }
};

export default messageListener;
