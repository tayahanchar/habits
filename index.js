let habits = [];
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
  });
}

document
  .querySelector(".habits-list")
  .addEventListener("click", changeActiveHabit);

function showHabitDetails(habitId) {
  const currentHabit = habits.find((habit) => habit.id === habitId);

  document.querySelector(".habit-title").textContent = currentHabit.title;
  document.querySelector(
    ".days-progress"
  ).textContent = `${currentHabit.days.length} of 21 days`;
  document.querySelector("progress").value = currentHabit.days.length;

  const daysContainer = document.querySelector(".habit-bottom");
  daysContainer.innerHTML = "";

  currentHabit.days.forEach((day, index) => {
    const dayHTML = `<div class="habit-inf">
    <p class="habit-day">Day ${index + 1}</p>
    <div class="habit-comment">
      <p>${day}</p>
    </div>
  </div>`;

    daysContainer.insertAdjacentHTML("beforeend", dayHTML);
  });

  if (currentHabit.days.length >= 21) {
    const doneMessage = `
    <h3 class="done-message">Done!!!</h3>
    `;

    document
      .querySelector(".habit-bottom")
      .insertAdjacentHTML("beforeend", doneMessage);
    return;
  }

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

  document.querySelector(".done").addEventListener("click", addNewDay);
}

function addNewDay() {
  const comment = document.querySelector(".input-text").value;

  if (!comment.trim()) return;

  habits.map((habit) => {
    if (habit.id !== activeHabitId) {
      return habit;
    } else {
      habit.days.push(comment);
      return habit;
    }
  });

  localStorage.setItem("habits", JSON.stringify(habits));

  showHabitDetails(activeHabitId);
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

document
  .querySelector(".habbit-add")
  .addEventListener("click", openModalWindow);

document
  .querySelector(".modal-img-list")
  .addEventListener("click", chooseNewHabitImg);

document
  .querySelector(".modal-window-add")
  .addEventListener("click", addNewHabit);

function openModalWindow() {
  document.querySelector(".modal").style.display = "flex";
  document.querySelector(".close").addEventListener("click", closeModalWindow);
}

function chooseNewHabitImg(event) {
  if (event.target.closest(".habbit-button-modal")) {
    document
      .querySelector(".habbit-button-modal-active")
      .classList.remove("habbit-button-modal-active");
    event.target
      .closest(".habbit-button-modal")
      .classList.add("habbit-button-modal-active");
  }
}

function closeModalWindow() {
  document
    .querySelector(".close")
    .removeEventListener("click", closeModalWindow);
  document.querySelector(".modal").style.display = "none";

  document
    .querySelector(".habbit-button-modal-active")
    .classList.remove("habbit-button-modal-active");
  document
    .querySelectorAll(".habbit-button-modal")[0]
    .classList.add("habbit-button-modal-active");

  document.querySelector(".modal-window-input").value = "";
}

function addNewHabit() {
  const img = document.querySelector(".habbit-button-modal-active").dataset.img;
  const title = document.querySelector(".modal-window-input").value;

  if (!title.trim()) return;

  const id = Math.ceil(Math.random() * 10000);

  const newHabitHTML = `<button class="habbit-button" data-id=${id}>
          <img class="habbit-img" src="./images/${img}.svg" alt="habit">
        </button>`;

  const habitsContainer = document.querySelector(".habits-list");
  habitsContainer.insertAdjacentHTML("beforeend", newHabitHTML);

  document.querySelector(".modal-window-input").value = "";

  document
    .querySelector(".habbit-button-modal-active")
    .classList.remove("habbit-button-modal-active");
  document
    .querySelectorAll(".habbit-button-modal")[0]
    .classList.add("habbit-button-modal-active");

  createNewHabit(img, title, id);
  closeModalWindow();
}

function createNewHabit(img, title, id) {
  const habit = {
    id: id,
    img: img,
    title: title,
    days: [],
  };

  habits.push(habit);

  localStorage.setItem("habits", JSON.stringify(habits));
}
