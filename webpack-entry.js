var BankAccount = require('./src/BankAccount');

var checking = new BankAccount({
  balance: 0,
  minBalance: -1500
});

console.debug(checking);