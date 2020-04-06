export function observable2(observer: any): void {
  let i = 0;
  const id = setInterval(() => {
    if (i < 10) {
      observer.next(i++);
    } else {
      observer.complete();
      clearInterval(id);
    }
  }, 100);
}
