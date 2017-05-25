var Reward = {
  defaultAmount: 1000,
  getRewardAmount: function() {
    var amount = parseFloat(Db.get('rewardAmount')); 
    return (isNaN(amount)) ? this.defaultAmount : amount;
  },
  setRewardAmount: function(amount) {
    Db.save('rewardAmount', amount); 
  },
  dateLastClaimed: Db.get('dateLastClaimed') || null,
  getCurrentDate: function() {
    var date = new Date();
    return [date.getMonth(), date.getDay(), date.getFullYear()].join('/');
  },
  isEligible: function() {
    return (this.getCurrentDate() !== this.dateLastClaimed);
  },
  claim: function(balance) {
    this.dateLastClaimed = this.getCurrentDate(); 
    Db.save('dateLastClaimed', this.dateLastClaimed);
    balance.add(this.getRewardAmount()); 
  }
};