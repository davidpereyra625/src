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
document.addEventListener("click", async (event) => {
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(
            `http://localhost:3000/api/salidas/${idSalida}`,
            {
              method: "DELETE",
            }
          );

          if (res.ok) {
            row.remove(); // Elimina la fila de la tabla
            Swal.fire("¡Eliminado!", "La salida ha sido eliminada.", "success");
          }
        } catch (err) {
          console.error(err);
        }
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
    const provincia = row.querySelector("td:nth-child(5)").textContent;

    idForm1 = idSalida;
    inputMovilSalida.value = movil;
    inputMaterialesSalida.value = material;
    inputCantidadSalida.value = cantidad;
    fechas_salida.value = fechaSalida;

    inputProvinciasSalida.value = provincia;

    option1 = "editar";
    btnSaveSalida.textContent = "Editar";

    myModalSalida.show();
  }
});

formularioSalida.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Obtiene los valores del formulario
  const materialId = document.getElementById("inputMaterialesSalida").value;
  const cantidadSalida = parseInt(
    document.getElementById("inputCantidadSalida").value
  );

  // Realiza una solicitud GET para obtener la cantidad disponible
  const response = await fetch(`/api/cantidadDisponible/${materialId}`);
  const data = await response.json();
  const cantidadDisponible = data.cantidadDisponible;

  // Compara la cantidad ingresada con la disponible
  if (cantidadSalida > cantidadDisponible) {
    alert("No hay suficiente stock para la cantidad ingresada.");
  } else {
    btnSaveSalida.textContent = "Guardando..."; // Cambia el texto del botón mientras se guarda
    btnSaveSalida.disabled = true; // Deshabilita el botón

    // En este punto, puedes manejar los casos "nuevo" y "editar" por separado
    if (option1 === "nuevo") {
      // Continúa con la creación de la salida.
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
      // Continúa con la edición de la salida.
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
  }
});
