import { getDetail } from "../fetch/fetch.js";
import Root from "./Root.js";

export default class extends Root {
  constructor() {
    super();
    this.setTitle("Post");
  }
  async getHtml(item) {
    const { comments, post } = item;
    const [...coment] = comments;
    return `
      <main>
        <section id="page-detail">
          <article id="post-article">
            <img id="post-img" src=${post.image}></img>
            <strong>${post.title}</strong>
            <span>${post.createdAt}</span>
            <p>${post.content}</p>
            <button id="post-update-button" data-link>수정</button>
            <button id="post-delete-button" data-link>삭제</button>
          </article>
          <section id="comment-section">
            <form>
              <input id="comment-input"></input>
              <button id="comment-button" type="submit">게시</button>
            </form>
            <ul id="comment-list">
            ${comments
              .map(
                (comment) =>
                  `<li id="comment"><p>${comment.content}</p><button id="comment-delete-btn">삭제</button></li>`
              )
              .join("")}
            </ul>
          </section>
          <div id="detail-title">
            <a id="goBack" href="/edit/${item.postId}">
              <img
                id="back-icon"
                src="https://hpny-1.s3.ap-northeast-2.amazonaws.com/icon_chevron_left.svg"
              />
            </a>
            <a id="logo" href="/">
              <strong>HPNY 2023</strong>
            </a>
          </div>
        </section>
      </main>
  `;
  }
  async goEdit() {
    const data = item;
    return data;
  }
}
export const getItemId = async (id) => {
  const { data } = await getDetail(id);
  return data;
};
