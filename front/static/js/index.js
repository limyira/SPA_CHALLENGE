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
  deleteComment,
  getDetail,
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

    goUpload.addEventListener("click", (e) => {
      navTo(goUpload.href);
    });
  }
  if (regexPost.test(location.pathname)) {
    //새로고침시 페이지이탈..
    const view = new Post();
    app.innerHTML = await view.getHtml(history.state);
    const logo = document.querySelector("#logo");
    const commentInput = document.querySelector("#comment-input");
    const commentBtn = document.querySelector("#comment-button");
    const commentList = document.querySelector("#comment-list");
    const [...child] = commentList.children;
    const commentDeleteBtns = document.querySelectorAll("#comment-delete-btn");
    const deleteEvents = [...commentDeleteBtns];
    deleteEvents.map((deleteEvent) => {
      deleteEvent.addEventListener("click", async (e) => {
        const targetText = e.target.previousSibling.innerText;
        const { comments } = history.state;
        const potentialTarget = comments.find(
          (comment) => comment.content === targetText
        );
        const targetId = potentialTarget.commentId;
        await deleteComment(targetId);
        const res = await getDetail(history.state.post.postId);
        const refreshData = res.data.data;
        app.innerHTML = await view.getHtml(refreshData);
        history.pushState(refreshData, null, location);
        router();
      });
    });
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

        const res = await getDetail(history.state.post.postId);
        const refreshData = res.data.data;
        app.innerHTML = await view.getHtml(refreshData);

        history.pushState(refreshData, null, location);
        router();
      }
    });

    logo.addEventListener("click", (e) => {
      history.back(-2);
    });
    const goBack = document.querySelector("#goBack");
    goBack.addEventListener("click", (e) => {
      navTo(location.origin);
      router();
    });

    const postBtn = document.querySelector("#post-update-button");
    postBtn.addEventListener("click", async (e) => {
      const data = history.state.post;
      history.pushState(data, null, location.origin + `/edit/${data.postId}`);
      router();
    });

    const deleteBtn = document.querySelector("#post-delete-button");
    deleteBtn?.addEventListener("click", async (e) => {
      await removeItem(history.state.post.postId);
      history.pushState(null, null, location.origin);
      router();
    });
  }
  if (regexEdit.test(location.pathname)) {
    const view = new Edit();
    app.innerHTML = await view.getHtml(history?.state);
    const editBtn = document.querySelector("#submit-button");
    const editTitle = document.querySelector("#input-title");
    const editInput = document.querySelector("#textarea-title");
    const eventArr = [editTitle, editInput];
    editBtn.addEventListener("beforeload", (e) => {
      eventArr.map(async (i) => {
        const res = await editItem(history.state, {
          title: editTitle.value,
          content: editInput.value,
        });
        const {
          data: { data },
        } = res;
        const { postId } = data.post;
        const detailResponse = await getDetail(postId);
        console.log(detailResponse);
        history.pushState(
          detailResponse.data.data,
          null,
          location.origin + `/post/${data.post.postId}`
        );
        router();
      });
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
  //upload 시 패치를 여러번 하는현상.
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
        submitBtn.addEventListener("click", async (e) => {
          const data = {
            title: title.value,
            content: text.value,
            image: imageUrl,
          };
          await uploadPost(data);
          history.pushState(null, null, location.origin);
          router();
        });
      })
    );
  }
  const path = location.pathname;
  const homeMatch = path === "/";
  const postMatch = regexPost.test(path);
  const editMatch = regexEdit.test(path);
  const uploadMatch = path === "/upload";
  if (!homeMatch && !postMatch && !editMatch && !uploadMatch) {
    const view = new FZF();
    app.innerHTML = await view.getHtml();
    history.pushState(null, null, location.origin + "/404");
  }
};
window.addEventListener("popstate", router);

window.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("click", (e) => {
    e.preventDefault();
  });
  router();
});
