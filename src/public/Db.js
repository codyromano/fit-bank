const Constants = {
  savedObject: 1,
  savedString: 2,
  saveFailed: 3
};

var Db = {
  objFlag: 'isObject',
  save(key, value) {
    const {
      savedObject,
      savedString,
      saveFailed
    } = Constants;

    if (typeof value === 'object' && value !== null) {
      localStorage.setItem(`${key}_${this.objFlag}`,
        JSON.stringify(value));
      return savedObject;
    } else {
      localStorage.setItem(`${key}`, value);
      return savedString;
    }
    return saveFailed;
  },
  get(key) {
    const objectValue = localStorage.getItem(
      `${key}_${this.objFlag}`
    );
    if (objectValue) {
      return JSON.parse(objectValue);
    }
    const stringValue = localStorage.getItem(
      `${key}`
    );
    return stringValue;
  }
};