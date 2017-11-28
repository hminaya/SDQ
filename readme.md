# jQuery.SDQ

Es una extensión de jQuery Open Source para validar diversos tipos de documentos y darle formato a los campos de entradas.

Por ejemplo, puedes darle el formato debido a un campo haciendo lo siguiente:

``` javascript
var cedula = $("#CampoCedula").SDQ('cedula');
```

y luego, cuando vas a someter el formulario puedes validarlo de la siguiente manera:

``` javascript
if (!cedula.validar()) {
	alert ('El numero de cédula es inválido ');
	return false;
}
```

Los tipos de documentos que se manejan son:
* Cédula de identidad y electoral - JCE
* Registro Nacional de Contribuyente (RNC) - DGII (beta)
* Número de Comprobante Fiscal (NCF) - DGII (beta)
* Número de Seguridad Social (NSS) - TSS (pendiente)

## ¿Cómo  incluirlo en su proyecto?

Puedes bajar la última versión de esta librería, disponible [aquí](https://raw.github.com/hminaya/SDQ/master/lib/jquery.sdq.js) e incluirlo junto con sus otros scripts. Recuerda que debes tener incluido jQuery para poder utilizar esta librería.

## API - Cédula

### $.fn.SDQ('cedula');
Le da formato a un campo para introducir una cédula:
* Solo acepta números.
* Maneja el paste para evitar caracteres inválidos.
* La longitud máxima de caracteres es 11.
Ejemplo:

``` javascript
$('#campoCedula').SDQ('cedula');
```

### $.SDQ.validarCedula(numero);
Valida si la información recibida corresponde a un números de cédula:
* Compara contra el algoritmo de LUHN utilizando mod 10
* Maneja un listado de cédulas que fueron emitidas por la JCE, pero que no cumplen con el algoritmo anterior.
* Solo acepta números.
* Valida la longitud.

Ejemplo:

``` javascript
$.SDQ.validarCedula('00113918315'); // => False
```

### Alternativa
Otra forma de validar un input de cédula es de la siguiente manera:

 ``` javascript
var cedula = $('#campoCedula').SDQ('cedula');
cedula.validar() // => Toma el valor del campo y se la pasa al método $.SDQ.validarCedula()
```

## API - RNC

### $.fn.SDQ('rnc');
Le da formato a un campo para introducir un RNC:
* Solo permite que se puedan introducir números.
* Maneja el paste para evitar caracteres inválidos.
* La longitud máxima de caracteres es 9.

Ejemplo:

``` javascript
$('#campoRNC').SDQ('rnc');
```

### $.SDQ.validarRNC(numero);
Valida si la información recibida corresponde a un RNC:
* Compara contra el algoritmo.
* Maneja un listado de RNCs que fueron emitidos por la DGII, pero que no cumplen con el algoritmo anterior. //TODO: Pendiente
* Solo acepta números.
* Valida la longitud.

Ejemplo:

``` javascript
$.SDQ.validarRNC('A234567XX'); // => False
```

### Alternativa
Otra forma de validar un input de rnc es de la siguiente manera:

 ``` javascript
var rnc = $('#campoRNC').SDQ('rnc');
rnc.validar() // => Toma el valor del campo y se la pasa al método $.SDQ.validarRNC()
```

## API - NCF

### $.fn.SDQ('ncf');
Le da formato a un campo para introducir un NCF:
* Permite la entrada de datos de acuerdo a la estructura de un NCF (pendiente)
* Maneja el paste para evitar caracteres inválidos.
* Controla la longitud. (pendiente)

Ejemplo:

``` javascript
$('#campoNCF').SDQ('ncf');
```

### $.SDQ.validarNCF(numero);
Valida si la información recibida corresponde a un NCF:
* Compara contra el algoritmo (pendiente)
* Solo puede contener números y letras de acuerdo a las especificaciones
* Valida la longitud

Ejemplo:

``` javascript
$.SDQ.validarNCF('A999999999999999999'); // => False
```

### Alternativa
Otra forma de validar un input de NCF es de la siguiente manera:

 ``` javascript
var ncf = $('#campoNCF').SDQ('ncf');
ncf.validar() // => Toma el valor del campo y se la pasa al método $.SDQ.validarNCF()
```

## API - NSS

### $.fn.SDQ('nss');
Le da formato a un campo para introducir un NSS:
* Solo acepta números.
* Maneja el paste para evitar caracteres inválidos.
* Solo permite longitud de XX. //TODO: Pendiente

Ejemplo:

``` javascript
$('#campoNSS').SDQ('nss');
```

### $.SDQ.validarNSS(numero);
Valida si la información recibida corresponde a un NSS:
* Compara contra el algoritmo XX // TODO: Pendiente
* Maneja un listado de NSS que fueron emitidos por la TSS, pero que no cumplen con el algoritmo anterior //TODO: Pendiente
* Solo acepta números.
* Valida la longitud //TODO: Pendiente

Ejemplo:

``` javascript
$.SDQ.validarNSS('A234567XX'); // => False
```

### Alternativa
Otra forma de validar un input de NSS es de la siguiente manera:

 ``` javascript
var nss = $('#campoNSS').SDQ('nss');
nss.validar() // => Toma el valor del campo y se la pasa al método $.SDQ.validarNSS()
```

## ¿Cómo  contribuir?
Si quieres contribuir en este proyecto puedes comenzar con uno de los [issues pendientes](https://github.com/hminaya/SDQ/issues?state=open) o puedes proponer tus propias ideas. Antes de hacer tu pull request pasa tu código por JSLint.

Actualmente [estamos trabajando](https://github.com/hminaya/SDQ/contributors) en este proyecto:
* [@hminaya](https://github.com/hminaya)
* [@amhed](https://github.com/amhed)
* [@lurraca](https://github.com/lurraca)
* [@rmariuzzo](https://github.com/rmariuzzo)
* [@jfsanchez2k](https://github.com/jfsanchez2k)
* [@gpopoteur](https://github.com/gpopoteur)

