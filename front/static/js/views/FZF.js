import Root from "./Root.js";

export default class extends Root {
  constructor() {
    super();
    this.setTitle("404");
  }
  async getHtml() {
    return `<h1>404</h1>`;
  }
}
