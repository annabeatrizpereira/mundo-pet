const btnCloseModal = document.getElementById("close-modal")
const btnOpenModal = document.getElementById("open-modal")
const main = document.querySelector("main")
const footer = document.querySelector("footer")
const modal = document.getElementById("modal")

// abrindo modal
btnOpenModal.addEventListener("click", () => {
    main.classList.add("blur")
    footer.classList.add("blur")
    modal.classList.remove("hidden")
})

// fechando modal
btnCloseModal.addEventListener("click", () => {
    main.classList.remove("blur")
    footer.classList.remove("blur")
    modal.classList.add("hidden")
})

