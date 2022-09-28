import { Message } from 'whatsapp-web.js';

import stickerHandler from '../handlers/sticker';
import goErrorHandler from '../utils/goErrHandler';

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

  // handle sticker
  stickerHandler({
    command,
    message,
    options,
    phoneNumber: contact.id.user,
  });
};

export default messageListener;
