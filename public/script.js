"use strict";

const STORAGE_PROJECTS = "projects";
const STORAGE_THEME = "theme";

function getElements() {
    return {
        container: document.querySelector("#projects .cards"),
        addButton: document.getElementById("add-project"),
        removeButton: document.getElementById("remove-project"),
        toggleButton: document.getElementById("toggle-projects"),
        themeButton: document.getElementById("theme-toggle"),
        gallery: document.getElementById("gallery")
    };
}

function checkElements(elements) {
    let allFound = true;
    for (const key in elements) {
        const element = elements[key];
        if (element) {
            continue;
        }
        console.error("Элемент не найден: " + key);
        allFound = false;
    }
    return allFound;
}

function createProjectCard(title, description) {
    const card = document.createElement("article");
    card.classList.add("project-card");

    const heading = document.createElement("h3");
    heading.textContent = title;

    const text = document.createElement("p");
    text.textContent = description;

    const button = document.createElement("button");
    button.type = "button";
    button.classList.add("btn");
    button.textContent = "Подробнее";

    card.appendChild(heading);
    card.appendChild(text);
    card.appendChild(button);
    return card;
}

function saveProjects(container) {
    const cards = container.querySelectorAll(".project-card");
    const projects = [];
    for (const card of cards) {
        projects.push({
            title: card.querySelector("h3").textContent,
            description: card.querySelector("p").textContent
        });
    }
    localStorage.setItem(STORAGE_PROJECTS, JSON.stringify(projects));
}

function loadProjects(container) {
    const saved = localStorage.getItem(STORAGE_PROJECTS);
    if (saved === null) {
        return;
    }

    const projects = JSON.parse(saved);

    const cards = container.querySelectorAll(".project-card");
    for (const card of cards) {
        card.remove();
    }
    for (const project of projects) {
        container.appendChild(createProjectCard(project.title, project.description));
    }
}

function addProject(container) {
    const title = prompt("Название проекта:");
    if (title === null || title.trim() === "") {
        return;
    }
    const description = prompt("Описание проекта:");
    if (description === null || description.trim() === "") {
        return;
    }

    container.appendChild(createProjectCard(title.trim(), description.trim()));
    saveProjects(container);
}

function removeLastProject(container) {
    const cards = container.querySelectorAll(".project-card");
    if (cards.length === 0) {
        console.log("Нет проектов для удаления");
        alert("Список пуст");
        return;
    }

    cards[cards.length - 1].remove();
    saveProjects(container);
}

function toggleProjects(container, button) {
    const isHidden = container.classList.toggle("hidden");
    button.textContent = isHidden ? "Развернуть проекты" : "Свернуть проекты";
    button.setAttribute("aria-expanded", String(!isHidden));
}

function applyTheme(theme, button) {
    document.body.classList.remove("theme-light", "theme-dark");
    document.body.classList.add("theme-" + theme);
    button.textContent = theme === "dark" ? "Светлая тема" : "Тёмная тема";
}

function toggleTheme(button) {
    const newTheme = document.body.classList.contains("theme-dark") ? "light" : "dark";
    applyTheme(newTheme, button);
    localStorage.setItem(STORAGE_THEME, newTheme);
}

function loadTheme(button) {
    const saved = localStorage.getItem(STORAGE_THEME);
    applyTheme(saved === "dark" ? "dark" : "light", button);
}

function showDetails(event, gallery) {
    if (event.target.classList.contains("btn")) {
        gallery.scrollIntoView();
    }
}

function init() {
    const elements = getElements();
    if (!checkElements(elements)) {
        return;
    }

    loadTheme(elements.themeButton);
    loadProjects(elements.container);

    elements.addButton.addEventListener("click", function () {
        addProject(elements.container);
    });
    elements.removeButton.addEventListener("click", function () {
        removeLastProject(elements.container);
    });
    elements.toggleButton.addEventListener("click", function () {
        toggleProjects(elements.container, elements.toggleButton);
    });
    elements.themeButton.addEventListener("click", function () {
        toggleTheme(elements.themeButton);
    });
    elements.container.addEventListener("click", function (event) {
        showDetails(event, elements.gallery);
    });
}

init();

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js");
}
