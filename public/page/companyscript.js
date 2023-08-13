function fetchAndDisplayCompanies() {
    const companyList = document.getElementById('company-list');

    getCommapanyList();

    const addCompanyBtn = document.getElementById('add-company-btn');
    const addCompanyModal = document.getElementById('add-company-modal');

    addCompanyBtn.addEventListener('click', () => {
        console.log("add commany called");
        addCompanyModal.style.display = 'block';

        // Fetch sector data from API and populate dropdown
        axios.get('/api/sectors')
            .then(response => {
                const sectorDropdown = document.getElementById('sector-dropdown');
                const sectors = response.data;

                sectors.forEach(sector => {
                    const option = document.createElement('option');
                    option.value = sector.SectorID;
                    option.textContent = sector.Name;
                    sectorDropdown.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error fetching sectors:', error);
            });


        const saveCompanyBtn = document.getElementById('save-company-btn');
        saveCompanyBtn.addEventListener('click', () => {
            const companyName = document.getElementById('company-name').value;
            const symbol = document.getElementById('symbol').value;
            const selectedSectorID = document.getElementById('sector-dropdown').value;

            const data = {
                Name: companyName,
                Symbol: symbol,
                SectorID: selectedSectorID,
                // Add other fields as needed
              };
              console.log(data);
              
              // Make an API request to save the company data using the /api/savecompany endpoint
              fetch('/api/savecompany', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              })
                .then(response => response.json())
                .then(result => {
                  // Company saved successfully, close the modal
                  addCompanyModal.style.display = 'none';
                  getCommapanyList();
                })
                .catch(error => {
                  console.error('Error saving company:', error);
                });
        });

    });

}

function viewCompanyDetails(company) {
    // Implement the logic to display company details
    // For example, show a modal or navigate to a new page
}

function getCommapanyList(){

    axios.get('/api/companies')
        .then(response => {
            const companies = response.data; // Retrieve the data from the response
            redrawTable(companies); // Call a function to redraw the table with the data
            console.log(companies);
        })
        .catch(error => {
            console.error('Error fetching data from API:', error);
        });

}

function redrawTable(companies) {
    const companyList = document.getElementById('company-list');
    companyList.innerHTML = ''; // Clear existing content

    companies.forEach(company => {
        console.table(company);
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${company.Name}</td>
        <td>${company.Symbol}</td>
        <td>${company.SectorName}</td>
        <td><button class="btn btn-primary view-company-btn">View</button></td>
      `;
        companyList.appendChild(row);
    });
}







  // Assuming you're using axios
