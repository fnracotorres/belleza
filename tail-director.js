import TailBuilder from "./tail-builder.js";

export default class TailDirector {
  #tailBuilder;

  get tailBuilder() {
    return this.#tailBuilder;
  }

  set tailBuilder(tailBuilder) {
    this.#tailBuilder = tailBuilder;
  }

  constructor() {
    this.#tailBuilder = new TailBuilder();
  }

  buildFreeTail() {
    this.#tailBuilder.rename();
    return this.#tailBuilder.getTail();
  }

  buildPaidTail() {
    this.#tailBuilder.abstract();
    this.#tailBuilder.bifurcate();
    this.#tailBuilder.disarrange();
    this.#tailBuilder.rename();
    return this.#tailBuilder.getTail();
  }
}
