// 2nees.com => هذا مثال توضيحي، لكن هناك العديد من الإعدادات المهمة والآمنية التي يجب أن تراعيها !
class EventBus {
  constructor() {
    this.events = {};
  }

  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
  }

  emit(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(listener => listener(data));
    }
  }

  off(eventName, listenerToRemove) {
    if (!this.events[eventName]) {
      return;
    }
    this.events[eventName] = this.events[eventName].filter(listener => listener !== listenerToRemove);
  }
}

const eventBus = new EventBus();

export default eventBus;