# Compliance GPT Proxy

This proxy accepts flat-form POST requests from a Custom GPT (e.g. recipient.ids, message.text) and converts them into a raw JSON payload suitable for the Facebook Graph API.

## Endpoint

`/proxy-send`

## Environment Variables

- `FB_ACCESS_TOKEN`: Facebook Page access token used to authenticate the Graph API request

## Deployment

Deploy with Render or any Node.js-compatible service.
