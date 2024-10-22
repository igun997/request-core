import core from '@actions/core';
import fetch from 'node-fetch';
import { run } from '../index.js';
import { jest } from '@jest/globals'
jest.mock('@actions/core');
jest.mock('node-fetch');

const mockAPI = 'https://671701733fcb11b265d427a1.mockapi.io/testcase';

describe('Custom HTTP Action', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });


  it('should make a POST request with payload and handle the response', async () => {
    // Mock API endpoint
    const mockApiUrl = mockAPI;

    // Mock input
    const mockPayload = { data: 'test value' };
    core.getInput = jest.fn()
      .mockReturnValueOnce(mockApiUrl)                          // URL
      .mockReturnValueOnce('POST')                              // Method
      .mockReturnValueOnce('{"Content-Type": "application/json"}')  // Headers
      .mockReturnValueOnce(JSON.stringify(mockPayload));        // Payload

    // Mock API response
    const mockResponseData = { id: 2, status: 'created' };
    fetch.mockResolvedValue({
      ok: true,
      json: async () => mockResponseData,
    });

    await run();

    // Verify the API call
    expect(fetch).toHaveBeenCalledWith(mockApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockPayload),
    });

    // Verify the output
    expect(core.setOutput).toHaveBeenCalledWith('response', JSON.stringify(mockResponseData));
  });

});
