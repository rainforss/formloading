    const yesButton = document.querySelector("#yes");
    const noButton = document.querySelector("#no");
    const yesForm = document.getElementById("yes-form");
    const noForm = document.getElementById("no-form");
    const subscribersHeading = document.getElementById("supporter-count");
    const pledgeTitle = document.getElementById("pledge-form-title");
    const pledgeChoice = document.getElementById("pledge-choice");
    const requestURL =
      "https://prod-15.canadacentral.logic.azure.com:443/workflows/81250a9e4c2045579821849937411401/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=3qXIYmIUdrf9x6YPL6CR8ACqcoYTneXUuOKrJiTl7tY";
    const showForm = function (e) {
        console.log("fired");
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

    //Used IIFE to avoid conflicts of variables
    (function () {
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
          console.log("fired");
        formsWrapper = document.querySelector("#test-package");
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
    })();
    MsCrmMkt.MsCrmFormLoader.on("afterFormSubmit", function (event) {
      pledgeChoice.remove();
      pledgeTitle.remove();
      yesForm.remove();
      noForm.remove();
    });
