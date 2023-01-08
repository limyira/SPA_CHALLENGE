import Root from "./Root.js";

export default class extends Root {
  constructor() {
    super();
    this.setTitle("Delete");
  }
  async getHtml() {
    return `<h1>Delete</h1>`;
  }
}
