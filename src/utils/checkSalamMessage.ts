import sanitizeBody from './sanitizeBody';

const checkSalamMessage = (messageBody: string) => {
  const sanitizedMessageBody = sanitizeBody(messageBody);
  const acceptedSalam = 'assalamualaikum';

  const isMatch = sanitizedMessageBody.startsWith(acceptedSalam);

  return isMatch;
};

export default checkSalamMessage;
