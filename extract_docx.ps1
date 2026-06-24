Add-Type -AssemblyName System.IO.Compression.FileSystem

$docxPath = 'C:\Users\lenovo\Desktop\仓库通功能字段一览表.docx'
$outputPath = 'D:\ec-workorder\document_extracted.xml'

try {
    $zip = [System.IO.Compression.ZipFile]::OpenRead($docxPath)
    $entry = $zip.Entries | Where-Object { $_.FullName -eq 'word/document.xml' }
    $stream = $entry.Open()
    $reader = New-Object System.IO.StreamReader($stream)
    $content = $reader.ReadToEnd()
    $reader.Close()
    $stream.Close()
    $zip.Dispose()

    $xml = [xml]$content
    $sw = New-Object System.IO.StringWriter
    $writer = New-Object System.Xml.XmlTextWriter($sw)
    $writer.Formatting = [System.Xml.Formatting]::Indented
    $xml.WriteTo($writer)
    $writer.Flush()
    $sw.ToString() | Out-File -FilePath $outputPath -Encoding UTF8

    Write-Host "XML extracted successfully"
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}
