import Root from "./Root.js";

export default class extends Root {
  constructor() {
    super();
    this.setTitle("404");
  }
  async getHtml() {
    return `<main>
    <div id="page-notfound">
      <img src="https://hpny-1.s3.ap-northeast-2.amazonaws.com/emptycat.png" />
      <p>페이지를 찾을 수 없습니다.</p>
      <a href="/#/">메인 페이지로 이동하기</a>
    </div>
  </main>
  `;
  }
}
