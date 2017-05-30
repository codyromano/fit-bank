const stars = [
  {
    id: 'first-login',
    about: 'Login for the first time',
    locked: true,
    seenAfterUnlock: false
  },
  {
    id: 'first-deposit',
    about: 'Deposit calories',
    locked: true,
    seenAfterUnlock: false
  },
  {
    id: 'first-spend',
    about: 'Spend calories on a meal or snack',
    locked: true,
    seenAfterUnlock: false
  },
  {
    id: 'first-save',
    about: 'Save calories for later',
    locked: true,
    seenAfterUnlock: false
  }
];

const clone = obj => Object.assign({}, obj);

class StarTracker {
  constructor(stars = []) {
    this.storageKey = 'stars';
    this.stars = Db.get(this.storageKey) || stars;
    console.assert(Array.isArray(this.stars));

    Events.publish('starListChanged', this.getStars());
  }
  onStarListChange() {
    Db.save(this.storageKey, this.stars);
    Events.publish('starListChanged', this.getStars());
  }
  getStars() {
    return Object.assign([], this.stars.map(clone));
  }
  getStarById(id) {
    const match = this.stars.filter(star =>
      star.id === id);
    return match.length ? match[0] : null;
  }
  getStarsUnseenAfterUnlock() {
  }
  markSeen(starId) {
  }
  unlock(starId) {
    const star = this.getStarById(starId);
    if (star) {
      star.locked = false;
      Events.publish('starUnlocked', clone(star));
      this.onStarListChange();
      return true;
    } else {
      throw new Error(`There's no star with id ${starId}.`);
    }
  }
}

const starTracker = new StarTracker(stars);

Events.subscribe('firstDeposit', () => {
  starTracker.unlock('first-deposit');
});
