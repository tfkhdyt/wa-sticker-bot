const checkPikMessage = (messageBody: string) => {
  const acceptedNonSalam = ['pik', 'fik', 'tupik', 'tufik'];
  const lowerCasedMessageBody = messageBody.toLowerCase();

  const isMatch =
    acceptedNonSalam.some((word) => lowerCasedMessageBody.startsWith(word)) &&
    lowerCasedMessageBody.length <= 5;

  return isMatch;
};

export default checkPikMessage;
