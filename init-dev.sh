#!/bin/bash
#
mkcert -install
mkcert "weakassdev.test" "*.weakassdev.test"
mkdir -p docker/certs
cp weakassdev.test+1-key.pem weakassdev.test+1.pem docker/certs
rm -rf weakassdev.test+1*

