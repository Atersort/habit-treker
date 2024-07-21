'use strict'

let habits = [];
const HABIT_KEY = "HABBIT_KEY"
const page = {
    menu: document.querySelector(".menu__list"),
    header: {
        h1: document.querySelector("h1"),
        progressPercent: document.querySelector(".progress__text_percent"),
        progressBar: document.querySelector(".progress__cover-bar")
    }
}

/* utils    эта тема обращается к локал сторедж */

function loadData() {
    const habitStorage = window.localStorage.getItem(HABIT_KEY);
    const habitArray = JSON.parse(habitStorage);
    console.log(typeof habitArray);
    if (Array(habitArray)) {
        habits = habitArray
    }
}

function getData() {
    localStorage.setItem(HABIT_KEY, JSON.stringify(habits))
}

// render

function renderMenu(activeHabits) {
    // проверка если в функцию передастя ноль
    if (!activeHabits) {
        return
    }
    for (const habit of habits) {
        const pointMenu = document.querySelector(`[menu-habit-id="${habit.id}"]`);
        if (!pointMenu) {
            //create element
            const element = document.createElement("button")
            element.setAttribute("menu-habit-id", habit.id);
            element.classList.add("menu__item");
            element.addEventListener("click", () => render(habit.id));
            element.innerHTML = `<img src="./images/${habit.icon}.svg" alt="${habit.name}">`
            if (activeHabits.id === habit.id) {
                element.classList.add("menu__item_active");
            }
            page.menu.appendChild(element)
            continue;
        }
        if (activeHabits.id === habit.id) {
            pointMenu.classList.add("menu__item_active")
        } else {
            pointMenu.classList.remove("menu__item_active")
        }
    }
}

function renderHead(activeHabit) {
    if(!activeHabit) {
        return
    }
    page.header.h1.innerHTML = activeHabit.name;

    let progressPercent = activeHabit.days.length / activeHabit.target * 100;
    progressPercent = progressPercent > 100 ? 100 : progressPercent.toFixed(0);
    page.header.progressPercent.innerHTML = progressPercent + " %";

    page.header.progressBar.setAttribute("style", `width: ${progressPercent}%`)
}

function render(actionHabitsId) {
    const idMenuActive = habits.find(habit => habit.id === actionHabitsId);
    renderMenu(idMenuActive);
    renderHead(idMenuActive)
}

// init
(() => {
    loadData()
    render(habits[0].id)
})();