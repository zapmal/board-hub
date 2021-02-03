// here i'd receive (req, res) and respond to it only validating the fields
// and then passing that data to the service

const signin = (username, password) => {
  return Promise.resolve(username);
};

export {
  signin,
};