const modal = document.getElementById("modal-container");

const buttonOpen = document.getElementById("new_transaction");
const buttonClose = document.getElementById("close");

buttonOpen.addEventListener("click", () => {
  modal.classList.add("on");
});

buttonClose.addEventListener("click", () => {
  modal.classList.remove("on");
});
