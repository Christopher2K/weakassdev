#!/bin/bash
#
mkcert -install
mkcert "weakassdev.local" "*.weakassdev.local"
mkdir -p docker/certs
cp weakassdev.local+1-key.pem weakassdev.local+1.pem docker/certs
rm -rf weakassdev.local+1*

