import { Message } from 'whatsapp-web.js';

import helpHandler from '../handlers/help';
import stickerHandler from '../handlers/sticker';
import goErrorHandler from '../utils/goErrHandler';
import parseOptions from '../utils/parseOptions';

const messageListener = async (message: Message) => {
  // get contact info
  const { data: contact, error } = await goErrorHandler(() =>
    message.getContact()
  );
  if (!contact) {
    message.reply('Terjadi kesalahan pada saat mendapatkan info kontak');
    return console.error('Error when getting contact.', error);
  }

  // stop the listener if message is from a status or from a group
  if (message.isStatus || contact.isGroup) return;

  // parse command and options
  const [command, ...rest] = message.body.split(' ').map((cmd) => cmd.trim());
  const options = rest
    .join(' ')
    .replaceAll(' name', '|name')
    .replaceAll(' author', '|author')
    .split('|');
  const { stickerName, stickerAuthor } = parseOptions(options);

  // handle help
  if (command.toLowerCase().includes('!help')) {
    return helpHandler(message);
  }

  // handle sticker
  if (['!sticker', '!stiker'].includes(command) && message.type === 'image') {
    await stickerHandler({
      message,
      phoneNumber: contact.id.user,
      stickerName,
      stickerAuthor,
    });

    if (!contact.name || !contact.name.endsWith('(DONATUR)'))
      await message.reply(
        'Merasa terbantu oleh bot ini? Anda bisa bantu saya dengan donasi melalui link berikut ini\n\nhttps://saweria.co/tfkhdyt\n\nSetelah Anda melakukan donasi, pesan ini akan hilang di request selanjutnya.'
      );

    return;
  } else if (command.toLowerCase().includes('sticker')) {
    return message.reply('Gambarnya mana?');
  }

  message.reply('*Command salah*, coba cek kembali command yang Anda kirim');
};

export default messageListener;
