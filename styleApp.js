document.addEventListener("DOMContentLoaded", () => {
    const radioButtons = document.querySelectorAll(".input-radio");
    const labels = document.querySelectorAll(".input-label-radio");
  
    radioButtons.forEach((radio, index) => {
      radio.addEventListener("change", function () {
        labels.forEach((label, labelIndex) => {
          if (index === labelIndex) {
            label.classList.remove("disabled");
          } else {
            label.classList.add("disabled");
          }
        });
      });
    });
  });