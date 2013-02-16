(function( $ ){

	var validarCedula;

	var methods = {
		Cedula : function( options ) { 
		  console.log(this.val());
		},
		RNC : function( options ) {
		  console.log(this.val());
		}
	};

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

		// Validar el listado

		// Validar el algoritmo

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