import { TailwindReconnoiterer as TailwindUIReconnoiterer } from "./reconnoiterers/tailwind-reconnoiterer";

// const reconnoiterers = {
//   TailwindReconnoiterer,
// };

// const reconnoiterer = new reconnoiterers.TailwindReconnoiterer();
// const reconnaissance = reconnoiterer.reconnoiter();
// reconnaissance.download();

class Tail {
  static user = { notion: { username: "a", password: "s" } };
  static reconnoiterers = {
    TailwindUIReconnoiterer,
  };
  static import(reconnaissance: any): any {}
  static export({
    tails,
    kind,
  }: {
    tails: Tail[];
    kind: TailExportKind;
  }): any {}
  static desobfuscate(tails: Tail[]): any {}
}

enum TailImportKind {
  Reconnaissance,
}

enum TailExportKind {
  Notion,
}

// ***** Usage example...
Tail.user.notion.username = "username";
Tail.user.notion.password = "password";

const reconnoiterer = new Tail.reconnoiterers.TailwindUIReconnoiterer();
const reconnaissance = reconnoiterer.reconnoiter();
reconnaissance.download();

Tail.export({
  kind: TailExportKind.Notion,
  tails: Tail.desobfuscate(
    Tail.import({
      kind: TailImportKind.Reconnaissance,
      like: reconnaissance,
    })
  ),
});
//
