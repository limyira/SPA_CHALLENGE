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

export const navTo = (url) => {
  history.pushState(null, null, url);
  router();
};

export const router = async () => {
  const path = location.pathname;
  const app = document.querySelector("#app");
  const page404 = async () => {
    const pageNotfound = new FZF();
    app.innerHTML = await pageNotfound.getHtml();
    const a = document.querySelector("a");
    if (a) {
      a.addEventListener("click", (e) => {
        history.pushState(null, null, location.origin);
        router();
      });
    }
  };

  if (path === "/") {
    const view = new Home();
    app.innerHTML = await view.getHtml();
    await view.Detail();
    const goUpload = document.querySelector("#create-post-btn");
    goUpload.addEventListener("click", (e) => {
      navTo(goUpload.href);
    });
  }
  if (path.indexOf("post") === 1) {
    const view = new Post();
    if (history.state) {
      app.innerHTML = await view.getHtml(history.state);
      const logo = document.querySelector("#logo");
      const commentInput = document.querySelector("#comment-input");
      const commentBtn = document.querySelector("#comment-button");
      const commentList = document.querySelector("#comment-list");
      const [...child] = commentList.children;
      const commentDeleteBtns = document.querySelectorAll(
        "#comment-delete-btn"
      );
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
        const text = child.some((li) => {
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
        history.pushState(null, null, location.origin);
        router();
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
    } else {
      page404();
    }
  }
  if (path.indexOf("edit") === 1) {
    const view = new Edit();
    if (history.state) {
      app.innerHTML = await view.getHtml(history.state);
      const editBtn = document.querySelector("#submit-button");
      const editTitle = document.querySelector("#input-title");
      const editInput = document.querySelector("#textarea-title");
      editBtn.addEventListener("click", async (e) => {
        if (editTitle.value !== "" && editInput.value !== "") {
          const res = await editItem(history.state, {
            title: editTitle.value,
            content: editInput.value,
          });
          if (res.response?.status === 400) {
            if (res.response.data.error.includes("title")) {
              alert("타이틀이 중복되는 게시물이 있습니다.");
            } else {
              alert("내용이 중복되는 게시물이 있습니다.");
            }
          } else {
            const {
              data: { data },
            } = res;
            const { postId } = data.post;
            const detailResponse = await getDetail(postId);
            history.pushState(
              detailResponse.data.data,
              null,
              location.origin + `/post/${data.post.postId}`
            );
            router();
          }
        } else {
          alert("타이틀과 내용은 필수 입니다.");
        }
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
    } else {
      page404();
    }
  }
  if (path === "/upload") {
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
    const imageUrl = "https://source.unsplash.com/random/300×300";

    addImgBtn.addEventListener("click", async (e) => {
      addImgBtn.style.background = "lightgrey";
      addImgBtn.disabled = true;
      addImgBtn.style.cursor = "not-allowed";
      imageUrl;
    });
    if (addImgBtn.style.background !== "lightgrey") {
    }
    const event = [title, text];
    let inputValidation = false;
    event.map((i) =>
      i.addEventListener("input", (e) => {
        if (title.value && text.value) {
          e.preventDefault();
          submitBtn.style.background = "skyblue";
          submitBtn.style.cursor = "pointer";
          submitBtn.disabled = false;
          inputValidation = true;
        }
      })
    );
    submitBtn.addEventListener("click", async (e) => {
      if (inputValidation && title.value && text.value) {
        const data = {
          title: title.value,
          content: text.value,
          image: imageUrl,
        };
        const res = await uploadPost(data);
        if (res.response?.status === 400) {
          alert(res.response.data.message);
        } else {
          history.pushState(null, null, location.origin);
          router();
        }
      } else {
        alert("제목과 내용은 필수입니다.");
      }
    });
  }
  if (
    path !== "/" &&
    path !== "/upload" &&
    path.indexOf("post") !== 1 &&
    path.indexOf("edit") !== 1
  ) {
    page404();
  }
};
window.addEventListener("popstate", router);

window.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("click", (e) => {
    e.preventDefault();
  });
  router();
});
