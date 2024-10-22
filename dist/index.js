"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = run;
var _core = _interopRequireDefault(require("@actions/core"));
var _nodeFetch = _interopRequireDefault(require("node-fetch"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
async function run() {
  try {
    const url = _core.default.getInput('url');
    const method = _core.default.getInput('method');
    const headers = JSON.parse(_core.default.getInput('headers'));
    const payload = _core.default.getInput('payload');
    console.log(`Sending ${method} request to: ${url}`);
    const response = await (0, _nodeFetch.default)(url, {
      method: method,
      headers: headers,
      body: method === 'GET' ? null : payload
    });
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    const responseData = await response.json();
    _core.default.setOutput('response', JSON.stringify(responseData));
  } catch (error) {
    _core.default.setFailed(`Action failed with error: ${error.message}`);
  }
}
run();