async function generate() {
    const scenario = document.getElementById('scenario').value;
    const status = document.getElementById('status');
    const link = document.getElementById('downloadLink');
    const spinner = document.getElementById('spinner');
  
    status.textContent = '';
    link.style.display = 'none';
    spinner.style.display = 'block';
  
    try {
      const response = await fetch('/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenario })
      });
  
      const result = await response.json();
      spinner.style.display = 'none';
  
      if (result.filename) {
        status.textContent = ' Script generated successfully!';
        link.href = result.filename;
        link.style.display = 'inline-block';
      } else {
        status.textContent = ' Failed to generate script.';
      }
      
//------------------------------------
document.getElementById('exportGitHub').addEventListener('click', async () => {
  const token = document.getElementById('githubToken').value.trim();
  const repo = document.getElementById('githubRepo').value.trim();

  try {
    const res = await fetch('/export', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, repo, filename: 'testcafe-test.js' })
    });

    const result = await res.json();
    if (res.ok) {
      alert(result.message);
    } else {
      alert('❌ Error: ' + result.message);
    }

    console.log('Export Result:', result);
  } catch (err) {
    console.error('Export Error:', err);
    alert('❌ Failed to export to GitHub. Check console for details.');
  }
});

      
//------------------------------------------

    } catch (err) {
      spinner.style.display = 'none';
      status.textContent = ' Error contacting server.';
    }
  }
  
  