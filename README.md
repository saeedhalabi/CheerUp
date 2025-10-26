# CheerUp

[![Built with Node](https://img.shields.io/badge/Node.js-%3E%3D12-brightgreen)](#tech-stack)

CheerUp turns everyday "small wins" into playful, newspaper-style headlines to help you celebrate and remember the little victories.

Why use it?
- Quickly turn a mundane moment into a memorable headline.
- Keep a light, positive daily journal.
- Share or revisit highlights when you need a mood boost.

---

## Key Features
- Headline generator: Convert text inputs into creative newspaper-style titles.
- Daily journal: Save and browse previous headlines.
- Responsive front-end: Works well on mobile and desktop.
- Extensible backend: Node + Express with a simple API for integration.

---

## Demo
Enter a small win like:
"I organized my desk"  
Result:
"Local Organizer Restores Order, Desk Productivity Soars"

(Screenshots: ./screenshots/headlines.jpg, ./screenshots/generate-headline.jpg)

---

## Quick Start

1. Clone
```bash
git clone https://github.com/your-username/cheerup.git
cd cheerup
```

2. Install
```bash
npm install
```

3. Configure
Create a .env file in the project root:
```env
PORT=3000
HUGGINGFACE_API_KEY=your_huggingface_api_key_here
```
Replace HUGGINGFACE_API_KEY with your Hugging Face or other AI provider key.

4. Run
```bash
npm start
```
Open http://localhost:3000

---

## API (example)
POST /api/generate
Request:
```json
{
  "text": "I cooked dinner today",
  "tone": "playful"
}
```
Response:
```json
{
  "headline": "Local Chef Whips Up Culinary Masterpiece",
  "source": "model:v1"
}
```

Example curl:
```bash
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"text":"I ran 5km today","tone":"energetic"}'
```

---

## Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- AI: Hugging Face

---

## Project Structure
```
cheerup/
├── index.html
├── style.css
├── app.js
├── api/
│   ├── server.js
│   ├── controller/
│   ├── routes/
│   └── utils/
├── screenshots/
├── package.json
└── README.md
```

---

## Development Tips
- Keep prompts concise and include desired style (e.g., "newspaper headline, playful").
- Cache or rate-limit calls to the AI provider to avoid extra cost.
- Unit-test controllers that call external APIs by mocking network responses.

---

## Contributing
Contributions welcome — please open issues or PRs.

Workflow:
```bash
git checkout -b feature/your-feature
# make changes
git commit -m "Add feature"
git push origin feature/your-feature
```

Please follow standard GitHub PR norms and include tests for new features.

---


## Contact
Email: saeedrhalabi@gmail.com  
LinkedIn: https://www.linkedin.com/in/saeed-halabi  
Portfolio: https://saeedhalabi.com