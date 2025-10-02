        // Initialize
        document.getElementById('dateRequested').value = new Date().toISOString().split('T')[0];
        document.getElementById('confirmDate').textContent = new Date().toLocaleDateString();

        // Role toggle
        document.getElementById('roleToggle').addEventListener('change', function() {
            const requestorView = document.getElementById('requestorView');
            const supportView = document.getElementById('supportView');
            
            if (this.checked) {
                requestorView.classList.add('hidden');
                supportView.classList.remove('hidden');
            } else {
                supportView.classList.add('hidden');
                requestorView.classList.remove('hidden');
                showRequestForm();
            }
        });

        function submitRequest() {
            const requestor = document.getElementById('requestor').value;
            const description = document.getElementById('description').value;

            if (!requestor || !description) {
                alert('Please fill in all required fields (Requestor and Description)');
                return;
            }

            const serviceType = document.getElementById('serviceType').value;
            const ticketTypes = { 'Test Results': 'TR', 'Trial Analytics': 'TA', 'Vitals': 'VI' };
            const prefix = ticketTypes[serviceType] || 'TK';
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
            document.getElementById('description').value = '';
            document.getElementById('serviceType').value = '';
        }

        function toggleNotification(element) {
            element.classList.toggle('expanded');
            element.classList.remove('unread');
        }

        function openTicket(ticketId) {
            document.getElementById('dashboard').classList.add('hidden');
            document.getElementById('ticketPortal').classList.remove('hidden');
            document.getElementById('portalTicketId').textContent = ticketId;
            
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
            const status = document.getElementById('ticketStatus').value;
            const assignee = document.getElementById('assignedTo').value;
            const notes = document.getElementById('workNotes').value;
            
            alert(`Ticket updated successfully!\nStatus: ${status}\nAssigned To: ${assignee || 'Unassigned'}`);
        }

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
