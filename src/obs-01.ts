export function observable1(observer: any): void {
  for (let i = 0; i < 10; i++) {
    observer.next(i);
  }
  observer.complete();
}
