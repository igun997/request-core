
# Custom HTTP Request GitHub Action

This repository contains a custom GitHub Action that sends an HTTP request to a specified URL with customizable methods, headers, and payload.

## Features

- Send HTTP requests with customizable HTTP methods (GET, POST, PUT, etc.).
- Supports custom headers in JSON format.
- Supports custom payloads for POST and PUT requests.
- Outputs the response from the HTTP request.

## Inputs

- `url`: (Required) The URL to send the request to.
- `method`: (Required) The HTTP method (GET, POST, PUT, etc.). Default is `POST`.
- `headers`: (Optional) Headers in JSON format. Default is `{}`.
- `payload`: (Optional) Request body/payload in JSON format. Default is `{}`.

## Outputs

- `response`: The response from the HTTP request.

## Example Usage

```yaml
name: Custom HTTP Request Workflow

on:
  workflow_dispatch:
    inputs:
      url:
        description: "The URL to send the request to"
        required: true
      method:
        description: "The HTTP method (GET, POST, PUT, etc.)"
        required: true
        default: "POST"
      headers:
        description: "Optional headers in JSON format"
        required: false
        default: "{}"
      payload:
        description: "Optional request payload"
        required: false
        default: "{}"

jobs:
  send_custom_request:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Use Custom HTTP Action
        uses: username/custom-http-action@v1.0
        with:
          url: ${{ github.event.inputs.url }}
          method: ${{ github.event.inputs.method }}
          headers: ${{ github.event.inputs.headers }}
          payload: ${{ github.event.inputs.payload }}

      - name: Output Success
        run: echo "HTTP Request sent successfully!"
```

## License

This project is licensed under the MIT License.
