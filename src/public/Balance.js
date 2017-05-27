var Balance = {
  getEl() {
    return document.getElementById('calories')
  }, 
  maxDebt: -(Reward.getRewardAmount() * 2),
  add: function(amount) {
    var current = parseFloat(this.get()); 
    this.set(current + parseFloat(amount)); 
  },
  deduct: function(amount) {
    var current = parseFloat(this.get()),
        newBalance = Math.max(this.maxDebt, current - amount); 
    this.set(newBalance);
  },
  set: function(amount) {
    Db.save('balance', amount); 
    this.render();
  },
  get: function() {
    var amount = Db.get('balance') || 0; 
    return parseFloat(amount); 
  },
  getSavings() {
    const amount = Db.get('savings') || 0;
    return parseFloat(amount);
  },
  deductSavings(amount) {
    const saved = this.getSavings();
    if (amount <= saved && saved - amount >= 0) {
      Db.save('savings', saved - amount);
      return true;
    }
    return false;
  },
  addSavings(amount) {
    if (!isNaN(amount) && amount <= this.get()) {
      const savings = this.getSavings();
      Db.save('savings', savings + amount);
      return true;
    }
    return false;
  },
  addCommas: function(number) {
    return (number + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  },
  render: function() {
    const el = this.getEl();
    if (el) {
      el.innerText = this.addCommas(this.get());
    } 
  }
};