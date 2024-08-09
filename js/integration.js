function itens() {
    fetch('http://localhost:3000/itens')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
  
      .then(data => {
        const jsonString = JSON.stringify(data, null, 2); // Pretty print with indentation
        document.getElementById('json-output').textContent = jsonString;
      })
      
      .catch(error => console.error('There was a problem with the fetch operation:', error));
  }

  itens();
 