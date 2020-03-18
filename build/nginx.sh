 #!/bin/bash

IS_PRODUCTION=1
SOURCE="./dist"
AUTHOR='root'
TARGET=''
OUTPUT_DIR='/www/demo'

scp nginx.conf root@54.184.26.59:/etc/nginx
ssh root@54.184.26.59  "nginx -s stop"
ssh root@54.184.26.59  "nginx"
echo "nginx重启完毕"
exit;
