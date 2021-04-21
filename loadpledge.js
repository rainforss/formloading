const yesButton = document.querySelector("#yes");
const noButton = document.querySelector("#no");
const yesForm = document.getElementById("yes-form");
const noForm = document.getElementById("no-form");
const subscribersHeading = document.getElementById("supporter-count");
const pledgeTitle = document.getElementById("pledge-form-title");
const pledgeChoice = document.getElementById("pledge-choice");
const showForm = function (e) {
  yesButton.classList.add("hidden");
  noButton.classList.add("hidden");
  if (e.target.id === "yes") {
    noForm.remove();

    yesForm.classList.add("shown");
  } else {
    yesForm.remove();
    noForm.classList.add("shown");
  }
};
yesButton.addEventListener("click", showForm);
noButton.addEventListener("click", showForm);

let modal = document.getElementById("prompt-modal");
let modalButton = modal.querySelector("#modal-join");
modalButton.addEventListener("click", checkAndClose);
let checkboxClicked = false;
let checkboxTarget;
let formsWrapper;

function checkboxPrompt(e) {
  checkboxClicked = true;
  checkboxTarget = e.target;
}

MsCrmMkt.MsCrmFormLoader.on("formSubmit", function (event) {
  console.log(event.formPageId);
  formsWrapper = document.querySelector(
    `div[data-block-id="${event.formPageId}"]`
  );
  if (!checkboxClicked && !checkboxTarget) {
    event.preventDefault();
    openModal();
  }
});

function openModal() {
  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
}

function checkAndClose() {
  checkboxTarget = formsWrapper.querySelector(
    `#be63b8b8-4f20-eb11-a813-000d3af3d354`
  );
  checkboxTarget.checked = true;
  closeModal();
}

window.onclick = function (event) {
  if (event.target == modal) {
    checkboxClicked = true;
    closeModal();
  }
};

MsCrmMkt.MsCrmFormLoader.on("afterFormSubmit", function (event) {
  pledgeChoice.remove();
  pledgeTitle.remove();
  yesForm.remove();
  noForm.remove();
});
