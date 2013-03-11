# jQuery.SDQ

Es un plugin de jQuery Open Source para validar diversos tipos de documentos y darle formato a los campos de entradas.

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
* Registro Nacional de Contribuyente (RNC) - DGII {acaba de ser agregado - beta}
* Numero de comprobante fiscal (NCF) - DGII {acaba de ser agregado - beta}
* Numero de Seguridad Social (NSS) - TSS {pendiente}

##¿Como incluirlo en su proyecto?

Puedes bajar la ultima versión de esta libreria, disponible en https://raw.github.com/hminaya/SDQ/master/lib/jquery.sdq.js e incluirlo junto con sus otros scripts. Recuerda que debes tener incluido jQuery para poder utilizar esta libreria.


##API - Cedula

### $.fn.SDQ('cedula');
Le da formato a un campo para introducir una cedula:
* Solo permite que se puedan introducir numeros
* Maneja el paste para evitar chars invalidos
* Solo permite longitud de 11

Ejemplo:

``` javascript
$('#campoCedula').SDQ('cedula');
```

### $.SDQ.validarCedula(numero);
Valida si la información recibida corresponde a un numero de cedula:
* Compara contra el algoritmo de LUHN utilizando mod 10
* Maneja un listado de cedulas que fueron emitidas por la JCE, pero que no cumplen con el algoritmo anterior
* Solo puede contener numeros
* Valida la longitud

Ejemplo:

``` javascript
$.SDQ.validarCedula('00113918315'); // => False
```

##API - RNC

### $.fn.SDQ('rnc');
Le da formato a un campo para introducir un RNC:
* Solo permite que se puedan introducir numeros
* Maneja el paste para evitar chars invalidos
* Solo permite longitud de 9

Ejemplo:

``` javascript
$('#campoRNC').SDQ('rnc');
```

### $.SDQ.validarRNC(numero);
Valida si la información recibida corresponde a un RNC:
* Compara contra el algoritmo
* Maneja un listado de RNCs que fueron emitidos por la DGII, pero que no cumplen con el algoritmo anterior //TODO: Pendiente
* Solo puede contener numeros
* Valida la longitud

Ejemplo:

``` javascript
$.SDQ.validarRNC('A234567XX'); // => False
```

##API - NCF

### $.fn.SDQ('ncf');
Le da formato a un campo para introducir un NCF:
* Permite la entrada de datos de acuerdo a la estructura de un NCF (pendiente)
* Maneja el paste para evitar chars invalidos
* Controla la longitud (pendiente)

Ejemplo:

``` javascript
$('#campoNCF').SDQ('ncf');
```

### $.SDQ.validarNCF(numero);
Valida si la información recibida corresponde a un NCF:
* Compara contra el algoritmo (pendiente)
* Solo puede contener numeros y letras de acuerdo a las especificaciones
* Valida la longitud

Ejemplo:

``` javascript
$.SDQ.validarNCF('A999999999999999999'); // => False
```

##API - NSS

### $.fn.SDQ('nss');
Le da formato a un campo para introducir un NSS:
* Solo permite que se puedan introducir numeros
* Maneja el paste para evitar chars invalidos
* Solo permite longitud de XX //TODO: Pendiente

Ejemplo:

``` javascript
$('#campoNSS').SDQ('nss');
```

### $.SDQ.validarNSS(numero);
Valida si la información recibida corresponde a un NSS:
* Compara contra el algoritmo XX // TODO: Pendiente
* Maneja un listado de NSS que fueron emitidos por la TSS, pero que no cumplen con el algoritmo anterior //TODO: Pendiente
* Solo puede contener numeros
* Valida la longitud //TODO: Pendiente

Ejemplo:

``` javascript
$.SDQ.validarNSS('A234567XX'); // => False
```

##¿Como contribuir?
Si quieres contribuir en este proyecto puedes comenzar con uno de los [issues pendientes](https://github.com/hminaya/SDQ/issues?state=open) o puedes proponer tus propias ideas. Antes de hacer tu pull request pasa tu codigo por JSLint.

Actualmente [estamos trabajando](https://github.com/hminaya/SDQ/contributors) en este proyecto:
* @hminaya
* @amhed
* @lurraca
* @rmariuzzo
* @jfsanchez2k

