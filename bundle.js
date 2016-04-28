/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports) {

	const TRANSACT_DEPOSIT = 1;
	const TRANSACT_WITHDRAW = 2;

	export default class BankAccount {
	  constructor(options = {}) {
	    this.transactions = [];
	    this.balance = 0;
	    this.minBalance = options.minBalance || 0;
	  }
	  addTransaction(type, about, amount) {
	    this.transactions.push({
	      type: type,
	      about: about, 
	      amount: amount,
	      time: new Date().getTime()
	    });
	  }
	  /**
	   * @returns {Boolean} If at least some money was withdrawn
	  */
	  withdraw(amount, about = 'Unspecified') {
	    // If no money is left, do nothing and don't record a transaction
	    if (amount <= 0 || this.balance === this.minBalance) {
	      return false;
	    }
	    // Issue the requested funds if they're available
	    if (this.balance - amount >= this.minBalance) {
	      this.balance-= amount;
	      this.addTransaction(TRANSACT_WITHDRAW, about, amount);
	      return true;
	    }
	    /* If there's some money but not the amount requested, issue
	    only the funds that are available. */
	    let lesserAmount = this.balance - this.minBalance;
	    this.balance = this.minBalance;
	    this.addTransaction(TRANSACT_WITHDRAW, about, lesserAmount);
	    return true;
	  }
	  /**
	   * @returns {Boolean} If funds were added
	  */
	  deposit(amount = 0, about = 'Deposit') {
	    if (amount <= 0) {
	      return false;
	    }
	    this.balance+= amount;
	    this.addTransaction(TRANSACT_DEPOSIT, about, amount);
	    return true;
	  }
	}


/***/ }
/******/ ]);