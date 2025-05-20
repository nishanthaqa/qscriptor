# 🧪 TestCafe Script Generator (LLM-Powered)

This is a simple web application that lets you **generate TestCafe test scripts** by describing a scenario in plain English. It uses a local **Mistral LLM** running via **Ollama** to produce JavaScript code and delivers it as a downloadable `.js` file.

---

## ⚙️ Features

- 💬 Describe your test case in natural language  
- 🧠 Uses a local LLM (Mistral via Ollama)  
- 📄 Generates valid TestCafe test scripts  
- 💾 Download script as a `.js` file  
- ✨ Clean web UI with status spinner  

---

## 📦 Requirements

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [Ollama](https://ollama.com/) installed and running locally
- Mistral model pulled (`ollama pull mistral`)

---

## 🚀 Getting Started

### 1. Clone this repository

```bash
git clone https://github.com/your-username/llm-testcafe-generator.git
cd llm-testcafe-generator
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start Ollama with Mistral

In a separate terminal window:

```bash
ollama run mistral
```

This runs the local LLM on port `11434`.

### 4. Run the web server

```bash
node server.js
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🖼 UI Overview

- ✍️ Textarea to describe your test case  
- 🚀 "Generate Script" button triggers LLM  
- 🔄 Spinner shown while processing  
- ⬇️ Download link appears after generation  

---

## 📁 Project Structure

```
llm-testcafe-generator/
├── public/
│   ├── index.html     # Web UI
│   └── script.js      # Frontend logic
├── server.js          # Node.js + Express backend
├── package.json
```

---

## 🧠 How It Works

1. You type a test scenario in the browser.
2. The app sends a POST request to the local Ollama server (`http://localhost:11434/api/generate`).
3. Mistral generates a TestCafe JavaScript test.
4. The backend saves it and sends a link for you to download.

---

## 🛠 Customization Ideas

- Use different models (e.g., `llama3`, `codellama`)
- Add multi-test generation
- Customize the prompt template
- Add authentication or file history

---

## 📝 License

MIT – free to use, modify, and distribute.
