curl --header "Content-Type: application/json" \
  --request POST \
  --data $'{"username":"xyz1","password":"xyz"}\n{"username":"xyz2","password":"xyz"}\n{"username":"xyz3","password":"xyz"}\r\n{"username":"xyz4","password":"xyz"}\n' \
  http://localhost:1234