/*jslint browser: true*/
/*global $, jQuery, module, test, ok */

module("validarCedula");

test("La longitud no debe ser menor de 11", function () {
    ok($.SDQ.validarCedula('1234567890') === false, "Passed!");
});

test("La longitud no debe ser mayor de 11", function () {
    ok($.SDQ.validarCedula('123456789111') === false, "Passed!");
});

test("Solo debe contener numeros", function () {
    ok($.SDQ.validarCedula('abcasdqwer-') === false, "Passed!");
});

test("Puede estar dentro de las cedulas que no cumplen con el algoritmo de LUHN", function () {
    ok($.SDQ.validarCedula('00114272360') === true,
        "Probando con la cedula 00114272360, " +
        "la cual esta en el listado de cedulas emitidas que no cumplen con el algoritmo de LUHN");
    ok($.SDQ.validarCedula('00114272368') === false,
        "Probando con la cedula 00114272368, " +
        "la cual NO esta en el listado de cedulas emitidas que no cumplen con el algoritmo de LUHN");
    ok($.SDQ.validarCedula('00105606543') === true,
        "Probando con la cedula 00105606543, " +
        "la cual esta en el listado de cedulas emitidas que no cumplen con el algoritmo de LUHN");
});

test("Debe contener el digito verificador correcto (LUHN)", function () {
    ok($.SDQ.validarCedula('00113918205') === true, "Cedula verdadera!");
    ok($.SDQ.validarCedula('00113918204') === false, "Cedula falsa!");
    ok($.SDQ.validarCedula('00113918213') === true, "Cedula verdadera!");
});

test("Solo deben ser dígitos", function () {
    ok($.SDQ.validarCedula('00113918205') === true, "Passed!");
    ok($.SDQ.validarCedula('0011391820x') === false, "Passed!");
    ok($.SDQ.validarCedula('x0113918205') === false, "Passed!");
    ok($.SDQ.validarCedula('00113x18205') === false, "Passed!");
});


module("validarRNC");

test("La longitud no debe ser menor de 9", function () {
    ok($.SDQ.validarRNC('12345678') === false, "Passed!");
});

test("La longitud no debe ser 10", function () {
    ok($.SDQ.validarRNC('1234567890') === false, "Passed!");
});

test("La longitud no debe ser mayor de 11", function () {
    ok($.SDQ.validarRNC('123456789012') === false, "Passed!");
});

test("Solo debe contener numeros", function () {
    ok($.SDQ.validarRNC('acvbnmkjh') === false, "Passed!");
});

test("Debe contener el codigo verificador correcto. (Mod11 Custom)", function () {
    ok($.SDQ.validarRNC('122011226') === true, "RNC verdadero!");
    ok($.SDQ.validarRNC('112031226') === false, "RNC falso");
    ok($.SDQ.validarRNC('101637587') === true, "RNC verdadero!");
});

module("validarNCFs");

test("NCF tiene longitud y estructura correcta", function () {
    ok($.SDQ.validarNCF('A010010010100000004') === true, "NCF es valido");
    ok($.SDQ.validarNCF('FJ10010010100000004') === false, "NCF no es valido");
    ok($.SDQ.validarNCF('A0100100101000000') === false, "NCF no es valido");
    ok($.SDQ.validarNCF('A01001001010000003234') === false, "NCF no es valido");
});

test("NCF posee un tipo de comprobante valido", function () {
    ok($.SDQ.validarNCF('A010010010100000004') === true, "OK, tipo de comprobante valor fiscal");
    ok($.SDQ.validarNCF('A010010010200000004') === true, "OK, tipo de comprobante consumidor final");
    ok($.SDQ.validarNCF('A010010010300000004') === true, "OK, notas de crédito");
    ok($.SDQ.validarNCF('A010010010400000004') === true, "OK, notas de debito");
    ok($.SDQ.validarNCF('A010010010500000004') === false, "TIpo de comprobante no existe");
    ok($.SDQ.validarNCF('A010010010700000004') === false, "Tipo de comprobante que no existe");
    ok($.SDQ.validarNCF('A010010010800000004') === false, "Tipo de comprobante que no existe");
    ok($.SDQ.validarNCF('A010010010900000004') === false, "Tipo de comprobante que no existe");
    ok($.SDQ.validarNCF('A010010011000000004') === false, "Tipo de comprobante que no existe");
    ok($.SDQ.validarNCF('A010010011100000004') === true, "OK, tipo de comprobante proveedores informales");
    ok($.SDQ.validarNCF('A010010011200000004') === true, "OK, registro único de ingresos");
    ok($.SDQ.validarNCF('A010010011300000004') === true, "OK, registro de gastos menores");
    ok($.SDQ.validarNCF('A010010011400000004') === true, "OK, tipo de comprobante para regimenes especiales");
    ok($.SDQ.validarNCF('A010010011500000004') === true, "OK, tipo de comprobante gubernamental");
    ok($.SDQ.validarNCF('Z010010011600000004') === false, "Tipo de comprobante que no existe");
});