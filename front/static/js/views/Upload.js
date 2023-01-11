import Root from "./Root.js";

export default class extends Root {
  constructor() {
    super();
    this.setTitle("Upload");
  }
  async getHtml() {
    return ` <main>
    <section id="page-upload">
      <button
        id="img-add-button"
        style="background: skyblue; "
      >
        이미지 추가 완료</button
      ><input
        placeholder="글 제목을 작성해주세요."
        id="input-title"
        maxlength="50"
      /><textarea
        placeholder="글 내용을 작성해주세요."
        id="textarea-title"
        maxlength="500"
      ></textarea
      ><button id="submit-button"  style="background: lightgrey; cursor: not-allowed;">글 작성하기</button>
      <div id="detail-title">
        <a id="goBack" href="/" style="cursor: pointer"
          ><img
            src="https://hpny-1.s3.ap-northeast-2.amazonaws.com/icon_chevron_left.svg"
            id="back-icon" /></a
        ><a href="/" id="logo"><strong>HPNY 2023</strong></a>
      </div>
    </section>
  </main>`;
  }
}
