const chance = odds => Math.random() >= odds;

const defaultProps = {
  symbol: 'AMZN',
  price: 950,
  lastUpdate: null,
  // Every 3 hours
  updateFreq: 1000 * 60 * 60 * 3,
  riskProfile: {
    // Probability => price percentage change
    // E.g. 25% chance of a 10% price drop
    '.25': -0.10,
    '.25': -0.5,
    '.25': 0.5,
    '.25': 0.25
  }
};

class Stock {
  constructor(props = defaultProps) {
    Object.assign(this, props);
  }
  timeSinceUpdate() {
    if (Number.isInteger(this.lastUpdate)) {
      return new Date().getTime() - this.lastUpdate;
    }
    return window.Infinity;
  }
  shouldUpdatePrice() {
    return this.timeSinceUpdate() >= this.updateFreq;
  }
  updatePrice() {
    for (const [odds, change] of Object.entries(this.riskProfile)) {
      if (chance( parseFloat(odds) )) {
        const newPrice = this.price * (1 + change);

        // The price can't drop below one
        this.price = Math.max(1, newPrice);
        this.lastUpdate = new Date().getTime();

        return this.price;
      }
    }
    return this.price;
  }
}