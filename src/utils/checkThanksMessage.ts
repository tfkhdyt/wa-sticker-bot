const checkThanksMessage = (messageBody: string) => {
  const acceptedThanks = [
    'thanks',
    'thank you',
    'terima kasih',
    'makasih',
    'nuhun',
  ];
  let response: string | null = null;

  acceptedThanks.forEach((thank) => {
    if (messageBody.toLowerCase().includes(thank)) {
      if (thank === acceptedThanks[0] || thank === acceptedThanks[1]) {
        response = "You're welcome";
        return;
      } else if (thank === acceptedThanks[2] || thank === acceptedThanks[3]) {
        response = 'Sama-sama';
        return;
      } else {
        response = 'Sami-sami';
        return;
      }
    }
  });

  return response;
};

export default checkThanksMessage;
