#!/usr/bin/bash

node scripts/build
rm final.odp
cd template/template
zip -r ../../final.odp *
cd ../..
libreoffice final.odp
