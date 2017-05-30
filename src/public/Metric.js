class Metric {
  constructor(name, initValue) {
    this.name = name;

    const stored = parseFloat(
      Db.get(`metric-${name}`)
    );

    if (!isNaN(stored)) {
      this.value = stored;

    } else if (!isNaN(initValue)) {
      this.value = initValue;
    } else {

      throw new TypeError(`Invalid initial value.
        Must be a number.`);
    }
  }
  onMetricChange() {
    Db.save(`metric-${this.name}`, this.value);
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