export default class ConnectionObserver {
  constructor() {
    this._offlineHandlers = [];
    this._onlineHandlers = [];

    window.addEventListener(`offline`, () => {
      this._callHandlers(this._offlineHandlers);
    });

    window.addEventListener(`online`, () => {
      this._callHandlers(this._onlineHandlers);
    });
  }

  isOnline() {
    return window.navigator.onLine;
  }

  addOfflineHandler(handler) {
    this._offlineHandlers.push(handler);
  }

  addOnlineHandler(handler) {
    this._onlineHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
