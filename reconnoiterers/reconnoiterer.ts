import { Reconnaissance } from "../reconnaissances/reconnaissance";

export interface Reconnoiterer {
  reconnoiter(): Reconnaissance;
}
