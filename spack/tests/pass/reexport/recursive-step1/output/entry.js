const c = 'c';
console.log('c');
console.log('b');
const c1 = c;
const b2 = c1;
const __default = b2;
const b1 = __default;
console.log('a.js');
export { b1 as b };
console.log('entry');
