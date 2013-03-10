(function( $ ){

	var validarCedula;

	var methods = {
		cedula : function( options ) { 
			this.on('keypress', soloNumeros);
			this.on('keypress', formatCedula);
			this.on('paste', antiPaste);
			return this;

		},
		rnc : function( options ) {
		  	this.on('keypress', soloNumeros);
			//this.on('keypress', formatCedula);
			this.on('paste', antiPaste);
			return this;		},
		nss : function( options ) {
		  	this.on('keypress', soloNumeros);
			//this.on('keypress', formatCedula);
			this.on('paste', antiPaste);
			return this;		}
	};

	// Las cedulas estan en el archivo jquery.sdq-cedulas.js que luego se junta al compilarlo
	// Se agrego esta validacion para poder trabajar con el fuente y no tener que usar el /lib/
	// para las pruebas y desarrollo
	if (!cedulasLocas) {
		var cedulasLocas = ['00000000018','11111111123'];
	};

	//------------------------//
	// Definición del plugin //

	if (!$.SDQ) {
		$.SDQ = {};	
	};

	$.fn.SDQ = function( method ) {

		if ( methods[method] ) {
		  return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
		  return methods.init.apply( this, arguments );
		} else {
		  $.error( 'Method ' +  method + ' does not exist on jQuery.SDQ' );
		}

	};


	//------------------------------//
	// Métodos privados del plugin //

	function validarMod10(datos) {
		var checksum = 0; // running checksum total
		var mychar = ""; // proximo char 
		var j = 1; // toma el valor 1 o 2

		// Procesa cada digito comenzando por la derecha
		var calc;
		for (i = datos.length - 1; i >= 0; i--) {
			// Extrae el siguiente digito y multiplica por 1 o 2 en digitos alternativos
			calc = Number(datos.charAt(i)) * j;
			// Si el resultado es de 2 digitos agrega 1 al checksum total
			if (calc > 9) {
				checksum = checksum + 1;
				calc = calc - 10;
			}
			// Agrega los elmentos unitarios al checksum total
			checksum = checksum + calc;
			// Cambia el valor de j
			if (j == 1) {
				j = 2
			} else {
				j = 1
			};
		}
		// Listo - si el checksum es divisible por 10, es un modulo 10 valido
		// Si no, reporta error.
		return (checksum % 10 == 0);
	}

	formatCedula = function(e){
		var entrada, valorCampo, longitudCampo, longitudPermitida, $target;

		$target = $(e.currentTarget);

		longitudPermitida = 11;

		cedulaPatron = /(^\d{3}$)|(^\d{3} \d{7}$)/;

		entrada = String.fromCharCode(e.which);

		if (!/^\d+$/.test(entrada)) {
			return false;
		}

		valorCampo = $target.val();

		longitudCampo = (valorCampo.replace(/\D/g, '') + entrada).length;

		if (longitudCampo > longitudPermitida) {
			return false;
		};
		if (cedulaPatron.test(valorCampo)){
			e.preventDefault();
			return $target.val(valorCampo + ' ' + entrada);;
		} else if (cedulaPatron.test(valorCampo + entrada)) {
			e.preventDefault();
			return $target.val(valorCampo + entrada + ' ');
		}
		return true;

	};

	antiPaste = function(e){

		valorAnterior = $(e.currentTarget).val();
	    
		return setTimeout(function(){
			valor = $(e.currentTarget).val();

			if (!/^\d+$/.test(valor)) {
	  			$(e.currentTarget).val(valorAnterior);
			}

		});
	    
	};

	soloNumeros = function(e) {
	    var input;
	    if (e.metaKey || e.ctrlKey) {
	      return true;
	    }
	    if (e.which === 32) {
	      return false;
	    }
	    if (e.which === 0) {
	      return true;
	    }
	    if (e.which < 33) {
	      return true;
	    }
	    input = String.fromCharCode(e.which);
	    return !!/[\d\s]/.test(input);
  	};

	//------------------------------//
	// Métodos publicos del plugin //

	/**
	 * Valida un dato como cédula de identidad y electoral.
	 *
	 * @param {string} <datos> El dato a validar.
	 *
	 * @return {boolean} `true` si el datos es una cédula de identidad y electoral válida, de lo contrario `false`.
	 */
	$.SDQ.validarCedula = function( datos ) {

		// Validar longitud
		if (datos.length != 11) {
			return false
		};

		// Validar que solo sean numeros
		if (!/^\d+$/.test(datos)) {
			return false;
		}

		// Validar el listado
		if (cedulasLocas.hasOwnProperty(datos)) {
			return true;
		}

		// Validar el algoritmo (LUHN)
		return validarMod10(datos);

	};

	$.SDQ.validarRNC = function( datos ) {

		// Validar longitud, debe ser de 9 caracteres.
		if ( (datos.length != 9)){
			return false
		};

		// Validar que solo sean numeros
		if (!/^\d+$/.test(datos)) {
			return false;
		}

		var suma = 0;

		var digito;

		var pesoRNC = [7,9,8,6,5,4,3,2]; //Peso de cada uno de los elementos del rnc. Es parecido al algoritmo del Mod10 pero el RNC utiliza su propio sistema de peso.

		datos = datos.split("").map(function(t){return parseInt(t)}); //Convierte el string que contiene el rnc en un arreglo de enteros.

		for (var i = pesoRNC.length - 1; i >= 0; i--) {
			suma = suma + (pesoRNC[i] * datos[i]);
		};

		resto = suma % 11;

		switch(resto){
			case 0:
				digito = 2;
			case 1:
				digito = 1;
			default:
				digito = 11 - resto;
		}

		// Validar el resultado con el digito validador, que en caso del RNC es el ultimo digito.
		if (digito == datos.slice(-1)[0]){
			return true;
		} else {
			return false;
		}



		// TODO: Validar el listado

		// TODO: Validar el algoritmo (LUHN)

		// Retornar el resultado
		return true;

	};

	$.SDQ.validarNSS = function( datos ) {

		// Validar longitud
		if (datos.length != 9){
			return false
		};

		// Validar que solo sean numeros
		if (!/^\d+$/.test(datos)) {
			return false;
		}

		// TODO: Validar el listado

		// TODO: Validar el algoritmo

		// Retornar el resultado
		return true;

	};

})( jQuery );