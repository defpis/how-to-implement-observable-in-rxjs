export function observable3(observer: any): any {
  let i = 0;
  const id = setInterval(() => {
    if (i < 10) {
      observer.next(i++);
    } else {
      observer.complete();
      clearInterval(id);
    }
  }, 100);

  return (): void => {
    console.log('disposed');
    clearInterval(id);
  };
}
