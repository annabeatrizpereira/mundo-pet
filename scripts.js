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
const inputFilterDate = document.getElementById("filter-date");

const today = new Date().toISOString().split("T")[0];
inputFilterDate.value = today;
inputDate.value = today;
inputFilterDate.min = today;
inputDate.min = today;
const appointmentsList = [];

function renderAppointments() {
  // limpa os agendamentos
  morning
    .querySelectorAll(".period-appointments")
    .forEach((item) => item.remove());
  afternoon
    .querySelectorAll(".period-appointments")
    .forEach((item) => item.remove());
  night
    .querySelectorAll(".period-appointments")
    .forEach((item) => item.remove());

  // mostra novamente os textos
  document.querySelector(".morning .no-appointments").style.display = "flex";
  document.querySelector(".afternoon .no-appointments").style.display = "flex";
  document.querySelector(".night .no-appointments").style.display = "flex";

  // ordena pelo horário
  appointmentsList.sort((a, b) => a.hour.localeCompare(b.hour));

  const appointments = inputFilterDate.value
    ? appointmentsList.filter((appointment) => {
        return appointment.date === inputFilterDate.value;
      })
    : appointmentsList;

  appointments.forEach((appointmentData) => {
    const hour = Number(appointmentData.hour.slice(0, 2));

    const periodAppointments = document.createElement("div");
    const appointment = document.createElement("div");
    const div = document.createElement("div");
    const time = document.createElement("p");
    const petName = document.createElement("p");
    const personName = document.createElement("span");
    const slash = document.createElement("span");
    const description = document.createElement("span");
    const remove = document.createElement("a");

    periodAppointments.classList.add("period-appointments");

    appointment.classList.add("appointment");

    time.classList.add("time");
    time.textContent = appointmentData.hour;

    petName.classList.add("pet-name");
    petName.textContent = appointmentData.pet;

    personName.classList.add("person-name");
    personName.textContent = appointmentData.tutor;

    slash.textContent = "/";

    description.classList.add("description");
    description.textContent = appointmentData.description;

    remove.textContent = "Remover agendamento";

    remove.addEventListener("click", () => {
      const index = appointmentsList.findIndex((item) => {
        return (
          item.tutor === appointmentData.tutor &&
          item.pet === appointmentData.pet &&
          item.date === appointmentData.date &&
          item.hour === appointmentData.hour
        );
      });

      if (index !== -1) {
        appointmentsList.splice(index, 1);

        localStorage.setItem("appointments", JSON.stringify(appointmentsList));
      }

      inputFilterDate.value = inputDate.value;

      renderAppointments();
    });

    div.append(time, petName, slash, personName);
    appointment.append(div, description, remove);
    periodAppointments.append(appointment);

    if (hour >= 9 && hour <= 12) {
      morning.append(periodAppointments);
      document.querySelector(".morning .no-appointments").style.display =
        "none";
    } else if (hour <= 18) {
      afternoon.append(periodAppointments);
      document.querySelector(".afternoon .no-appointments").style.display =
        "none";
    } else {
      night.append(periodAppointments);
      document.querySelector(".night .no-appointments").style.display = "none";
    }
  });
}

const savedAppointments = JSON.parse(localStorage.getItem("appointments"));

if (savedAppointments) {
  appointmentsList.push(...savedAppointments);
  renderAppointments();
}

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

  localStorage.setItem("appointments", JSON.stringify(appointmentsList));

  renderAppointments();
  closeModal();
});

// abrindo modal
btnOpenModal.addEventListener("click", () => {
  openModal();
});

// fechando modal
btnCloseModal.addEventListener("click", () => {
  inputFilterDate.addEventListener("change", () => {
    renderAppointments();
  });
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
