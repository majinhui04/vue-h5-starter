 #!/bin/bash

IS_PRODUCTION=1
SOURCE="./dist"
AUTHOR='root'
TARGET=''
OUTPUT_DIR='/www/demo'
FOUCE=0
ORDER='build'
# 传参覆盖默认值
while getopts "m:a:s:u:S:T:r:v:ftd:h" arg; do
  case $arg in
  m)
    # 模式
    MODE=$OPTARG
    ;;
  o)
    # 编译命令
    ORDER=$OPTARG
    ;;
  a)
    # 作者
    AUTHOR=$OPTARG
    ;;
  S)
    # 打包的代码
    SOURCE=$OPTARG
    ;;
  T)
    # 目标IP
    TARGET=$OPTARG
    ;;
  r)
    # Git 仓库本地路径
    REPO=$OPTARG
    ;;
  v)
    # 自定义版本
    VERSION=$OPTARG
    ;;
  f)
    # 强制覆盖文件
    FOUCE=1
    ;;
  d)
    # 输出目录路径
    OUTPUT_DIR=$OPTARG
    ;;
  h)
    echo "
  Usage:\n
    git-log [options]\n

  Options:\n
    -m  生成模式  默认：无(npm run build)，可选：test(npm run build:test)
    -a  远程服务器用户名  默认：root
    -S  本地上传目录 默认：./dist
    -T  目标IP 默认：无
    -f  覆盖文件  默认：否，不需要传值
    -d  目标输出目录 默认：/www/demo
      "
    exit 2
    ;;
  ?)
    echo "unknown argument"
    exit 3
    ;;
  esac
done
echo $TARGET
if [ $TARGET = "" ]; then
    echo '必须填写服务地址 -T x.x.x.'
    exit
fi
# 判断远程目录
if ssh ${AUTHOR}@${TARGET} test -e $OUTPUT_DIR; then
   echo "${OUTPUT_DIR}目录已存在"
else 
    ssh "${AUTHOR}"@"${TARGET}" "mkdir -p $OUTPUT_DIR"
    echo "创建目录：${OUTPUT_DIR}"    
fi

if [ $FOUCE -eq 1 ] ; then
    echo '开始编译'
    # 开始编译代码
    npm run $ORDER
fi

# 上传代码
#scp -r "${SOURCE}"/* "${AUTHOR}"@"${TARGET}":"${OUTPUT_DIR}"
# 开始编译代码
if [ -d $SOURCE ]; then
  echo "上传目录 ${SOURCE}"
  scp -r "${SOURCE}"/* "${AUTHOR}"@"${TARGET}":"${OUTPUT_DIR}"
else 
    echo "上传文件 ${SOURCE}"
  scp "${SOURCE}" "${AUTHOR}"@"${TARGET}":"${OUTPUT_DIR}"
fi
echo "发布成功：${AUTHOR}@${TARGET}:${OUTPUT_DIR}"


exit;
