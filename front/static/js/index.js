import Home from "./views/Home.js";
import Upload from "./views/Upload.js";
import Post from "./views/Post.js";
import Edit from "./views/Edit.js";
import Delete from "./views/Delete.js";
import FZF from "./views/FZF.js";
export const navTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  let routes = [
    { path: "/", view: Home },
    { path: "/upload", view: Upload },
    { path: "/post", view: Post },
    { path: "/edit", view: Edit },
    { path: "/delete", view: Delete },
    { path: "/404", view: FZF },
  ];
  const preMatches = routes.map((route) => {
    return {
      route,
      isMatch: location.pathname === route.path,
    };
  });
  let match = preMatches.find((preMatch) => preMatch.isMatch);
  if (!match) {
    match = {
      route: routes[routes.length - 1],
      isMatch: true,
    };
  }
  const view = new match.route.view();
  document.querySelector("#app").innerHTML = await view.getHtml();

  if (match.route.path === "/") {
    await view.Detail();
    const postA = document.querySelector("#post");
    postA.addEventListener("click", (e) => {
      e.preventDefault();

      navTo(postA.href);
    });
  }
};

window.addEventListener("popstate", router);

window.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.getAttribute("data-link") === "nav") {
      navTo(e.target.href);
    }
  });
  router();
});
