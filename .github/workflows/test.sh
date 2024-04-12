python3 -c "
import sys
import urllib.request
import json

req = urllib.request.Request('https://ghcr.io/v2/wappuradio/webbi/tags/list', headers={'Authorization': sys.argv[1]})
with urllib.request.urlopen(req) as f:
    if sys.argv[2] in json.load(f)['tags']:
        print('exists=true')
    else:
        print('exists=false')" \
"Bearer djE6d2FwcHVyYWRpby93ZWJiaToxNzEyOTQ5OTY5NDM2MDcwODAy" \
c94d690cd55978dc22fad615ad3e1361ac7a8d83
