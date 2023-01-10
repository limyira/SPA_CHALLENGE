import Home from "./views/Home.js";
import Upload from "./views/Upload.js";
import Post from "./views/Post.js";
import Edit from "./views/Edit.js";
import Delete from "./views/Delete.js";
import FZF from "./views/FZF.js";

const app = document.querySelector("#app");
export const navTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const regexPost = new RegExp(/\/post\/|\d/);
  const regexEdit = new RegExp(/\/edit\/|\d/);
  console.log(regexPost);
  const app = document.querySelector("#app");
  if (location.pathname === "/") {
    const view = new Home();
    app.innerHTML = await view.getHtml();
    await view.Detail();
    const goUpload = document.querySelector("#create-post-btn");
    console.log(goUpload);
    goUpload.addEventListener("click", (e) => {
      navTo(goUpload.href);
    });
  }
  if (regexPost.test(location.pathname)) {
    const view = new Post();
    app.innerHTML = await view.getHtml();
    document.querySelector("#logo").addEventListener("click", (e) => {
      history.back(-1);
    });
    const postBtn = document.querySelector("#post-update-button");
    postBtn.addEventListener("click", async (e) => {
      const data = await view.goEdit();
      const goEditBtn = document.querySelector("#goEdit");
      if (data) {
        history.pushState(data, null, goEditBtn.href);
        router();
      }
    });
  }
  if (regexEdit.test(location.pathname)) {
    const view = new Edit();
    app.innerHTML = await view.getHtml(history.state);
    const editBtn = document.querySelector("#submit-button");
    editBtn.addEventListener("click", (e) => {
      history.back(-1);
    });
  }
  if (location.pathname === "/upload") {
    const view = new Upload();
    app.innerHTML = await view.getHtml();
  }
};
window.addEventListener("popstate", router);

window.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.getAttribute("data-link") === "nav") {
      navTo(e.target.href, null);
    }
  });
  router();
});

// let routes = [
//   { path: "/", view: Home },
//   { path: "/upload", view: Upload },
//   { path: "/post/:id", view: Post },
//   { path: "/edit", view: Edit },
//   { path: "/delete", view: Delete },
//   { path: "/404", view: FZF },
// ];
// const preMatches = routes.map((route) => {
//   return {
//     route,
//     isMatch: location.pathname === route.path,
//   };
// });
// let match = preMatches.find((preMatch) => preMatch.isMatch);
// if (!match) {
//   match = {
//     route: routes[routes.length - 1],
//     isMatch: true,
//   };
// }

// const views = new match.route.view();
// app.innerHTML = await views.getHtml();
// if (match.route.path === "/") {
//   await views.Detail();
// }
// if (regex.test(location.pathname)) {
//   const listDetail = new routes[2].view();
//   app.innerHTML = await listDetail.getHtml();
//   match = {
//     route: {
//       path: routes[2].path,
//       view: routes[2].view,
//     },
//     isMatch: true,
//   };
// }
// window.addEventListener("beforeunload", (e) => {
//   const href = "/404";
//   navTo("localhost:3001/404");
// });
