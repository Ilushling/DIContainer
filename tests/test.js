import { DIContainer } from '../src/DIContainer.js';

class A {
  b;
  c;

  constructor({ b, c }) {
    this.b = b;
    this.c = c;
  }

  test(value) {
    const resultB = this.b.test();
    const resultC = this.c.test(resultB);

    return value + resultC;
  }
}

class B {
  d;
  e;

  constructor({ d, e }) {
    this.d = d;
    this.e = e;
  }

  test() {
    const resultD = this.d.test();
    const resultE = this.e.test(resultD);

    return resultE;
  }
}

class C {
  /**
   * @param {number} value
   * @returns {number}
   */
  test(value) {
    return value + 1;
  }
}

class D {
  test() {
    return 10;
  }
}

class E {
  /**
   * @param {number} value
   * @returns {number}
   */
  test(value) {
    return value + 30;
  }
}

const dependencies = {
  A(container) {
    const b = container.get('B');
    const c = container.get('C');

    const a = new A({ b, c });

    return a;
  },
  B(container) {
    const d = container.get('D');
    const e = container.get('E');

    const b = new B({ d, e });

    return b;
  },
  C() {
    const c = new C();

    return c;
  },
  D() {
    const d = new D();

    return d;
  },
  E() {
    const e = new E();

    return e;
  }
};
const dIContainer = new DIContainer(dependencies);

const a = dIContainer.get('A');
const result = a.test(1);

const OK = 'OK';
const FAIL = 'FAIL';

const successCondition = result === 42;
console.log(result, successCondition ? OK : FAIL);