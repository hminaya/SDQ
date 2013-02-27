# jQuery.SDQ

###Esta libreria aun se encuentra en BETA, cualquier error que encuentre puede reportarlo en https://github.com/hminaya/SDQ/issues.

Es un plugin de jQuery para validar diversos tipos de documentos y darle formato a los campos de entradas.

Por ejemplo, puedes darle el formato debido a un campo haciendo lo siguiente:

``` javascript
$("#CampoCedula").SDQ('cedula');
```

y luego, cuando vas a someter tu formulario puedes proceder a hacer tus validaciones de la siguiente manera:

``` javascript
var entrada = $("#CampoCedula").val();

if (!$.SDQ.validarCedula(entrada)) {
	alert ('El numero de cedula es invalido');
	return false;
}
```

Los tipos de documentos que se manejan son:
* Cedula de identidad y electoral - JCE
* Registro Nacional de Contribuyente (RNC) - DGII {pendiente}
* Numero de Seguridad Social (NSS) - TSS {pendiente}

##¿Como incluirlo en su proyecto?

####Opción #1
Puedes bajar la ultima versión de esta libreria, disponible en https://raw.github.com/hminaya/SDQ/master/lib/jquery.sdq.js e incluirlo junto con sus otros scripts.

####Opción #2
Puedes hacer referencia directamente a la ultima versión de la libreria, hosteada en github:

``` html
<script src="https://raw.github.com/hminaya/SDQ/master/lib/jquery.sdq.js"></script>
```

##API

(pendiente)