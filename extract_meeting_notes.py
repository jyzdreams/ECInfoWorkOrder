import PyPDF2
import os

def extract_text_from_pdf(pdf_path):
    """从PDF文件中提取文本内容"""
    text = ""
    try:
        with open(pdf_path, 'rb') as f:
            pdf_reader = PyPDF2.PdfReader(f)
            for page in pdf_reader.pages:
                text += page.extract_text()
    except Exception as e:
        print(f"读取文件失败: {e}")
    return text

if __name__ == '__main__':
    pdf_dir = r'C:\Users\lenovo\Desktop\EC材料\听记纪要\0702'
    pdf_files = [
        '纪要_Ecinfo工單系統原型演示，需求對齊.pdf',
        '纪要_Ecinfo工單系統原型演示，需求對齊2.pdf',
        '纪要_Ecinfo工單系統原型演示，需求對齊3 .pdf'
    ]

    output_path = r'd:\ec-workorder\materials\听记纪要\0702_extracted.txt'
    with open(output_path, 'w', encoding='utf-8') as out:
        for pdf_file in pdf_files:
            pdf_path = os.path.join(pdf_dir, pdf_file)
            out.write(f"\n{'='*80}\n")
            out.write(f"文件: {pdf_file}\n")
            out.write('='*80 + "\n")

            if os.path.exists(pdf_path):
                text = extract_text_from_pdf(pdf_path)
                if text:
                    out.write(text + "\n")
                else:
                    out.write("未能提取到文本内容\n")
            else:
                out.write(f"文件不存在: {pdf_path}\n")
    print(f"已保存到: {output_path}")
