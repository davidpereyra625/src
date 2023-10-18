const contenedor = document.getElementById("container-row");
const btnCrear = document.getElementById("btn-new");
const btnCrearMaterial = document.getElementById("btn-material");
const myModal = new bootstrap.Modal(document.getElementById("myModal"));
const myModalMateriales = new bootstrap.Modal(
  document.getElementById("myModalMateriales")
);

const btnSave = document.getElementById("btn-save");
const btnSaveMateriales = document.getElementById("btn-save-Materiales");

const form = document.getElementById("formulario");
const forMateriales = document.getElementById("formularioMateriales");

// let html = "";
let option = "";
let idForm = "";

const inputMovil = document.getElementById("inputMovil");
const inputMateriales = document.getElementById("inputMateriales");
const inputCantidad = document.getElementById("inputCantidad");
const fecha_ingreso = document.getElementById("fechas_ingresos");
const inputMateriales1 = document.getElementById("inputMateriales1");
const codMateriales = document.getElementById("codMateriales");

btnCrear.addEventListener("click", () => {
  option = "new";
  btnSave.textContent = "new";
  inputMovil.value = "";
  inputMateriales.value = "";
  inputCantidad.value = "";
  fecha_ingreso.value = "";
  myModal.show();
});

btnCrearMaterial.addEventListener("click", () => {
  console.log("Botón Guardar Materiales clickeado");

  option = "newMaterial";
  btnSaveMateriales.textContent = "nuevo";
  inputMateriales1.value = "";
  codMateriales.value = "";
  myModalMateriales.show();
});

// evento para eliminar
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-delete")) {
    const article = event.target.closest("tr");
    const idArticle = article.querySelector("th").textContent; // ID del artículo

    Swal.fire({
      title: "¿Estás seguro de eliminar?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Si, Eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/api/inventario/${idArticle}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (res.ok) {
              article.remove();
            }
          })
          .catch((err) => {
            console.error(err);
          });
        Swal.fire("Emininado!", "Tu archivo ha sido eliminado.", "success");
      }
    });
  }
});

//Evento para editar
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-edit")) {
    const row = event.target.closest("tr");
    const idArticle = row.querySelector("th").textContent; // ID del artículo
    const fechaIngreso = row.querySelector("td:nth-child(2)").textContent;
    const movil = row.querySelector("td:nth-child(3)").textContent;
    const material = row.querySelector("td:nth-child(4)").textContent;
    const cantidad = row.querySelector("td:nth-child(5)").textContent;

    // Llenar el formulario con los valores
    idForm = idArticle;
    inputMovil.value = movil;
    inputMateriales.value = material; // Esto asume que `inputMateriales` es un campo de selección
    inputCantidad.value = cantidad;
    fecha_ingreso.value = fechaIngreso;
    option = "edit";
    btnSave.textContent = "Editar";
    myModal.show();
  }
});
forMateriales.addEventListener("submit", (event) => {
  // Cambia "form" a "formMateriales"
  event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

  if (option === "newMaterial") {
    const newTaskMateriales = {
      codigo_materiales: codMateriales.value,
      nombre_materiales: inputMateriales1.value,
    };

    console.log(newTaskMateriales);

    fetch("http://localhost:3000/api/materiales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTaskMateriales),
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Se a guardado correctamente",
            showConfirmButton: false,
            timer: 5000,
          });
          myModalMateriales.hide();
          location.reload(); // Esto recargará la página, quítalo si no deseas recargarla
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
});
//evento para agregar Ingresos dentro del form
form.addEventListener("submit", (event) => {
  event.preventDefault();
  // console.log("submit");

  if (option === "new") {
    const newTask = {
      movil: inputMovil.value,
      id_materiales: inputMateriales.value,
      cantidad_ingreso: inputCantidad.value,
      fecha_ingreso: fecha_ingreso.value,
    };

    fetch("http://localhost:3000/api/inventario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your save has been saved",
            showConfirmButton: false,
            timer: 5000,
          });
          myModal.hide();
          location.reload();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  if (option === "edit") {
    const newTask = {
      movil: inputMovil.value,
      id_materiales: inputMateriales.value,
      cantidad_ingreso: inputCantidad.value,
      fecha_ingreso: fecha_ingreso.value,
    };

    fetch(`http://localhost:3000/api/inventario/${idForm}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    }).then((res) => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Editar has been saved",
        showConfirmButton: true,
        timer: 1500,
      });
      if (res.ok) {
        myModal.hide();
        location.reload();
      }
    });
  }
});
