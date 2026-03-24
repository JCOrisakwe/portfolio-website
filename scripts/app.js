const navToggler = document.querySelector(".navbar-toggler");
const icon = navToggler.querySelector("i");
const backdropOverlay = document.querySelector(".overlay");
const navDrawer = document.querySelector("#main-nav__links");

if (!navToggler || !backdropOverlay || !navDrawer)
  throw new Error("Nav elements missing");

const isDrawerVisible = () => navDrawer.classList.contains("drawer-open");
const toggleDrawer = (isOpen) => {
  navDrawer.classList.toggle("drawer-open", isOpen);
  navDrawer.classList.toggle("border-start", isOpen);
  backdropOverlay.classList.toggle("vh-100", isOpen);
  icon.classList.toggle("fa-bars", !isOpen);
  icon.classList.toggle("fa-x", isOpen);
};

document.addEventListener("click", function (e) {
  if (!navDrawer.contains(e.target) && !navToggler.contains(e.target)) {
    toggleDrawer(false);
  }
});

navToggler.addEventListener("click", function (e) {
  e.stopPropagation();
  toggleDrawer(!isDrawerVisible());
});

document.querySelectorAll("#main-nav__links .nav-item").forEach((li, index) => {
  const numSpan = document.createElement("span");
  numSpan.innerText = `${String(index + 1).padStart(2, "0")}.`;
  numSpan.classList.add("fs-6", "text");
  li.prepend(numSpan);
  li.querySelector("a").addEventListener("click", (e) => {
    e.stopPropagation();
    toggleDrawer(false);
  });
});

window.matchMedia("(min-width: 768px)").addEventListener("change", (e) => {
  if (e.matches) toggleDrawer(false);
});
