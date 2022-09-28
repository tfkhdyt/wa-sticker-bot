import qrcode from 'qrcode-terminal';

const qrListener = (qr: string) => {
  qrcode.generate(qr, { small: true });
};

export default qrListener;
