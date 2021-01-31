import md5 from 'md5';

const gravatar = (email) => {
  const hash = md5(email);
  return `https://www.gravatar.com/avatar/${hash}.jpg?d=identicon`;
};

module.exports = gravatar;