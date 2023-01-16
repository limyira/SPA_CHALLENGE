import Root from "./Root.js";
import { getAll, getDetail } from "../fetch/fetch.js";
import { getItemId } from "./Post.js";
import { navTo, router } from "../index.js";
export default class extends Root {
  constructor() {
    super();

    this.setTitle("Home");
  }
  async getHtml() {
    return ` <main>
        <section id="page-main">
          <div id="detail-title" style="justify-content:flex-end">
            <a id="logo" href="/" data-link='nav'>
              <strong>HPNY 2023</strong>
            </a>
          </div>
          <div id="create-post-btn-wrap">
            <a id="create-post-btn" href='/upload' data-link='nav'>
              게시글 작성하기
            </a>
          </div>
          <ul id="post-list"></ul>
        </section>
      </main>`;
  }
  async Detail() {
    const {
      data: {
        data: { posts },
      },
    } = await getAll();
    history.pushState(posts, null, location.origin);
    const postList = posts.map((item) => {
      const postUl = document.querySelector("#post-list");
      const postLi = document.createElement("li");
      const postA = document.createElement("a");
      const postImg = document.createElement("img");
      const postBox = document.createElement("div");
      const postStrong = document.createElement("strong");
      const postP = document.createElement("p");
      postStrong.innerText = item.title;
      postP.innerText = item.content;
      postImg.src = item.image;
      postA.dataset.link = "nav";
      postA.id = "postA";
      postA.href = `/`;
      postLi.id = "post";
      postBox.appendChild(postStrong);
      postBox.appendChild(postP);
      postA.appendChild(postImg);
      postA.appendChild(postBox);
      postLi.appendChild(postA);
      postUl.appendChild(postLi);
      postA.addEventListener("click", async (e) => {
        e.preventDefault();
        const response = await getItemId(item.postId);
        console.log(response)
        history.pushState(
          response.data,
          null,
          location.href + `post/${item.postId}`
        );
        router();
      });
    });
  }
}
