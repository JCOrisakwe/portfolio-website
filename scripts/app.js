const navToggler = document.querySelector(".navbar-toggler");
const backdropOverlay = document.querySelector(".overlay");
const navDrawer = document.querySelector("#main-nav__links");

const isDrawerVisible = () => navDrawer.classList.contains("drawer-open");
const setDrawerVisibility = function (action = "add") {
  navDrawer.classList[action]("drawer-open");
  backdropOverlay.classList[action]("vh-100");
  navDrawer.parentElement.classList[action]("no-blur");
  document.body.classList[action]("overflow-hidden");
};

document.addEventListener("click", function (e) {
  if (!navDrawer.contains(e.target) && !navToggler.contains(e.target)) {
    setDrawerVisibility("remove");
  }
});

navToggler.addEventListener("click", function () {
  setDrawerVisibility(isDrawerVisible() ? "remove" : "add");
});

document.querySelectorAll("#main-nav__links .nav-item").forEach((li, id) => {
  const numSpan = document.createElement("span");
  numSpan.innerText = `0${id + 1}.`;
  numSpan.classList.add("fs-6", "text");
  li.prepend(numSpan);

  li.querySelector("a").addEventListener("click", () =>
    setDrawerVisibility("remove"),
  );
});

window.matchMedia("(min-width: 768px)").addEventListener("change", (e) => {
  if (e.matches) setDrawerVisibility("remove");
});
