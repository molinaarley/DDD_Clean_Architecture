
Get-ChildItem Env: | Where-Object { $_.Name -like "*GEMINI*" -or $_.Name -like "*GOOGLE*" }

git config --global http.proxy http://127.0.0.1:9000/localproxy.pac

git config --global --unset http.proxy
