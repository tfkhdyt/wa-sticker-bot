import { Message } from 'whatsapp-web.js';

const helpHandler = (message: Message) => {
  message.reply(
    `*User guide*
Kirim gambar dengan deskripsi sebagai berikut:

*Buat stiker biasa*
\`\`\`!sticker\`\`\`

*Buat stiker dengan custom name*
\`\`\`!sticker name="Nama stiker"\`\`\`

*Buat stiker dengan custom author*
\`\`\`!sticker author="Nama author"\`\`\`

*Buat stiker dengan custom name dan author*
\`\`\`!sticker name="Nama stiker" author="Nama author"\`\`\`

*Tampilkan user guide*
\`\`\`!help\`\`\`


_Saat ini bot belum mendukung gambar png_`
  );
};

export default helpHandler;
