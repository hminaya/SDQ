(function( $ ){

	var validarCedula;

	var methods = {
		Cedula : function( options ) { 
		  console.log(this.val());
		},
		RNC : function( options ) {
		  //console.log(this.val());
		}
	};

	// Estas cedulas fueron emitidas por la JCE y no cumplen con el digito verificador
	var cedulasLocas = ['00000000018','11111111123'];

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
		if (jQuery.inArray(datos, cedulasLocas) > -1){
			return true;
		}

		// Validar el algoritmo (LUHN)
		var digitoVerificador = parseInt(datos.substring(datos.length-1, datos.length));
		var digitos = datos.substring(0, datos.length-1);

		var suma = 0;
		for (i=0; i < digitos.length; i++){
			suma += parseInt(digitos.substring(i, i+1));
		}

		var jce = new Array (0,1,2,3,4,-4,-3,-2,-1,0);
		for (i=digitos.length-1; i>0; i-=2){
			var jceIndex = parseInt(digitos.substring(i, i+1));
			var jceValue = jce[jceIndex];
		}

		var modulo10 = suma % 10;
		modulo10 = 10 - modulo10;
		if (modulo10 == 10) {	
			modulo10=0
		};

		if (isNaN(modulo10)) {
			return false;
		};

		if (digitoVerificador != modulo10) {
			return false;
		};

		return true;

	};

	$.SDQ.validarRNC = function( datos ) {

		// Validar longitud
		if ( (datos.length != 9) && (datos.length != 11)  ){
			return false
		};

		// Validar el listado

		// Validar el algoritmo

		return true;

	};


})( jQuery );