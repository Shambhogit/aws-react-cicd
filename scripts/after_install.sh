#!/bin/bash

cd /var/www/html

ls -la

cp -arp dist/. . && rm -rf build
service httpd restart
