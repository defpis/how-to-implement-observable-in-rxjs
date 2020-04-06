class SafeObserver {
  destination: any;
  isUnsubscribed = false;
  _unsubscribe: any = null;

  constructor(destination: any) {
    this.destination = destination;
  }

  next(value: any): void {
    const destination = this.destination;
    if (destination.next && !this.isUnsubscribed) {
      destination.next(value);
    }
  }

  error(error: any): void {
    const destination = this.destination;
    if (!this.isUnsubscribed) {
      this.unsubscribe();
      if (destination.error) {
        destination.error(error);
      }
    }
  }

  complete(): void {
    const destination = this.destination;
    if (!this.isUnsubscribed) {
      this.unsubscribe();
      if (destination.complete) {
        destination.complete();
      }
    }
  }

  unsubscribe(): void {
    this.isUnsubscribed = true;
    if (this._unsubscribe) {
      this._unsubscribe();
    }
  }
}

class Observable {
  _subscribe: any;

  constructor(subscribe: any) {
    this._subscribe = subscribe;
  }

  subscribe(observer: any): any {
    const safeObserver = new SafeObserver(observer);
    safeObserver._unsubscribe = this._subscribe(safeObserver);
    return (): void => safeObserver._unsubscribe();
  }
}

const myObservable = new Observable((observer: any) => {
  let i = 0;
  const id = setInterval(() => {
    if (i < 10) {
      observer.next(i++);
    } else {
      observer.complete();
    }
  }, 100);
  return (): void => {
    console.log('unsubscribed');
    clearInterval(id);
  };
});

const observer = {
  next(value: any): void {
    console.log('next -> ' + value);
  },
  error(error: any): void {
    console.error(error);
  },
  complete(): void {
    console.log('complete');
  },
};

const subscription = myObservable.subscribe(observer);
