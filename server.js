import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

function extractAndCommentValidJS(rawOutput) {
    // Match content inside ```javascript ... ```
    const match = rawOutput.match(/```javascript\s*([\s\S]*?)```/i);
  
    if (match) {
      return match[1].trim(); // Return just the code
    }
  
    // If no code block found, comment everything line-by-line
    return rawOutput
      .split('\n')
      .map(line => line.startsWith('import') || line.startsWith('fixture') || line.startsWith('test') ? line : `// ${line}`)
      .join('\n');
  }
  

const app = express();
const PORT = 3000;

// For ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/generate', async (req, res) => {
  const prompt = `Write a complete TestCafe test in JavaScript for this scenario: ${req.body.scenario}`;

  try {
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'mistral',
      prompt,
      stream: false
    });

    const filename = 'testcafe-test.js';
    const filepath = path.join(__dirname, 'public', filename);
    //fs.writeFileSync(filepath, response.data.response);
    const cleanedCode = extractAndCommentValidJS(response.data.response);
    fs.writeFileSync(filepath, cleanedCode);


    res.json({ filename });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate test script.' });
  }
});

//-------------------------------------------------
app.post('/export', async (req, res) => {
  const { token, repo, filename } = req.body;
  const filePath = path.join(__dirname, 'public', filename);

  try {
    if (!fs.existsSync(filePath)) {
      return res.status(400).json({ message: 'Generated file does not exist.' });
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const base64Content = Buffer.from(content).toString('base64');

    const [owner, repoName] = repo.split('/');
    const githubUrl = `https://api.github.com/repos/${owner}/${repoName}/contents/${filename}`;

    const response = await axios.put(
      githubUrl,
      {
        message: `Add ${filename}`,
        content: base64Content,
      },
      {
        headers: {
          Authorization: `token ${token}`,
          'User-Agent': 'TestCafe-Gen-App',
        },
      }
    );

    console.log('✅ GitHub Upload Response:', response.data);
    res.json({ message: '✅ File successfully exported to GitHub!' });

  } catch (err) {
    const message = err.response?.data?.message || err.message;
    console.error('❌ GitHub Upload Error:', message);
    res.status(500).json({ message: `GitHub export failed: ${message}` });
  }
});

//-----------------------------------------------

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
