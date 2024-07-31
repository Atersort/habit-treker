'use strict'

let habits = [];
const HABIT_KEY = "HABBIT_KEY"
let globalHabitId
const page = {
    menu: document.querySelector(".menu__list"),
    header: {
        h1: document.querySelector("h1"),
        progressPercent: document.querySelector(".progress__text_percent"),
        progressBar: document.querySelector(".progress__cover-bar")
    },
    content: {
        day: document.getElementById("days"),
        nextDay: document.querySelector(".habbit-day")
    }
}

/* utils    эта тема обращается к локал сторедж */

function loadData() {
    const habitStorage = window.localStorage.getItem(HABIT_KEY);
    const habitArray = JSON.parse(habitStorage);
    if (Array(habitArray)) {
        habits = habitArray
    }
}

function getData() {
    localStorage.setItem(HABIT_KEY, JSON.stringify(habits))
}

// render

function renderMenu(activeHabits) {
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
    page.header.h1.innerHTML = activeHabit.name;

    let progressPercent = activeHabit.days.length / activeHabit.target * 100;
    progressPercent = progressPercent > 100 ? 100 : progressPercent.toFixed(0);
    page.header.progressPercent.innerHTML = progressPercent + " %";

    page.header.progressBar.setAttribute("style", `width: ${progressPercent}%`)
}

function renderContent(activeHabit) {
    page.content.day.innerHTML = ""
    for (const index in activeHabit.days) {
        const element = document.createElement("div");
        element.classList.add("habbit");
        element.innerHTML = `
                        <div class="habbit-day">
                            День ${Number(index) + 1}
                        </div>
                        <div class="habbit-commit">
                            ${activeHabit.days[index].commit}
                        </div>
                        <button class="habbit-delete" onclick="deleteHabit(${index})">
                            <img src="./images/delete.svg" alt="">
                        </button>`;
        page.content.day.appendChild(element);
    }
    page.content.nextDay.innerHTML = `День ${activeHabit.days.length + 1}`
}

function render(actionHabitsId) {
    globalHabitId = actionHabitsId
    const idMenuActive = habits.find(habit => habit.id === actionHabitsId);
    if (!idMenuActive) {
        return
    }
    renderMenu(idMenuActive);
    renderHead(idMenuActive);
    renderContent(idMenuActive);
}

// work days form
function addDays(event) {
    const form = event.target;
    event.preventDefault();
    const data = new FormData(event.target);
    const commit = data.get("commit");
    form['commit'].classList.remove('error')
    if (!commit) {
        form['commit'].classList.add('error')
    }
    habits = habits.map(habit => {
        if (habit.id === globalHabitId) {
            return {
                ...habit,
                days: habit.days.concat([{commit}])
            }
        }
        return habit
    });
    form['commit'].value = ''
    render(globalHabitId);
}

function deleteHabit(habitId) {
    habits = habits.map(habit => {
        if (habit.id === globalHabitId) {
            habit.days.splice(habitId, 1);
            return {
                ...habit,
                days: habit.days
            };
        }
        return habits
    });
    render(globalHabitId);
    getData()
}

// init
(() => {
    loadData()
    render(habits[0].id)
})();