const {SHA256} = require('crypto-js');

var hash=SHA256('Abbas Nazar').toString();
console.log(hash);