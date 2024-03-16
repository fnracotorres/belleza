import Tail from "./tail.js";
import TailBuilder from "./tail-builder.js";
import TailDirector from "./tail-director.js";

Tail.schematics();
const tails = Tail.reconnoitre("protected");
const tail = tails[0];

const tailBuilder = new TailBuilder();
tailBuilder.tail = tail;

const tailDirector = new TailDirector();
tailDirector.tailBuilder = tailBuilder;

tailDirector.buildPaidTail();
tailBuilder.tail.download();
