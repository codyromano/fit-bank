/* globals Db */

class ChangeLog {
  constructor(entityId, storage = Db) {
    this.storage = storage;
    this.id = entityId;
  }
  getStorageKey() {
    return `${this.entityId}-change-log`;
  }
  getEntries() {
    const changeLog = this.storage.get(this.getStorageKey());
    return Array.isArray(changeLog) ? changeLog : [];
  }
  addEntry(value, ts = null) {
    ts = Number.isInteger(ts) ? ts : new Date().getTime();
    
    const changeLog = this.getEntries().concat({value, ts});
    return this.storage.save(this.getStorageKey(), changeLog);
  }
  /**
  * @desc Get the most recent entry that matches a predicate
  */
  latestMatch(predicate) {
    const match = this.getEntries().filter(predicate).slice(-1);
    return match.length ? match[0] : null;
  }
}

let mockStorage = {
  items: {},
  save(key, value) {
    this.items[key] = value;
  },
  get(key) {
    return this.items[key];
  }
};

// TODO: Move to test
const testLog = new ChangeLog('testChangeEntity', mockStorage);
testLog.addEntry(1, 1000);

console.assert(testLog.getEntries()[0].value === 1,
  'getEntries() returns the new entry');

testLog.addEntry(42, 2000);
testLog.addEntry(50, 3000);
testLog.addEntry(75, 4000);

const latest = testLog.latestMatch(item => item.value === 42);
console.assert(latest.ts === 2000,
  'latestMatch() finds item with correct value');
