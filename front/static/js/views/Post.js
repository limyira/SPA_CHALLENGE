import Root from "./Root.js";

export default class extends Root {
  constructor() {
    super();
    this.setTitle("Post");
  }
  async getHtml() {
    return `<h1>Post</h1>`;
  }
}
