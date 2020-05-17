export default class Store {
  constructor(key, storage) {
    this._key = key;
    this._storage = storage;
  }

  getItems() {
    try {
      return JSON.parse(this._storage.getItem(this._key)) || {};
    } catch (error) {
      return {};
    }
  }

  setItems(items) {
    this._storage.setItem(
        this._key,
        JSON.stringify(items)
    );
  }

  setItem(key, value) {
    const store = this.getItems();

    this._storage.setItem(
        this._key,
        JSON.stringify(
            Object.assign(
                {},
                store,
                {[key]: value}
            )
        )
    );
  }

  getItem(key) {
    const store = this.getItems();

    return store[key];
  }
}
