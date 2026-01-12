#!/usr/bin/env python3
import json
from http.server import BaseHTTPRequestHandler, HTTPServer
import urllib.parse

HOST = '0.0.0.0'
PORT = 5000

class Handler(BaseHTTPRequestHandler):
    def _set_headers(self, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == '/api/health':
            self._set_headers(200)
            resp = {'success': True, 'message': 'Mock server running'}
            self.wfile.write(json.dumps(resp).encode('utf-8'))
        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({'success': False, 'error': 'Not found'}).encode('utf-8'))

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == '/api/solve':
            content_length = int(self.headers.get('Content-Length', 0))
            raw = self.rfile.read(content_length).decode('utf-8')
            try:
                payload = json.loads(raw)
            except Exception:
                self._set_headers(400)
                self.wfile.write(json.dumps({'success': False, 'error': 'Invalid JSON'}).encode('utf-8'))
                return

            problem = payload.get('problem', '')
            subject = (payload.get('subject') or '').lower()

            if not problem or subject not in ('math', 'english', 'science'):
                self._set_headers(400)
                self.wfile.write(json.dumps({'success': False, 'error': 'Invalid input'}).encode('utf-8'))
                return

            # Simple mock logic
            if subject == 'math':
                if '2x' in problem and '=' in problem:
                    solution = 'x = 2'
                    explanation = 'Solve 2x + 3 = 7: subtract 3 → 2x = 4, divide 2 → x = 2.'
                else:
                    import re
                    m = re.search(r"(\\d+)\\s*\\+\\s*(\\d+)", problem)
                    if m:
                        a, b = int(m.group(1)), int(m.group(2))
                        solution = str(a + b)
                        explanation = f"{a} + {b} = {a + b}"
                    else:
                        solution = 'Unable to solve'
                        explanation = 'Mock server supports simple examples like "2x + 3 = 7" or "10 + 5".'
                confidence = 0.9
            elif subject == 'english':
                if 'its a' in problem.lower():
                    solution = "Change 'its' to \"it's\""
                    explanation = "Use \"it's\" for 'it is'; use 'its' for possession."
                else:
                    solution = 'English help'
                    explanation = 'Provide grammar or essay requests for more detailed help.'
                confidence = 0.85
            else:  # science
                if 'photosynthesis' in problem.lower():
                    solution = '6CO2 + 6H2O + light → C6H12O6 + 6O2'
                    explanation = 'Photosynthesis converts CO2 and water into glucose and oxygen using sunlight.'
                else:
                    solution = 'Science help'
                    explanation = 'Ask about photosynthesis, Newton, atoms, etc.'
                confidence = 0.88

            resp = {
                'success': True,
                'data': {
                    'solution': solution,
                    'explanation': explanation,
                    'subject': subject,
                    'confidence': confidence
                }
            }
            self._set_headers(200)
            self.wfile.write(json.dumps(resp).encode('utf-8'))
        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({'success': False, 'error': 'Not found'}).encode('utf-8'))

if __name__ == '__main__':
    server = HTTPServer((HOST, PORT), Handler)
    print(f"Mock server running at http://{HOST}:{PORT}/ (CTRL+C to stop)")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\nShutting down')
        server.server_close()
