$(document).ready(function () {
  var table = $("#example").DataTable({
    dom: "Blfrtip",
    buttons: [
      {
        extend: "excel",
        exportOptions: {
          columns: [0, 1, 2, 3, 4], // Especifica las columnas que deseas exportar
        },
      },
      {
        extend: "csv",
        exportOptions: {
          columns: [0, 1, 2, 3, 4], // Especifica las columnas que deseas exportar
        },
      },
      {
        extend: "pdf",
        exportOptions: {
          columns: [0, 1, 2, 3, 4], // Especifica las columnas que deseas exportar
        },
      },
      {
        extend: "print",
        exportOptions: {
          columns: [0, 1, 2, 3, 4], // Especifica las columnas que deseas imprimir
        },
      },
      "copy",
    ],
    language: {
      url: "//cdn.datatables.net/plug-ins/1.13.6/i18n/es-AR.json",
    },
    autoWidth: false,
    lengthChange: true,
  });

  // Evento de clic en las filas
  $("#example tbody").on("click", "tr", function () {
    if ($(this).hasClass("selected")) {
      $(this).removeClass("selected");
    } else {
      table.$("tr.selected").removeClass("selected");
      $(this).addClass("selected");
    }
  });
});
