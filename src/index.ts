import { observable1 } from './obs-01';
import { observable2 } from './obs-02';
import { observable3 } from './obs-03';
import { observable4 } from './obs-04';
import { observable5 } from './obs-05';

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

// 极简
// observable1(observer);

// 异步
// observable2(observer);

// 取消订阅
// const unsubscribe = observable3(observer);
// setTimeout(() => {
//   unsubscribe();
// }, 500);

// 实现SafeObserver
// observable4(observer);

// 完整实现
const subscription = observable5.subscribe(observer);
setTimeout(() => {
  subscription.unsubscribe();
}, 500);
