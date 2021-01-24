const bcrypt = require('bcryptjs');

const user = {
  password: bcrypt.hashSync('password'),
};

console.log(user);
