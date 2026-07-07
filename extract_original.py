import PyPDF2
import os

pdf_dir = r'C:\Users\lenovo\Desktop\EC材料\听记纪要\0702\0702(译文)'
files = [
    'Ecinfo工單系統原型演示，需求對齊.pdf',
    'Ecinfo工單系統原型演示，需求對齊2.pdf',
    'Ecinfo工單系統原型演示，需求對齊3 .pdf'
]

out_path = r'd:\ec-workorder\materials\听记纪要\0702_original_text.txt'
with open(out_path, 'w', encoding='utf-8') as out:
    for f in files:
        path = os.path.join(pdf_dir, f)
        sep = '=' * 80
        out.write('\n' + sep + '\n')
        out.write('文件: ' + f + '\n')
        out.write(sep + '\n')
        if os.path.exists(path):
            with open(path, 'rb') as pf:
                reader = PyPDF2.PdfReader(pf)
                text = ''
                for page in reader.pages:
                    text += page.extract_text() or ''
                out.write(text + '\n')
        else:
            out.write('文件不存在: ' + path + '\n')
print('已保存到: ' + out_path)
