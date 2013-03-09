/*jslint browser: true*/
/*global $, jQuery*/

(function ($) {
    var validarCedula,
        soloNumeros = function (e) {
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
        },

        antiPaste = function (e) {
            var valor,
                valorAnterior = $(e.currentTarget).val();

            return setTimeout(function () {
                valor = $(e.currentTarget).val();
                if (!/^\d+$/.test(valor)) {
                    $(e.currentTarget).val(valorAnterior);
                }
            });
        },

        methods = {
            cedula: function (options) {
                this.on('keypress', soloNumeros);
                this.on('keypress', formatCedula);
                this.on('paste', antiPaste);
                return this;
            },
            rnc: function (options) {
                this.on('keypress', soloNumeros);
                //this.on('keypress', formatCedula);
                this.on('paste', antiPaste);
                return this;
            },
            nss: function (options) {
                this.on('keypress', soloNumeros);
                //this.on('keypress', formatCedula);
                this.on('paste', antiPaste);
                return this;
            }
        },

        // Estas cedulas fueron emitidas por la JCE, pero no cumplen con el 
        //digito verificador, por lo cual deben ser verificadas por separado.
        excepcionesCedulas = ['00000000018', '11111111123', '00100759932', '00105606543',
            '00114272360', '00200123640', '00200409772', '00800106971', '01200004166',
            '01400074875', '01400000282', '03103749672', '03200066940', '03800032522',
            '03900192284', '04900026260', '05900072869', '07700009346', '00114532330',
            '03121982479', '40200700675', '40200639953', '00121581750', '00119161853',
            '22321581834', '00121581800', '09421581768', '22721581818', '90001200901',
            '00301200901', '40200452735', '40200401324', '10621581792'];

    //------------------------//
    // Definición del plugin //

    if (!$.SDQ) {
        $.SDQ = {};
    }

    $.fn.SDQ = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        $.error('Method ' + method + ' does not exist on jQuery.SDQ');
    };

    //------------------------------//
    // Métodos privados del plugin //

    function validarMod10(datos) {
        var calc, i,
            checksum = 0, // running checksum total
            mychar = "", // proximo char 
            j = 1; // toma el valor 1 o 2

        // Procesa cada digito comenzando por la derecha
        for (i = datos.length - 1; i >= 0; i -= 1) {
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
            if (j === 1) {
                j = 2;
            } else {
                j = 1;
            }
        }
        // Listo - si el checksum es divisible por 10, es un modulo 10 valido
        // Si no, reporta error.
        return (checksum % 10 === 0);
    }

    function validarModRNC(datos) {
        var i, digito, resto,
            suma = 0,

            //Peso de cada uno de los elementos del rnc. Es parecido al algoritmo 
            //del Mod10 pero el RNC utiliza su propio sistema de peso.
            pesoRNC = [7, 9, 8, 6, 5, 4, 3, 2];

        //Convierte el string que contiene el rnc en un arreglo de enteros.
        datos = datos.split("").map(function (t) { return parseInt(t, 10); });

        for (i = pesoRNC.length - 1; i >= 0; i -= 1) {
            suma = suma + (pesoRNC[i] * datos[i]);
        }

        resto = suma % 11;

        switch (resto) {
        case 0:
            digito = 2;
            break;
        case 1:
            digito = 1;
            break;
        default:
            digito = 11 - resto;
        }

        // Validar el resultado con el digito validador, 
        //que en caso del RNC es el ultimo digito.
        return (digito === datos.slice(-1)[0]);
    }

    formatCedula = function (e) {
        var entrada, valorCampo, longitudCampo, longitudPermitida;

        longitudPermitida = 11;

        entrada = String.fromCharCode(e.which);
        if (!/^\d+$/.test(entrada)) {
            return false;
        }

        valorCampo = $(e.currentTarget).val();

        longitudCampo = (valorCampo.replace(/\D/g, '') + entrada).length;

        return !(longitudCampo > longitudPermitida);


        // TODO: Falta mucho aqui aun!!!!....

    };



    //------------------------------//
    // Métodos publicos del plugin //

    /**
	 * Valida un dato como cédula de identidad y electoral.
	 *
	 * @param {string} <datos> El dato a validar.
	 * @return {boolean} `true` si el datos es una cédula de identidad 
     * y electoral válida, de lo contrario `false`.
	 */
    $.SDQ.validarCedula = function (datos) {

        // Validar longitud
        if (datos.length !== 11) {
            return false;
        }

        // Validar que solo sean numeros
        if (!/^\d+$/.test(datos)) {
            return false;
        }

        // Validar el listado
        if (jQuery.inArray(datos, excepcionesCedulas) > -1) {
            return true;
        }

        // Validar el algoritmo (LUHN)
        return validarMod10(datos);

    };

    $.SDQ.validarRNC = function (datos) {

        // Validar longitud, debe ser de 9 caracteres.
        if ((datos.length !== 9)) {
            return false;
        }

        // Validar que solo sean numeros
        if (!/^\d+$/.test(datos)) {
            return false;
        }

        // TODO: Verificar si existe un listado que no cumpla con el algoritmo

        // Validar el algoritmo de la DGII
        return validarModRNC(datos);

    };

    $.SDQ.validarNSS = function (datos) {

        // Validar longitud
        if (datos.length !== 9) {
            return false;
        }

        // Validar que solo sean numeros
        if (!/^\d+$/.test(datos)) {
            return false;
        }

        // TODO: Validar el listado

        // TODO: Validar el algoritmo

        // Retornar el resultado
        return true;

    };

}(jQuery));