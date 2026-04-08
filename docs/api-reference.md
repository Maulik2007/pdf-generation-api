# HTML and Markdown to PDF API

Convert HTML or Markdown to styled, print-ready PDFs. Powered by headless Chrome for pixel-perfect rendering.

**Base URL:** `https://html-and-markdown-to-pdf1.p.rapidapi.com`

---

## Authentication

All requests must include your RapidAPI credentials:

```
X-RapidAPI-Key: YOUR_RAPIDAPI_KEY
X-RapidAPI-Host: html-and-markdown-to-pdf1.p.rapidapi.com
```

---

## Endpoints

### Health Check

Check if the API is online.

```
GET /health
```

**Response**

```json
{ "status": "ok" }
```

---

### Convert HTML to PDF

Submit an HTML string and receive a styled PDF file.

```
POST /api/v1/pdf/from-html
```

**Request Body**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `html` | string | ✅ | Full HTML string to convert |
| `options` | object | ❌ | PDF layout options (see below) |

**Options Object**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `pageSize` | string | `A4` | Page format: `A4`, `Letter`, `Legal`, `Tabloid`, `A3`, `A5` |
| `orientation` | string | `portrait` | `portrait` or `landscape` |
| `margin.top` | string | `20mm` | Top margin (e.g. `10mm`, `1in`) |
| `margin.right` | string | `20mm` | Right margin |
| `margin.bottom` | string | `20mm` | Bottom margin |
| `margin.left` | string | `20mm` | Left margin |
| `printBackground` | boolean | `true` | Include CSS background colors and images |
| `displayHeaderFooter` | boolean | `false` | Show header/footer templates |
| `headerTemplate` | string | `""` | HTML string for page header |
| `footerTemplate` | string | `""` | HTML string for page footer |

**Example Request**

```json
{
  "html": "<html><head><style>body { font-family: sans-serif; padding: 40px; } h1 { color: #2563eb; }</style></head><body><h1>Invoice #1042</h1><p>Amount due: $99.00</p></body></html>",
  "options": {
    "pageSize": "A4",
    "orientation": "portrait",
    "margin": {
      "top": "20mm",
      "right": "20mm",
      "bottom": "20mm",
      "left": "20mm"
    },
    "printBackground": true
  }
}
```

**Example — Node.js (axios)**

```javascript
const axios = require('axios');
const fs = require('fs');

const response = await axios.post(
  'https://html-and-markdown-to-pdf1.p.rapidapi.com/api/v1/pdf/from-html',
  {
    html: '<h1>Hello World</h1><p>My first PDF</p>',
    options: { pageSize: 'A4' }
  },
  {
    headers: {
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
      'X-RapidAPI-Host': 'html-and-markdown-to-pdf1.p.rapidapi.com'
    },
    responseType: 'arraybuffer'
  }
);

fs.writeFileSync('output.pdf', response.data);
```

**Example — Python (requests)**

```python
import requests

response = requests.post(
    'https://html-and-markdown-to-pdf1.p.rapidapi.com/api/v1/pdf/from-html',
    json={
        'html': '<h1>Hello World</h1><p>My first PDF</p>',
        'options': {'pageSize': 'A4'}
    },
    headers={
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
        'X-RapidAPI-Host': 'html-and-markdown-to-pdf1.p.rapidapi.com'
    }
)

with open('output.pdf', 'wb') as f:
    f.write(response.content)
```

**Example — curl**

```bash
curl -X POST \
  https://html-and-markdown-to-pdf1.p.rapidapi.com/api/v1/pdf/from-html \
  -H 'Content-Type: application/json' \
  -H 'X-RapidAPI-Key: YOUR_RAPIDAPI_KEY' \
  -H 'X-RapidAPI-Host: html-and-markdown-to-pdf1.p.rapidapi.com' \
  -d '{"html": "<h1>Hello</h1>"}' \
  -o output.pdf
```

**Response**

Returns a binary PDF file.

```
Content-Type: application/pdf
Content-Disposition: attachment; filename="document.pdf"
```

---

### Convert Markdown to PDF

Submit a GitHub-flavored Markdown string and receive a styled PDF. Tables, code blocks, headings, blockquotes, and lists are rendered with clean default styling.

```
POST /api/v1/pdf/from-markdown
```

**Request Body**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `markdown` | string | ✅ | Markdown string to convert (GFM supported) |
| `options` | object | ❌ | PDF layout options (same as HTML endpoint) |

**Supported Markdown Features**

- Headings (`#`, `##`, `###`, etc.)
- **Bold**, *italic*, ~~strikethrough~~
- Tables (GFM)
- Fenced code blocks with monospace rendering
- Blockquotes
- Ordered and unordered lists
- Horizontal rules
- Images and links

**Example Request**

```json
{
  "markdown": "# Project Report\n\n## Summary\n\nThis is a **markdown** document converted to PDF.\n\n| Feature | Status |\n|---------|--------|\n| Tables | ✅ |\n| Code blocks | ✅ |\n\n```js\nconsole.log('hello');\n```\n\n> This is a blockquote.",
  "options": {
    "pageSize": "A4",
    "orientation": "portrait"
  }
}
```

**Example — Node.js (axios)**

```javascript
const axios = require('axios');
const fs = require('fs');

const response = await axios.post(
  'https://html-and-markdown-to-pdf1.p.rapidapi.com/api/v1/pdf/from-markdown',
  {
    markdown: '# Hello World\n\nThis is **bold** and this is *italic*.\n\n- Item one\n- Item two',
    options: { pageSize: 'Letter', orientation: 'landscape' }
  },
  {
    headers: {
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
      'X-RapidAPI-Host': 'html-and-markdown-to-pdf1.p.rapidapi.com'
    },
    responseType: 'arraybuffer'
  }
);

fs.writeFileSync('output.pdf', response.data);
```

**Example — Python (requests)**

```python
import requests

response = requests.post(
    'https://html-and-markdown-to-pdf1.p.rapidapi.com/api/v1/pdf/from-markdown',
    json={
        'markdown': '# Hello World\n\nThis is **bold**.',
        'options': {'pageSize': 'A4'}
    },
    headers={
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
        'X-RapidAPI-Host': 'html-and-markdown-to-pdf1.p.rapidapi.com'
    }
)

with open('output.pdf', 'wb') as f:
    f.write(response.content)
```

**Example — curl**

```bash
curl -X POST \
  https://html-and-markdown-to-pdf1.p.rapidapi.com/api/v1/pdf/from-markdown \
  -H 'Content-Type: application/json' \
  -H 'X-RapidAPI-Key: YOUR_RAPIDAPI_KEY' \
  -H 'X-RapidAPI-Host: html-and-markdown-to-pdf1.p.rapidapi.com' \
  -d '{"markdown": "# Hello\n\nThis is **bold**."}' \
  -o output.pdf
```

**Response**

Returns a binary PDF file.

```
Content-Type: application/pdf
Content-Disposition: attachment; filename="document.pdf"
```

---

## Error Responses

All errors return JSON with an `error` field.

| Status | Meaning | Example |
|--------|---------|---------|
| `400` | Missing or invalid input | `{ "error": "Missing or invalid \"html\" field" }` |
| `403` | Invalid or missing API key | `{ "error": "Forbidden" }` |
| `429` | Rate limit exceeded | RapidAPI rate limit response |
| `500` | Server error during PDF generation | `{ "error": "Internal server error" }` |

---

## Tips & Best Practices

### Handling the binary response

The API returns raw PDF bytes, not base64 or JSON. Make sure to set `responseType: 'arraybuffer'` (axios) or use `.content` (requests) when saving:

```javascript
// ✅ Correct
const response = await axios.post(url, body, { responseType: 'arraybuffer' });
fs.writeFileSync('output.pdf', response.data);

// ❌ Wrong — will corrupt the file
fs.writeFileSync('output.pdf', response.data.toString());
```

### CSS in HTML

The HTML endpoint renders with full Chrome CSS support. Use `printBackground: true` to include background colors:

```html
<style>
  @page { size: A4; margin: 20mm; }
  body { font-family: 'Georgia', serif; }
  .header { background: #1e3a5f; color: white; padding: 20px; }
</style>
```

### Page breaks

Control page breaks with CSS:

```html
<style>
  .page-break { page-break-after: always; }
  h1 { page-break-before: always; }
</style>
```

### Headers and footers

Use `displayHeaderFooter: true` with `headerTemplate` and `footerTemplate`. Templates support these special spans:

```html
{
  "displayHeaderFooter": true,
  "headerTemplate": "<div style='font-size:10px;width:100%;text-align:center;'>My Document</div>",
  "footerTemplate": "<div style='font-size:10px;width:100%;text-align:center;'>Page <span class='pageNumber'></span> of <span class='totalPages'></span></div>"
}
```

---

## Limits by Plan

| Plan | Requests/Month | Max Body Size |
|------|---------------|---------------|
| Free | 50 | 1MB |
| Pro | 1,000 | 5MB |
| Ultra | 10,000 | 5MB |
| Mega | 100,000 | 5MB |

---

## Support

For issues or questions, contact via the RapidAPI support channel on the API listing page.
