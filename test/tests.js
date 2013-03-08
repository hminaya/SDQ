module( "validarCedula");
test( "La longitud no debe ser menor de 11", function() {
  ok( $.SDQ.validarCedula('1234567890') == false, "Passed!" );
});

test( "La longitud no debe ser mayor de 11", function() {
  ok( $.SDQ.validarCedula('123456789111') == false, "Passed!" );
});

test( "Solo debe contener numeros", function() {
  ok( $.SDQ.validarCedula('abcasdqwer-') == false, "Passed!" );
});

test( "Puede estar dentro de las cedulas que no cumplen con el algoritmo de LUHN", function() {
  ok( $.SDQ.validarCedula('00000000018') == true, "Passed!" );
  ok( $.SDQ.validarCedula('11111111123') == true, "Passed!" );
});

test( "Debe contener el digito verificador correcto (LUHN)", function() {
  ok( $.SDQ.validarCedula('00113918205') == true, "Passed!" );
  ok( $.SDQ.validarCedula('00113918204') == false, "Passed!" );
  ok( $.SDQ.validarCedula('00113918213') == true, "Passed!" );
});

test( "Solo deben ser dígitos", function() {
  ok( $.SDQ.validarCedula('00113918205') == true, "Passed!" );
  ok( $.SDQ.validarCedula('0011391820x') == false, "Passed!" );
  ok( $.SDQ.validarCedula('x0113918205') == false, "Passed!" );
  ok( $.SDQ.validarCedula('00113x18205') == false, "Passed!" );
});


module( "validarRNC");
test( "La longitud no debe ser menor de 9", function() {
  ok( $.SDQ.validarRNC('12345678') == false, "Passed!" );
});

test( "La longitud no debe ser 10", function() {
  ok( $.SDQ.validarRNC('1234567890') == false, "Passed!" );
});

test( "La longitud no debe ser mayor de 11", function() {
  ok( $.SDQ.validarRNC('123456789012') == false, "Passed!" );
});

test( "Solo debe contener numeros", function() {
  ok( $.SDQ.validarRNC('acvbnmkjh') == false, "Passed!" );
});
test( "Debe contener el codigo verificador correcto. (Mod11 Custom)", function() {
  ok( $.SDQ.validarRNC('122011226') == true, "Passed!" ); //RNC INDUVECA
  ok( $.SDQ.validarRNC('112031226') == false, "Passed!" ); //RNC FALSO
  ok( $.SDQ.validarRNC('101637587') == true, "Passed!" ); //RNC Body Shop
});