var Balance = {
  getEl() {
    return document.getElementById('calories')
  }, 
  maxDebt: -(Reward.getRewardAmount() * 2),
  add: function(amount) {
    var current = parseFloat(this.get()); 
    this.set(current + amount); 
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
    return amount; 
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