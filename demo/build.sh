make p=AX650_emmc  all install -j16

if [[ "$1" == "all" ]]; then
    echo "传入 all 参数，执行完整目录拷贝..."
    scp -r ../../msp/out/bin/BoxDemo/ root@192.168.0.89:/root
else
    echo "未传入 all 参数，仅拷贝 boxdemo 文件..."
    scp -r ../../msp/out/bin/BoxDemo/boxdemo root@192.168.0.89:/root/BoxDemo/
fi

echo "操作完成！"
