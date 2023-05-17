const { readFileSync } = require('fs');

// const users = JSON.parse(readFileSync(`${__dirname}/../dev-data/data/users.json`));

let loadUser = () => JSON.parse(readFileSync('bogo_user.json'));

module.exports = { loadUser };
