import zlib
import re
import os

def extract_text_from_pdf(pdf_path):
    """从PDF文件中提取文本内容"""
    with open(pdf_path, 'rb') as f:
        pdf_data = f.read()
    
    # 查找所有FlateDecode流
    stream_pattern = rb'stream\r?\n(.+?)\r?\nendstream'
    streams = re.findall(stream_pattern, pdf_data, re.DOTALL)
    
    extracted_text = []
    
    for stream in streams:
        try:
            # 尝试解压流
            decompressed = zlib.decompress(stream)
            # 将字节转换为字符串
            text = decompressed.decode('utf-8', errors='ignore')
            
            # 提取文本操作符之间的内容
            # PDF中的文本通常在 BT 和 ET 之间
            bt_et_pattern = r'BT(.*?)ET'
            bt_blocks = re.findall(bt_et_pattern, text, re.DOTALL)
            
            for block in bt_blocks:
                # 提取 Tj 操作符中的文本 (text) Tj
                tj_pattern = r'\((.*?)\)\s*Tj'
                tj_texts = re.findall(tj_pattern, block)
                extracted_text.extend(tj_texts)
                
                # 提取 TJ 操作符中的文本 [(text) num (text)] TJ
                tj_array_pattern = r'\[(.*?)\]\s*TJ'
                tj_arrays = re.findall(tj_array_pattern, block, re.DOTALL)
                for array in tj_arrays:
                    # 从数组中提取文本
                    text_pattern = r'\((.*?)\)'
                    texts = re.findall(text_pattern, array)
                    extracted_text.extend(texts)
                    
        except:
            # 如果解压失败，跳过
            pass
    
    return '\n'.join(extracted_text)

if __name__ == '__main__':
    pdf_dir = r'C:\Users\lenovo\Desktop\EC材料\听记纪要\0702'
    pdf_files = [
        '纪要_Ecinfo工單系統原型演示，需求對齊.pdf',
        '纪要_Ecinfo工單系統原型演示，需求對齊2.pdf',
        '纪要_Ecinfo工單系統原型演示，需求對齊3 .pdf'
    ]
    
    for pdf_file in pdf_files:
        pdf_path = os.path.join(pdf_dir, pdf_file)
        print(f"\n{'='*80}")
        print(f"文件: {pdf_file}")
        print('='*80)
        
        if os.path.exists(pdf_path):
            text = extract_text_from_pdf(pdf_path)
            if text:
                print(text)
            else:
                print("未能提取到文本内容")
        else:
            print(f"文件不存在: {pdf_path}")
