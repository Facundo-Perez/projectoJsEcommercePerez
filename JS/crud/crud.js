
let dbProd = localStorage.getItem("dbProd"); //Obtener datos de localStorage
let operacion = "A"; //"A"=agregar; "E"=edtidar
dbProd = JSON.parse(dbProd); // Convertir a objeto
if (dbProd === null) // Si no existe, creamos un array vacio.
    dbProd = [];


function Mensaje(t){
        switch (t) {
            case 1: //
                $(".mensaje-alerta").append(
                    "<div class='alert alert-success' role='alert'>El producto se agrego con exito.</div>"
                );
                break;
            case 2: //
                $(".mensaje-alerta").append(
                    "<div class='alert alert-danger' role='alert'>Se elimino el producto.</div>"
                );
                break;
            default:

        }
    }


function AgregarProd () {
    // Seleccionamos los datos de los inputs de formulario
    let datos_cliente = JSON.stringify({
        Nombre : $("#nombre").val(),
        id : $("#id").val(),
        precio : $("#precio").val(),
        urlImg : $("#urlImg").val(),
    });

    dbProd.push(datos_cliente); // Guardar datos en el array definido globalmente
    localStorage.setItem("dbProd", JSON.stringify(dbProd));
    


    ListarProductos();


    return Mensaje(1);
}



function ListarProductos (){
    $("#dbProd-list").html(
            "<thead>" +
                "<tr>" +
                    "<th> ID </th>" +

                    "<th> Nombre </th>" +
                    "<th> id </th>" +
                    "<th> precio </th>" +
                    "<th> urlImg </th>" +
                    "<th> </th>" +
                    "<th>  </th>" +
                "</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
    );

    for (let i in dbProd) {
        let d = JSON.parse(dbProd[i]);
        $("#dbProd-list").append(
                        "<tr>" +
                            "<td>" + i + "</td>" +
                            "<td>" + d.Nombre + "</td>" +
                            "<td>" + d.id + "</td>" +
                            "<td>" + d.precio + "</td>" +
                            "<td>" + d.urlImg + "</td>" +
                            "<td> <a id='"+ i +"' class='btnEditar' href='#'> <span class='glyphicon glyphicon-pencil'> </span>  </a> </td>" +
                            "<td> <a id='" + i + "' class='btnEliminar' href='#'> <span class='glyphicon glyphicon-trash'> </span> </a> </td>" +
                        "</tr>"
                           );
    }

}


if (dbProd.length !== 0) {
    ListarProductos();
} else {
    $("#dbProd-list").append("<h2> No tienes productos. </h2>");
}

function contarproducts(){
    let products = dbProd;
    nProducts = products.length;

    $("#numeroProd").append(
        "<a>Actualmente hay" + "<br>" + "<span class='badge'>" + nProducts + "</span></a> productos."
    );
    return nProducts;
}

function Eliminar(e){
    dbProd.slice(e, 1); // (posición en el array, numero de items a eliminar)
    localStorage.setItem("dbProd", JSON.stringify(dbProd));
    return Mensaje(2);
}

function Editar() {
    dbProd[indice_selecionado] = JSON.stringify({
        Nombre : $("#nombre").val(),
        id : $("#id").val(),
        precio : $("#precio").val(),
        urlImg : $("#urlImg").val(),
    });
    localStorage.setItem("dbProd", JSON.stringify(dbProd));
    operacion = "A"; //Regresamos  valor original
    return true;

}

$(".btnEliminar").bind("click", function(){
    alert(" Quieres eliminar el producto ?");
    indice_selecionado = $(this).attr("id"); // "this" contiene el elemento clikeado en el contexto actual
    console.log(indice_selecionado);
    console.log(this);
    Eliminar(indice_selecionado); // Eliminamos el elemento llamando la funcion de eliminar
    ListarProductos();
});

$(".btnEditar").bind("click", function() {
    alert("¿ Editar este producto ?");
    $(".modo").html("<span class='glyphicon glyphicon-pencil'> </span> Modo edición");
    operacion = "E";
    indice_selecionado = $(this).attr("id");
    console.log(indice_selecionado);
    console.log(this);
    
    let prodItem = JSON.parse(dbProd[indice_selecionado]);
    $("#nombre").val(prodItem.Nombre);
    $("#id").val(prodItem.id);
    $("#precio").val(prodItem.precio);
    $("#urlImg").val(prodItem.urlImg);
    $("#nombre").focus();
});


contarproducts();
$("#products-form").bind("submit", function() {
    debugger;
    if (operacion == "A")
        return AgregarProd();
    else {
        return Editar();
    }
});
