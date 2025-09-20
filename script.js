// Initialize with today's date
document.getElementById('dateRequested').value = new Date().toISOString().split('T')[0];
document.getElementById('confirmDate').textContent = new Date().toLocaleDateString();

// Toggle between requestor and support views
document.getElementById('roleToggle').addEventListener('change', function() {
    const requestorView = document.getElementById('requestorView');
    const supportView = document.getElementById('supportView');
    
    if (this.checked) {
        requestorView.classList.add('hidden');
        supportView.classList.remove('hidden');
    } else {
        supportView.classList.add('hidden');
        requestorView.classList.remove('hidden');
        showRequestForm(); // Reset to form view when switching back
    }
});

function submitRequest() {
    const requestor = document.getElementById('requestor').value;
    const serviceType = document.getElementById('serviceType').value;
    const description = document.getElementById('description').value;


    // Generate ticket ID
    const ticketTypes = { 'Test Results': 'TR', 'Trial Analytics': 'TA', 'Vitals': 'VI' };
    const prefix = ticketTypes[serviceType];
    const ticketId = prefix + Math.floor(Math.random() * 1000);

    document.getElementById('ticketId').textContent = ticketId;
    document.getElementById('confirmDescription').textContent = description;

    showConfirmation();
}

function showConfirmation() {
    document.getElementById('requestForm').classList.add('hidden');
    document.getElementById('confirmation').classList.remove('hidden');
}

function showRequestForm() {
    document.getElementById('confirmation').classList.add('hidden');
    document.getElementById('requestForm').classList.remove('hidden');
    
    // Clear form
    document.getElementById('requestor').value = '';
    document.getElementById('serviceType').value = '';
    document.getElementById('description').value = '';
}

function openTicket(ticketId) {
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('ticketPortal').classList.remove('hidden');
    document.getElementById('portalTicketId').textContent = ticketId;
    
    // Set initial request based on ticket ID
    const initialRequests = {
        'TR123': 'TR for Clinicals submitted on 9/1/25 by Peldi',
        'TA456': 'TA for Sleep Apnea Study submitted on 9/16/25 by Jorge',
        'VI321': 'V for Patient Group 2 submitted on 9/17/25 by Patata',
        'TA457': 'TA for Stress Reduction Study submitted on 9/16/25 by Val',
        'TR789': 'TR for Blood Work Analysis submitted on 9/17/25 by Sarah',
        'VI654': 'Vitals Monitoring Setup submitted on 9/15/25 by Mike'
    };
    
    document.getElementById('initialRequest').textContent = initialRequests[ticketId] || 'Request details not found';
}

function showDashboard() {
    document.getElementById('ticketPortal').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
}

function updateTicket() {
    alert('Ticket updated successfully!');
}

// Table functionality
let currentSort = { column: -1, ascending: true };

function filterTable() {
    const searchText = document.getElementById('searchBox').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    const rows = document.querySelectorAll('.table-row');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const status = row.dataset.status;
        
        const matchesSearch = text.includes(searchText);
        const matchesStatus = !statusFilter || status === statusFilter;
        
        row.style.display = (matchesSearch && matchesStatus) ? 'grid' : 'none';
    });
}

function sortTable(columnIndex) {
    const tbody = document.getElementById('ticketTableBody');
    const rows = Array.from(tbody.getElementsByClassName('table-row'));
    
    // Toggle sort direction if clicking same column
    if (currentSort.column === columnIndex) {
        currentSort.ascending = !currentSort.ascending;
    } else {
        currentSort.ascending = true;
        currentSort.column = columnIndex;
    }
    
    // Update sort arrows
    document.querySelectorAll('.sort-arrow').forEach((arrow, index) => {
        if (index === columnIndex) {
            arrow.textContent = currentSort.ascending ? '▲' : '▼';
            arrow.style.opacity = '1';
        } else {
            arrow.textContent = '▼';
            arrow.style.opacity = '0.6';
        }
    });
    
    rows.sort((a, b) => {
        const aValue = a.children[columnIndex].textContent.trim();
        const bValue = b.children[columnIndex].textContent.trim();
        
        // Handle numeric values for days column
        if (columnIndex === 2) {
            const aNum = parseInt(aValue) || 0;
            const bNum = parseInt(bValue) || 0;
            return currentSort.ascending ? aNum - bNum : bNum - aNum;
        }
        
        // Handle text sorting
        const result = aValue.localeCompare(bValue);
        return currentSort.ascending ? result : -result;
    });
    
    // Re-append sorted rows
    rows.forEach(row => tbody.appendChild(row));
}