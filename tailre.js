class Tailre {
  commit() {
    const commit = {
      id: Math.floor(Math.random() * 1000001),
      tailre: this,
      method: this.method,
      stats: this.stats,
    };

    this.log.commits.push(commit);
    this.head = { commit };
  }

  constructor({ rules, virtual, element }) {
    this.name = "Nombre";
    this.virtual = virtual;
    this.rules = rules;
    this.element = element;
    this.method = "build";
    this.log = { commits: [] };
    this.head = null;
    this.stats = null;
  }

  toString() {
    return `
            ~~~~~~~~~~~~~~~~~~~~~~
            ${this.rules.map(([selector]) => selector)}
            ${this.rules.map(([, declaration]) => declaration)}
            ~~~~~~~~~~~~~~~~~~~~~~`;
  }

  render() {
    const virtual = structuredClone(this.virtual).map((element) => ({
      ...element,
      classList: element.classList
        .toString()
        .split(" ")
        .map((className) =>
          this.rules.find(([selector], index, rules) =>
            selector === this.log[this.log.length - 1].rules[index][0]
              ? selector
              : className
          )
        ),
    }));
    const app = document.createElement("app");
    app.append(virtual);
    document.append(app);
  }

  static compressCSSText(object) {
    return { object, cssText: object.cssText.replace(/\s/g, "") };
  }

  static appendSemicolon(string) {
    return string + ";";
  }

  static transformToRules({ cssText }) {
    const matches = cssText.match(/([^{]+)({[^}]+})/);
    let selector = null;
    let declaration = null;

    if (matches) {
      selector = matches[1].split(",");
      declaration = matches[2]
        .replace("{", "")
        .replace(";}", "")
        .split(";")
        .map(this.appendSemicolon);
    }

    return [selector, declaration];
  }

  static buildFromStyleSheet(styleSheet) {
    const rules = [...styleSheet.cssRules]
      .map(this.compressCSSText.bind(this))
      .map(this.transformToRules.bind(this));

    const virtual = Array.from(document.querySelectorAll("*"));
    const element = document;

    const tailre = new Tailre({ rules, virtual, element });

    return tailre;
  }

  static getAllStyleSheets() {
    return [...document.styleSheets];
  }

  static buildFromStyleSheets(styleSheets) {
    return styleSheets.map(this.buildFromStyleSheet.bind(this));
  }

  static build() {
    return this.buildFromStyleSheets(this.getAllStyleSheets());
  }

  moveTail() {
    const tailre = this.log.commits[0];

    for (const property in tailre) {
      if (Object.hasOwnProperty.call(tailre, property)) {
        this[property] = tailre[property];
      }
    }
  }

  moveHead() {
    const tailre = this.log.commits[this.log.commits.length - 1].tailre;

    for (const property in tailre) {
      if (Object.hasOwnProperty.call(tailre, property)) {
        this[property] = tailre[property];
      }
    }
  }

  moveBackward() {
    if (this.log.commits.length === 0) return;

    const tailre =
      this.log.commits[
        this.head.commit.id === this.log.commits[this.log.commits.length - 1].id
          ? this.log.commits.length - 1
          : this.log.commits.findIndex(
              (commit) => commit.id === this.head.commit.id
            ) - 1
      ].tailre;

    for (const property in tailre) {
      if (Object.hasOwnProperty.call(tailre, property)) {
        this[property] = tailre[property];
      }
    }
  }

  moveForward() {
    if (
      this.head.commit.id === this.log.commits[this.log.commits.length - 1].id
    )
      return;

    const tailre =
      this.log.commits[
        his.log.commits.length === 0
          ? 0
          : this.log.commits.findIndex(
              (commit) => commit.id === this.head.commit.id
            ) - 1
      ].tailre;

    for (const property in tailre) {
      if (Object.hasOwnProperty.call(tailre, property)) {
        this[property] = tailre[property];
      }
    }
  }

  undo() {
    if (this.log.commits.length === 0) return;

    this[
      this.log.commits[
        this.head.commit.id === this.log.commits[this.log.commits.length - 1].id
          ? this.log.commits.length - 1
          : this.log.commits.findIndex(
              (commit) => commit.id === this.head.commit.id
            ) - 1
      ].method
    ]();
  }

  redo() {
    if (
      this.head.commit.id === this.log.commits[this.log.commits.length - 1].id
    )
      return;

    this[
      this.log.commits[
        his.log.commits.length === 0
          ? 0
          : this.log.commits.findIndex(
              (commit) => commit.id === this.head.commit.id
            ) - 1
      ].method
    ]();
  }

  static meta = {
    reconnaissance: {},
    tailwind: {
      cdn: "https://cdn.jsdelivr.net/npm/tw-elements/dist/css/tw-elements.min.css",
      schematicsName: "tailwind-schematics",
    },
  };

  static schematics = {};

  static async initializeTailwindSchematics() {
    console.log("Initializing Tailwind schematics ...");
    if (localStorage.getItem(this.meta.tailwind.schematicsName)) {
      console.log("Tailwind schematics are cached.");
    } else {
      console.log("Tailwind schematics are not cached.");
      console.log("Fetching ...");
      const tailwindSchematics = await (
        await fetch(this.meta.tailwind.cdn)
      ).text();
      console.log("Caching ...");
      localStorage.setItem(
        this.meta.tailwind.schematicsName,
        tailwindSchematics
      );
    }
    console.log("Tailwind schematics have been initialized.");
  }

  static initializeSchematics() {
    console.log("Initializing schematics ...");
    this.initializeTailwindSchematics();
    console.log("Schematics have been initialized.");
  }

  static parseCSSFile(cssContent) {
    try {
      console.log("CSS CONTENT:");
      console.log(cssContent);
      const textWithoutComments = cssContent.replace(/\/\*[\s\S]*?\*\//g, "");
      const rules = [];

      // Regular expression to match CSS rules
      const ruleRegex = /([^{}]+)\s*{\s*([^}]+)\s*}/g;

      let match;
      while ((match = ruleRegex.exec(textWithoutComments)) !== null) {
        const selector = match[1].trim();
        const declaration = match[2].trim() + ";";

        rules.push([selector, declaration]);
      }

      return { rules };
    } catch (error) {
      console.error("Error fetching or parsing CSS file:", error);
    }
  }

  static defineTailwindSchematics() {
    console.log("Defining Tailwind schematics ...");
    const rawTailwindSchematics = localStorage.getItem(
      this.meta.tailwind.schematicsName
    );
    const tailwindSchematics = this.parseCSSFile(rawTailwindSchematics);
    this.schematics.tailwind = tailwindSchematics;
    console.log("Tailwind schematics has been defined.");
  }

  static defineSchematics() {
    console.log("Defining schematics ...");
    this.defineTailwindSchematics();
    console.log("Schematics have been defined.");
  }

  download() {
    const htmlContent = this.element.innerHTML;
    const blob = new Blob([htmlContent], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${this.name}.html`;
    link.click();
  }

  desobfuscate() {
    const method = this.desobfuscate.name;

    if (
      this.log.commits.length > 0 &&
      this.log.commits[this.log.commits.length - 1].method === method
    )
      throw new Error(`Cannot ${method} twice.`);

    this.method = method;

    const clonedRules = structuredClone(this.rules);
    const updatedRules = [];
    const changedRules = [];
    const unchangedRules = [];

    for (const [selector, declaration] of clonedRules) {
      for (const [actualSelector, actualDeclaration] of Tailre.schematics
        .tailwind.rules) {
        if (actualDeclaration === declaration.join("")) {
          updatedRules.push([selector, declaration, actualSelector]);
          changedRules.push([selector, declaration, actualSelector]);
          break;
        } else unchangedRules.push([selector, declaration, actualSelector]);
      }
    }

    this.stats = {
      rules: {
        total: this.rules.length,
        updated: updatedRules,
        changed: changedRules.length,
        unchanged: unchangedRules.length,
        ok: changedRules > 0 ? true : false,
      },
    };

    this.commit();
  }

  hydrate() {
    for (const element of this.virtual) {
      for (const className of element.classList) {
        for (const [selector, , actualSelector] of structuredClone(
          this.rules
        )) {
          if (typeof actualSelector === "undefined")
            throw new Error("There's no actualSelector");

          if (selector[0].slice(1) === className) {
            element.classList.replace(className, actualSelector.slice(1));
          }
        }
      }
    }
  }

  static buildFromHTML(html) {
    const virtual = [...html.querySelectorAll("*")];
    const element = html;
    const rules = [...document.styleSheet.cssRules]
      .map(this.compressCSSText.bind(this))
      .map(this.transformToRules.bind(this));

    new Tailre({ rules, virtual, element });
  }

  static reconnoitreFromTop() {
    let performed = false;
    let tailres = [];

    try {
      if (window === top) {
        tailres = this.buildFromStyleSheets([...window.document.styleSheets]);
        performed = true;
      }
    } catch (error) {
      console.error(error);
    } finally {
      return { performed, tailres };
    }
  }

  static async reconnoitreFromFrames() {
    let performed = false;
    let tailres = [];

    try {
      if (frames.length > 0) {
        const styleSheets = await Promise.all(
          Array.from(frames).map(
            (frame) =>
              new Promise(
                (resolve) =>
                  (frame.onload = () =>
                    resolve(Array.from(frame.document.styleSheets)))
              )
          )
        );

        tailres = styleSheets.map((styleSheets) =>
          this.buildFromStyleSheets(styleSheets)
        );

        performed = true;
      }
    } catch (error) {
      console.error(error);
    } finally {
      return { performed, tailres };
    }
  }

  static async reconnoitre() {
    let performed = false;
    let tailres = [];

    try {
      {
        const reconnaissance = this.reconnoitreFromTop();
        this.meta.reconnaissance[this.reconnoitreFromTop.name] =
          reconnaissance.performed;
        if (reconnaissance.performed)
          tailres = [...tailres, ...reconnaissance.tailres];
      }

      {
        const reconnaissance = await this.reconnoitreFromFrames();
        this.meta.reconnaissance[this.reconnoitreFromFrames.name] =
          reconnaissance.performed;
        if (reconnaissance.performed)
          tailres = [...tailres, ...reconnaissance.tailres];
      }

      performed = true;
    } catch (error) {
      console.error(error);
    } finally {
      return { performed, tailres };
    }
  }
}

(async () => {
  Tailre.initializeSchematics();
  Tailre.defineSchematics();
  const reconnaissance = await Tailre.reconnoitre();
  for (const tailre of reconnaissance.tailres) {
    tailre.desobfuscate();
    console.log(tailre);
    // console.log(`Selector: ${tailre.rules[0]?.[0]}`);
    // console.log(`Declaration: ${tailre.rules[0]?.[1]}`);
  }
})();

// const tailre = tailres[0];

// console.log([...document.styleSheets]);

// setTimeout(() => {
//   console.log([...document.styleSheets]);
// }, 2000);

// const tailreDirector = new TailreDirector();
// const tailreBuilder = new TailreBuilder();
// tailreDirector.tailreBuilder = tailreBuilder;

// tailreBuilder.setObfuscation();
// tailreBuilder.setDeclarationReversion();
// tailreBuilder.setAbstraction();

// class TailBuilder {}

// Tail.setSelectorsRename()
//   .setSelectorsDisarrangement()
//   .setSelectorsBifurcation()
//   .setSelectorsAbstraction()
//   .setDeclarationsRename()
//   .setDeclarationsDisarrangement()
//   .setDeclarationsBifurcation()
//   .setDeclarationsAbstraction();
