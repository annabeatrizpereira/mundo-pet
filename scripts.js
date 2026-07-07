/* selecionando itens */
const main = document.querySelector("main");
const footer = document.querySelector("footer");
const morning = document.querySelector(".morning");
const afternoon = document.querySelector(".afternoon");
const night = document.querySelector(".night");
/* modal */
const btnOpenModal = document.getElementById("open-modal");
const btnCloseModal = document.getElementById("close-modal");
const modal = document.getElementById("modal");
/* form */
const form = document.querySelector("form");
const inputTutor = document.getElementById("tutor-name");
const inputPet = document.getElementById("pet-name");
const textarea = document.getElementById("description");
const inputDate = document.getElementById("date");
const inputHour = document.getElementById("hour");

const appointmentsList = [];

// adicionando um novo atendimento
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // validando os inputs
  if (inputTutor.value.length < 1) {
    alert("Por favor, preencha o nome do tutor!");
    return;
  } else if (inputPet.value.length < 1) {
    alert("Por favor, preencha o nome do pet!");
    return;
  } else if (textarea.value.length < 1) {
    alert("Por favor, coloque a descrição do serviço!");
    return;
  } else if (inputDate.value.length < 1) {
    alert("Por favor, informe uma data para agendar!");
    return;
  } else if (inputHour.value.length < 1) {
    alert("Por favor, informe uma hora para agendar!");
    return;
  }

  // bloqueando horario fora do funcionamento
  let hour = Number(inputHour.value.slice(0, 2));
  if (hour < 9 || hour >= 21) {
    alert("Não é possível agendar fora do horário de funcionamento.");
    return;
  }

  // bloqueando horários já agendados
  const exists = appointmentsList.some((appointment) => {
    return (
      appointment.hour == inputHour.value && appointment.date == inputDate.value
    );
  });

  if (exists) {
    alert("Já existe um agendamento para essa data e horário.");
    return;
  }

  // adicionando dados em um objeto
  appointmentsList.push({
    tutor: inputTutor.value,
    pet: inputPet.value,
    description: textarea.value,
    date: inputDate.value,
    hour: inputHour.value,
  });

  // criando agendamento com os dados
  const periodAppointments = document.createElement("div");
  const appointment = document.createElement("div");
  const div = document.createElement("div");
  const time = document.createElement("p");
  const petName = document.createElement("p");
  const personName = document.createElement("span");
  const span = document.createElement("span");
  const description = document.createElement("span");
  const a = document.createElement("a");

  // adicionando classes e conteúdos
  periodAppointments.classList.add("period-appointments");

  appointment.classList.add("appointment");

  time.classList.add("time");
  time.textContent = inputHour.value;

  petName.classList.add("pet-name");
  petName.textContent = inputPet.value;

  span.textContent = "/";

  personName.classList.add("person-name");
  personName.textContent = inputTutor.value;

  description.classList.add("description");
  description.textContent = textarea.value;

  a.textContent = "Remover agendamento";

  div.append(time, petName, span, personName);
  appointment.append(div, description, a);
  periodAppointments.append(appointment);

  // verificando horário
  if (hour >= 9 && hour <= 12) {
    const noAppointments = document.querySelector(".morning .no-appointments");
    morning.append(periodAppointments);
    noAppointments.style.display = "none";
  } else if (hour <= 18) {
    const noAppointments = document.querySelector(
      ".afternoon .no-appointments",
    );

    afternoon.append(periodAppointments);

    noAppointments.style.display = "none";
  } else if (hour < 21) {
    const noAppointments = document.querySelector(".night .no-appointments");

    night.append(periodAppointments);

    noAppointments.style.display = "none";
  }

  // fechando modal
  closeModal();
});

// abrindo modal
btnOpenModal.addEventListener("click", () => {
  openModal();
});

// fechando modal
btnCloseModal.addEventListener("click", () => {
  closeModal();
});

// funções
function closeModal() {
  main.classList.remove("blur");
  main.classList.remove("overflow-hidden");
  footer.classList.remove("blur");

  form.reset();

  modal.classList.add("hidden");
}

function openModal() {
  main.classList.add("blur");
  main.classList.add("overflow-hidden");
  footer.classList.add("blur");
  modal.classList.remove("hidden");
  inputTutor.focus();
}
