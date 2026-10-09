const configuredWhatsAppNumber = '923122053670';

function validateWhatsAppNumber(value: string): string {
  const normalized = value.replace(/^\+/, '');
  if (!/^[1-9]\d{7,14}$/.test(normalized)) {
    throw new Error('The service WhatsApp number must be in international format.');
  }
  return normalized;
}

// This public number is used to build WhatsApp click-to-chat links.
export const siteConfig = {
  whatsappNumber: validateWhatsAppNumber(configuredWhatsAppNumber),
  emailAddress: 'info.dotndev@gmail.com',
};

export const buildWhatsAppUrl = (message: string) =>
  `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const buildEmailUrl = (subject: string, body: string) => {
  const params = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to: siteConfig.emailAddress,
    su: subject,
    body,
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
};

export const buildDirectEmailUrl = (subject: string, body: string) => {
  const params = new URLSearchParams({ subject, body });
  return `mailto:${siteConfig.emailAddress}?${params.toString()}`;
};
