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

    } catch (err) {
      spinner.style.display = 'none';
      status.textContent = ' Error contacting server.';
    }
  }
  
  