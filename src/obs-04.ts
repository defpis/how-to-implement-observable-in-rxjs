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

export function observable4(observer: any): any {
  const safeObserver = new SafeObserver(observer);
  let i = 0;
  const id = setInterval(() => {
    if (i < 10) {
      safeObserver.next(i++);
    } else {
      safeObserver.complete();
      safeObserver.next('Already completed');
      clearInterval(id);
    }
  }, 100);

  return (): void => {
    console.log('disposed');
    clearInterval(id);
  };
}
