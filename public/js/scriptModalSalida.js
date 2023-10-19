const btnCrearSalida = document.getElementById("btn-new-salida");
const myModalSalida = new bootstrap.Modal(
  document.getElementById("myModalSalida")
);
const formularioSalida = document.getElementById("formularioSalida");

const inputMovilSalida = document.getElementById("inputMovilSalida");
const inputMaterialesSalida = document.getElementById("inputMaterialesSalida");
const inputProvinciasSalida = document.getElementById("inputProvinciasSalida");
const inputCantidadSalida = document.getElementById("inputCantidadSalida");
const fechas_salida = document.getElementById("fechas_salida");

const btnSaveSalida = document.getElementById("btn-save-salida");

let option1 = "";
let idForm1 = "";

btnCrearSalida.addEventListener("click", () => {
  option1 = "nuevo";
  btnSaveSalida.textContent = "Guardar";

  inputMovilSalida.value = "";
  inputMaterialesSalida.value = "";
  inputProvinciasSalida.value = "";
  inputCantidadSalida.value = "";
  fechas_salida.value = "";

  myModalSalida.show();
});

// Evento para eliminar
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-delete-Salidas")) {
    const row = event.target.closest("tr");
    const idSalida = row.querySelector("th").textContent; // ID de la salida

    Swal.fire({
      title: "¿Estás seguro de eliminar?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/api/salidas/${idSalida}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (res.ok) {
              row.remove(); // Elimina la fila de la tabla
            }
          })
          .catch((err) => {
            console.error(err);
          });

        Swal.fire("¡Eliminado!", "La salida ha sido eliminada.", "success");
      }
    });
  }
});

// Evento para editar
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-edit-Salidas")) {
    const row = event.target.closest("tr");
    const idSalida = row.querySelector("th").textContent; // ID de la salida
    const fechaSalida = row.querySelector("td:nth-child(2)").textContent;
    const movil = row.querySelector("td:nth-child(3)").textContent;
    const material = row.querySelector("td:nth-child(4)").textContent;
    const cantidad = row.querySelector("td:nth-child(6)").textContent;
    const provincia = row.querySelector("td:nth-child(5)").textContent; // Obtén la provincia
    console.log(row);

    console.log(fechaSalida);
    console.log(movil);
    console.log(material);
    console.log(cantidad);
    console.log(provincia);

    // Llenar el formulario con los valores
    idForm1 = idSalida;
    inputMovilSalida.value = movil;
    inputMaterialesSalida.value = material; // Esto asume que `inputMaterialesSalida` es un campo de selección
    inputCantidadSalida.value = cantidad;
    fechas_salida.value = fechaSalida;

    // Ahora, debes seleccionar la provincia correcta en el campo de selección
    // Esto depende de cómo tienes tus opciones de provincia en tu formulario

    // Supongamos que `provincia` contiene el valor de la provincia asociada a la salida
    // y que el valor del campo de selección de provincias es el ID de la provincia
    inputProvinciasSalida.value = provincia; // Asigna el valor de la provincia al campo de selección

    option1 = "editar";
    btnSaveSalida.textContent = "Editar";

    myModalSalida.show();
  }
});

formularioSalida.addEventListener("submit", (event) => {
  event.preventDefault();

  if (option1 === "nuevo") {
    const nuevaSalida = {
      movil: inputMovilSalida.value,
      id_materiales: inputMaterialesSalida.value,
      id_provincias: inputProvinciasSalida.value,
      cantidad_salida: inputCantidadSalida.value,
      fecha_salida: fechas_salida.value,
    };

    fetch("http://localhost:3000/api/salidas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaSalida),
    })
      .then((res) => {
        if (res.ok) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "La salida ha sido guardada",
            showConfirmButton: false,
            timer: 2000,
          });
          myModalSalida.hide();
          location.reload();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  if (option1 === "editar") {
    const salidaEditada = {
      movil: inputMovilSalida.value,
      id_materiales: inputMaterialesSalida.value,
      id_provincias: inputProvinciasSalida.value,
      cantidad_salida: inputCantidadSalida.value,
      fecha_salida: fechas_salida.value,
    };

    fetch(`http://localhost:3000/api/salidas/${idForm1}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(salidaEditada),
    }).then((res) => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "La salida ha sido editada",
        showConfirmButton: false,
        timer: 2000,
      });
      if (res.ok) {
        myModalSalida.hide();
        location.reload();
      }
    });
  }
});
