function loadPage(pageName) {
  const mainContent = document.getElementById('main-content');
  const navLinks = document.querySelectorAll('.nav-link'); // Select all navigation links

  navLinks.forEach(link => {
    link.classList.remove('active'); // Remove 'active' class from all links
  });

  // Add 'active' class to the clicked link
  event.target.classList.add('active');

  fetchPageContent(`page/${pageName}`, (content) => {
    mainContent.innerHTML = ''; // Clear existing content
    mainContent.appendChild(content);
    if (pageName === 'companyList') {
      fetchAndDisplayCompanies();
    }
  });
 
  }
  
  function fetchPageContent(pageName, callback) {
    fetch(`/${pageName}.html`)
      .then(response => response.text())
      .then(content => {
        const container = document.createElement('div');
        container.innerHTML = content;
        callback(container);
      })
      .catch(error => console.error(error));
  }
  