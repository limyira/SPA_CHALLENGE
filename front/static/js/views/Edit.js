import Root from "./Root.js";

export default class extends Root {
  constructor() {
    super();
    this.setTitle("Edit");
  }
  async getHtml() {
    return `<h1>Edit</h1>`;
  }
}
