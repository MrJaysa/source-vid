from flask import Flask, request
import os
import logging

logging.getLogger('werkzeug').disabled = True
# os.environ['WERKZEUG_RUN_MAIN'] = 'true'

app = Flask(__name__)

@app.route('/<name>', methods=['PUT'])
def init(name):
    chunk = request.input_stream.read()
    with open(f'./m3u8/{name}', 'bw') as file:
        file.write(chunk) 

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5500, debug=True)
