fff
Get-Content $file | ForEach-Object {
    [PSCustomObject]@{
        LineNumber = $global:i++
        LineLength = $_.Length
    }
} | Export-Csv "C:\Users\ROMEROMOLINA\OneDrive\axa-im.com\Documents\line_lengths.csv" -NoTypeInformation -Encoding UTF8

