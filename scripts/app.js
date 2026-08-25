/* ── Imports ───────────────────────────────────────────────── */

import { TECHNOLOGIES, PROJECTS } from "./content.js";

/* ── Variables ─────────────────────────────────────────────── */

const backdropOverlay = document.querySelector(".overlay");
const navToggler = document.querySelector(".navbar-toggler");
const navToggleIcon = navToggler.querySelector("i");
const navDrawer = document.querySelector("#main-nav__links");
const navLinks = document.querySelectorAll("[data-link-target]");
const sections = document.querySelectorAll(".page-section > div");

/* ── Technology Pills Renderer ─────────────────────────────── */

const renderTechnologies = () => {
  const template = document.querySelector("#technology-template");
  const fragment = document.createDocumentFragment();

  TECHNOLOGIES.forEach(({ name, url = "#" }) => {
    const node = template.content.cloneNode(true);
    node.querySelector("a").href = url;
    node.querySelector("div").textContent = name;
    fragment.appendChild(node);
  });

  document.querySelector("#technology-list").appendChild(fragment);
};

renderTechnologies();

/* ── Project List Renderer ─────────────────────────────── */

const renderProjects = () => {
  const template = document.querySelector("#projects-template");
  const fragment = document.createDocumentFragment();

  PROJECTS.forEach(({ name, description: desc, url = "#" }) => {
    const node = template.content.cloneNode(true);
    node.querySelector("a").href = url;
    node.querySelector("h4").lastElementChild.before(name);

    if (desc.length > 250) desc = desc.slice(0, 250) + "...";
    node.querySelector("p").textContent = desc;

    fragment.appendChild(node);
  });

  document.querySelector("#projects > div").lastElementChild.before(fragment);
};

renderProjects();

/* ── Scrollspy Observer ────────────────────────────────────── */

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((linkEl) => {
        linkEl.classList.toggle(
          "active",
          entry.target.parentElement.id === linkEl.dataset.linkTarget,
        );
      });
    });
  },
  { rootMargin: "-20% 0px -70% 0px" },
);

sections.forEach((el) => observer.observe(el));

/* ── Drawer Toggle ─────────────────────────────────────────── */

const isDrawerVisible = () => navDrawer.classList.contains("drawer-open");

const toggleDrawer = (isOpen) => {
  navDrawer.classList.toggle("drawer-open", isOpen);
  navDrawer.classList.toggle("border-start", isOpen);
  backdropOverlay.classList.toggle("vh-100", isOpen);
  navToggleIcon.classList.toggle("fa-bars", !isOpen);
  navToggleIcon.classList.toggle("fa-x", isOpen);
};

/* ── Nav Item Numbering ────────────────────────────────────── */

navDrawer.querySelectorAll(".nav-item").forEach((navItem, index) => {
  const numSpan = document.createElement("span");
  numSpan.innerText = `${String(index + 1).padStart(2, "0")}.`;
  numSpan.classList.add("fs-6", "text");
  navItem.prepend(numSpan);
});

/* ── Event Listeners ───────────────────────────────────────── */

document.body.addEventListener("click", (e) => {
  if (isDrawerVisible() && !navDrawer.contains(e.target)) toggleDrawer(false);
});

navDrawer.addEventListener("click", (e) => {
  if (e.target.closest("a")) toggleDrawer(false);
});

navToggler.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleDrawer(!isDrawerVisible());
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && isDrawerVisible()) toggleDrawer(false);
});
