export const getNameFromEmail = email => email.substring(0, email.lastIndexOf('@'));

export const getDomainFromEmail = email => email.substring(email.lastIndexOf('@') + 1);

export const toUrlFriendly = str => encodeURI(str.replace(/ /g, '-'));
