import Root from "./Root.js";

export default class extends Root {
  constructor() {
    super();
    this.setTitle("Upload");
  }
  async getHtml() {
    return `<h1>Upload</h1>`;
  }
}
