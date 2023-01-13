import Home from "./views/Home.js";
import Upload from "./views/Upload.js";
import Post from "./views/Post.js";
import Edit from "./views/Edit.js";
import Delete from "./views/Delete.js";
import FZF from "./views/FZF.js";
import {
  uploadPost,
  removeItem,
  editItem,
  uploadComment,
} from "./fetch/fetch.js";

const app = document.querySelector("#app");
export const navTo = (url) => {
  history.pushState(null, null, url);
  router();
};

export const router = async () => {
  const regexPost = new RegExp(/\/post\/\d{2,99}/);
  const regexEdit = new RegExp(/\/edit\/\d{2,99}/);

  const app = document.querySelector("#app");
  if (location.pathname === "/") {
    const view = new Home();
    app.innerHTML = await view.getHtml();
    await view.Detail();
    const goUpload = document.querySelector("#create-post-btn");

    goUpload.addEventListener(
      "click",
      (e) => {
        navTo(goUpload.href);
      },
      { once: true }
    );
  }
  if (regexPost.test(location.pathname)) {
    const view = new Post();
    app.innerHTML = await view.getHtml(history.state);
    const logo = document.querySelector("#logo");
    const commentInput = document.querySelector("#comment-input");
    const commentBtn = document.querySelector("#comment-button");
    const commentList = document.querySelector("#comment-list");
    const [...child] = commentList.children;
    const commentDeleteBtn = document.querySelector("#comment-delete-btn");
    commentBtn.addEventListener("click", async (e) => {
      const validation = child.some((li) => {
        return li.children[0].innerText === commentInput.value;
      });
      if (validation) {
        alert("중복 댓글은 입력할수 없습니다.");
      } else if (commentInput.value.length === 0) {
        alert("글자를 입력해주세요.");
      } else {
        const { response } = await uploadComment(
          history.state,
          commentInput.value
        );
        console.log({ response });
        if (response.status === 400) {
          alert("중복 댓글은 입력할 수 없습니다.");
        }
        const li = document.createElement("li");
        const btn = document.createElement("button");
        const p = document.createElement("p");
        li.id = "comment";
        btn.id = "comment-delete-btn";
        p.innerText = commentInput.value;
        btn.innerText = "삭제";
        li.appendChild(p);
        li.appendChild(btn);
        commentList.appendChild(li);
      }
    });

    logo.addEventListener("click", (e) => {
      history.back(-2);
    });
    const goBack = document.querySelector("#goBack");
    goBack.addEventListener("click", (e) => {
      history.back(-1);
    });

    const postBtn = document.querySelector("#post-update-button");
    postBtn.addEventListener("click", async (e) => {
      const data = history.state.post;
      history.pushState(data, null, location.origin + `/edit/${data.postId}`);
      router();
    });

    const deleteBtn = document.querySelector("#post-delete-button");
    deleteBtn.addEventListener("click", async (e) => {
      await removeItem(history.state.post.postId);
      history.pushState(null, null, location.origin);
      router();
    });
    commentDeleteBtn.addEventListener("click", (e) => {});
  }
  if (regexEdit.test(location.pathname)) {
    const view = new Edit();
    app.innerHTML = await view.getHtml(history.state);
    const editBtn = document.querySelector("#submit-button");
    const editTitle = document.querySelector("#input-title");
    const editInput = document.querySelector("#textarea-title");
    const eventArr = [editTitle, editInput];
    editBtn.addEventListener("click", (e) => {
      eventArr.map(async (i) => {
        await editItem(history.state, {
          title: editTitle.value,
          content: editInput.value,
        });
      });
      history.pushState(null, null, location.origin);
      router();
    });
    const logo = document.querySelector("#logo");
    logo.addEventListener("click", (e) => {
      history.pushState(null, null, location.origin);
      router();
    });
    const goBack = document.querySelector("#goBack");
    goBack.addEventListener("click", (e) => {
      history.back(-1);
    });
  }
  if (location.pathname === "/upload") {
    const view = new Upload();
    app.innerHTML = await view.getHtml();
    const logo = document.querySelector("#logo");
    logo.addEventListener("click", (e) => {
      history.pushState(null, null, location.origin);
      router();
    });
    const goBack = document.querySelector("#goBack");
    goBack.addEventListener("click", (e) => {
      history.pushState(null, null, location.origin);
      router();
    });
    const submitBtn = document.querySelector("#submit-button");
    const addImgBtn = document.querySelector("#img-add-button");
    const title = document.querySelector("#input-title");
    const text = document.querySelector("#textarea-title");
    let imageUrl;

    addImgBtn.addEventListener("click", async (e) => {
      addImgBtn.style.background = "lightgrey";
      addImgBtn.disabled = true;
      addImgBtn.style.cursor = "not-allowed";
      imageUrl = "https://source.unsplash.com/random/300×300";
    });
    if (addImgBtn.style.background !== "lightgrey") {
    }
    const event = [title, text];
    event.map((i) =>
      i.addEventListener("input", () => {
        if (title.value && text.value) {
          submitBtn.style.background = "skyblue";
          submitBtn.style.cursor = "pointer";
          submitBtn.disabled = false;
        }
        submitBtn.addEventListener(
          "click",
          async (e) => {
            const data = {
              title: title.value,
              content: text.value,
              image: imageUrl,
            };
            await uploadPost(data);
            history.pushState(null, null, location.origin);
            router();
          },
          { once: true }
        );
      })
    );
  }
};
window.addEventListener("popstate", router);

window.addEventListener(
  "DOMContentLoaded",
  () => {
    window.addEventListener("click", (e) => {
      e.preventDefault();
    });
    router();
  },
  { once: true }
);
