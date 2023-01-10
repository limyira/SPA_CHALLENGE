import Root from "./Root.js";

export default class extends Root {
  constructor() {
    super();
    this.setTitle("Edit");
  }
  async getHtml(state) {
    return `<main>
    <section id="page-upload">
      <img
        src=${state.image}
        style="object-fit: cover"
        id="post-img"
      /><input
        placeholder="글 제목을 작성해주세요."
        id="input-title"
        maxlength="50"
      /><textarea
        placeholder="글 내용을 작성해주세요."
        id="textarea-title"
        maxlength="500"
      ></textarea
      ><button id="submit-button">글 수정하기</button>
      <div id="detail-title">
        <a
          href="http://hpny.s3-website.ap-northeast-2.amazonaws.com/#/post/43"
          style="cursor: pointer"
          ><img
            src="https://hpny-1.s3.ap-northeast-2.amazonaws.com/icon_chevron_left.svg"
            id="back-icon" /></a
        ><a href="/#/" id="logo"><strong>HPNY 2023</strong></a>
      </div>
    </section>
  </main>
  `;
  }
}
