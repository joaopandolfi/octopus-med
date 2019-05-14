1. Generate RSA key. In the Terminal enter

openssl genrsa -out mockserver.key

The mockserver.key file will be generated.

2. Create a certificate signing request (CSR) for an SSL certificate. Answer the questions

openssl req -new -key mockserver.key -days 3650 -out mockserver.csr

Country Name (2 letter code) [AU]:UK

State or Province Name (full name) [Some-State]:Surrey

Locality Name (eg, city) []:Guildford

Organization Name (eg, company) [Internet Widgits Pty Ltd]:Mock Server Ltd

Organizational Unit Name (eg, section) []:mockdept

Common Name (e.g. server FQDN or YOUR name) []:mockserver.com

Email Address []:admin@mockserver.com

A challenge password []: <Enter>

An optional company name []: <Enter>

An .csr file will be created.

3. Create the certificate from the certificate request

openssl x509 -req -days 3650 -in mockserver.csr -signkey mockserver.key -out mockserver.crt

Signature ok

subject=/C=UK/ST=Surrey/L=Guildford/O=Mock Server Ltd/OU=mockdept/CN=mockserver.com/emailAddress=admin@mockserver.c

om

Getting Private key