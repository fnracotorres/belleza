import { Reconnoiterer } from "./reconnoiterer";
import { TailwindReconnaissance } from "../reconnaissances/tailwind-reconnaissance";

export class TailwindReconnoiterer implements Reconnoiterer {
  reconnoiter() {
    return new TailwindReconnaissance();
  }
}
