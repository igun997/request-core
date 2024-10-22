import core from '@actions/core';
import fetch from 'node-fetch';

export async function run() {
  try {
    const url = core.getInput('url');
    const method = core.getInput('method');
    const headers = JSON.parse(core.getInput('headers'));
    const payload = core.getInput('payload');

    console.log(`Sending ${method} request to: ${url}`);

    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: method === 'GET' ? null : payload
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const responseData = await response.json();
    core.setOutput('response', JSON.stringify(responseData));

  } catch (error) {
    core.setFailed(`Action failed with error: ${error.message}`);
  }
}

run();
