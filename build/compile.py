import httplib, urllib, sys, os

#Buscar el codigo fuente
f = open('../src/jquery.sdq.js', 'r')
js_source = f.read();

#Parametros para el request
params = urllib.urlencode([
    ('js_code', js_source),
    ('compilation_level', 'SIMPLE_OPTIMIZATIONS'),
    ('output_format', 'text'),
    ('output_info', 'compiled_code'),
  ])

#Request al Google Closure Compiler Service
headers = { "Content-type": "application/x-www-form-urlencoded" }
conn = httplib.HTTPConnection('closure-compiler.appspot.com')
conn.request('POST', '/compile', params, headers)
response = conn.getresponse()
data = response.read()

#Generar el lib minificado
file_out = open('../lib/jquery.sdq.js', 'w')
file_out.write(data)
file_out.close()

#Resultados
print "========================================"
print "Original: " + str(os.path.getsize('../src/jquery.sdq.js')) + " bytes"
print "Compilado: " + str(os.path.getsize('../lib/jquery.sdq.js')) + " bytes"
print "========================================"
conn.close()