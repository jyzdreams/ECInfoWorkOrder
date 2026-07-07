# -*- coding: utf-8 -*-
"""
将 index.html 中的简体中文转换为繁体中文（使用 s2t 模式，通用繁体）。
注：s2hk 模式有 bug（不转 户→戶，且 說→説 日文形式），故改用 s2t。
"""
import os
import sys
import shutil

try:
    from opencc import OpenCC
except ImportError:
    print("ERROR: opencc 未安装。请运行: pip install opencc-python-reimplemented")
    sys.exit(1)


def convert_file(src_path, dst_path=None, mode="s2t"):
    if dst_path is None:
        dst_path = src_path

    cc = OpenCC(mode)

    with open(src_path, "r", encoding="utf-8") as f:
        content = f.read()

    original_len = len(content)
    converted = cc.convert(content)
    converted_len = len(converted)

    diff_count = sum(1 for a, b in zip(content, converted) if a != b)

    with open(dst_path, "w", encoding="utf-8") as f:
        f.write(converted)

    print(f"转换完成: {src_path}")
    print(f"  原长度: {original_len}  转换后长度: {converted_len}  字符差异: {diff_count}")
    return diff_count


def main():
    src = r"d:\ec-workorder\ui-prototype\index.html"
    backup = src + ".bak.simplified"

    if not os.path.exists(src):
        print(f"ERROR: 文件不存在: {src}")
        sys.exit(1)

    # 从备份恢复
    if os.path.exists(backup):
        shutil.copy2(backup, src)
        print(f"已从备份恢复: {backup} -> {src}")
    else:
        print(f"ERROR: 备份文件不存在: {backup}")
        sys.exit(1)

    # 使用 s2t 模式转换
    diff = convert_file(src, mode="s2t")
    print(f"\n总共转换了 {diff} 个字符。")

    # 验证关键转换
    cc = OpenCC('s2t')
    with open(src, "r", encoding="utf-8") as f:
        content = f.read()

    checks = [
        ("客户", "客戶"),
        ("户口", "戶口"),
        ("说明", "說明"),
    ]
    for simp, trad in checks:
        simp_count = content.count(simp)
        trad_count = content.count(trad)
        print(f"  验证 '{simp}' -> '{trad}': 简体={simp_count}, 繁体={trad_count}")


if __name__ == "__main__":
    main()
