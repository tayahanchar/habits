const dataJSON = [
  {
    id: 566,
    img: 1,
    title: "Sport",
    target: 10,
    days: ["Ferst day...", "Sec day", "Next day"],
  },
  {
    id: 6545,
    img: 4,
    title: "Run",
    target: 20,
    days: ["Ferst day...", "Sec day", "Next day", "Another day"],
  },
  {
    id: 65435,
    img: 1,
    title: "Run7777",
    target: 20,
    days: [],
  },
  {
    id: 875,
    img: 4,
    title: "Run",
    target: 20,
    days: ["Ferst day...", "Sec day", "Next day", "Another day"],
  },
];

let habits;
let activeHabitId;
getDataFromLS();

function getDataFromLS() {
  const data = localStorage.getItem("habits");

  if (!data) return;

  habits = JSON.parse(data);
  activeHabitId = habits[0].id;

  showHabitsList();
  showHabitDetails(activeHabitId);
}

function showHabitsList() {
  const habitsContainer = document.querySelector(".habits-list");

  habits.forEach((habit, index) => {
    const HTMLHabit = `<button class="${
      index === 0 ? "habbit-button habbit-button-active" : "habbit-button"
    }" data-id=${habit.id}>
          <img class="habbit-img" src="./images/${habit.img}.svg" alt="habit">
        </button>`;

    habitsContainer.insertAdjacentHTML("beforeend", HTMLHabit);
    habitsContainer.addEventListener("click", changeActiveHabit);
  });
}

function showHabitDetails(habitId) {
  currentHabit = habits.find((habit) => habit.id === habitId);

  document.querySelector(".habit-title").textContent = currentHabit.title;

  const daysContainer = document.querySelector(".habit-bottom");
  daysContainer.innerHTML = "";

  currentHabit.days.forEach((day, index) => {
    const dayHTML = `<div class="habit-inf">
    <p class="habit-day">Day ${index + 1}</p>
    <div class="habit-comment">
      <p>${day}</p>
      <button class="delete-habit">
        <img src="./images/shape.svg" alt="delete">
      </button>
    </div>
  </div>`;

    daysContainer.insertAdjacentHTML("beforeend", dayHTML);
  });

  const newDayHTML = `
  <div class="habit-inf">
          <p class="habit-day">Day ${currentHabit.days.length + 1}</p>
          <div class="habit-comment">
            <input class="input-text" type="text" placeholder="comment">
            <button class="done">Done</button>
          </div>
        </div>
  `;

  daysContainer.insertAdjacentHTML("beforeend", newDayHTML);
}

function changeActiveHabit(event) {
  if (
    event.target.classList.contains("habbit-img") ||
    event.target.classList.contains("habbit-button")
  ) {
    activeHabitId = +event.target.closest(".habbit-button").dataset.id;

    document
      .querySelectorAll(".habbit-button")
      .forEach((item) =>
        item.closest(".habbit-button").classList.remove("habbit-button-active")
      );
    event.target
      .closest(".habbit-button")
      .classList.add("habbit-button-active");

    showHabitDetails(activeHabitId);
  }
}
