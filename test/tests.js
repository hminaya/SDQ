test( "Cedula - Validar la longitud no sea menor de 11", function() {
  ok( $.SDQ.validarCedula('1234567890') == false, "Passed!" );
});

test( "Cedula - Validar la longitud no sea mayor de 12", function() {
  ok( $.SDQ.validarCedula('123456789111') == false, "Passed!" );
});