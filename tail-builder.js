import Tail from "./tail.js";

export default class TailBuilder {
  #tail;

  get tail() {
    return this.#tail;
  }

  set tail(tail) {
    this.#tail = tail;
  }

  constructor() {
    this.#tail = new Tail();
  }

  abstract() {
    this.#tail.abstract;
  }

  bifurcate() {
    this.#tail.bifurcate;
  }

  disarrange() {
    this.#tail.disarrange;
  }

  rename() {
    this.#tail.rename;
  }
}
