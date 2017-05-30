class Metric {
  constructor(name, initValue) {
    this.name = name;
    this.value = Db.get(`metric-${name}`);

    if (this.value === null && !isNaN(initValue)) {
      this.value = initValue;
    } else {
      throw new TypeError(`Invalid initial value.
        Must be a number.`);
    }
  }
  onMetricChange() {
    Db.save(`metric-${name}`, this.value);
  }
  get() {
    return this.value;
  }
  set(amount) {
    if (!isNaN(amount)) {
      this.value = amount;
      this.onMetricChange();
      return true;
    }
    return false;
  }
  add(amount) {
    if (!isNaN(amount)) {
      this.value+= amount;
      this.onMetricChange();
      return true;
    }
    return false;
  }
}