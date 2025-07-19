// Mason Mestri Tracker Application
class MasonMestriApp {
    constructor() {
        this.currentUser = null;
        this.sites = [];
        this.workers = [];
        this.workLogs = [];
        this.init();
    }

    // Notification utility using SweetAlert2
    showToast(message, type = 'success', position = 'top-end') {
        const Toast = Swal.mixin({
            toast: true,
            position: position,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });

        Toast.fire({
            icon: type,
            title: message
        });
    }

    showAlert(title, message, type = 'info') {
        return Swal.fire({
            title: title,
            text: message,
            icon: type,
            confirmButtonText: 'OK',
            confirmButtonColor: '#8B4513'
        });
    }

    showConfirm(title, message, confirmText = 'Yes', cancelText = 'No') {
        return Swal.fire({
            title: title,
            text: message,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#8B4513',
            cancelButtonColor: '#6c757d',
            confirmButtonText: confirmText,
            cancelButtonText: cancelText
        });
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.checkFirstTimeUser();
        this.checkAuthState();
        this.setTodayDate();
    }

    checkFirstTimeUser() {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.length === 0) {
            // Auto-load demo data for first-time users
            this.loadDemoDataSilently();
        }
    }

    loadDemoDataSilently() {
        // Load demo data without confirmation for first-time users
        const demoUsers = [
            {
                id: "demo_admin_1",
                name: "Rajesh Kumar",
                mobile: "9876543210",
                password: "admin123",
                role: "admin",
                createdAt: "2024-01-01T00:00:00.000Z"
            },
            {
                id: "demo_worker_1",
                name: "Suresh Mestri",
                mobile: "9876543211",
                password: "worker123",
                role: "worker",
                createdAt: "2024-01-01T00:00:00.000Z"
            }
        ];

        const demoSites = [
            {
                id: "site_1",
                userId: "demo_admin_1",
                name: "Green Valley Apartments",
                type: "residential",
                address: "123 Main Street, Kochi, Kerala 682001",
                contact: "9876543212",
                location: "9.9312, 76.2673",
                createdAt: "2024-01-01T00:00:00.000Z"
            },
            {
                id: "site_2",
                userId: "demo_admin_1",
                name: "Tech Park Phase 2",
                type: "commercial",
                address: "456 IT Road, Bangalore, Karnataka 560001",
                contact: "9876543213",
                location: "12.9716, 77.5946",
                createdAt: "2024-01-02T00:00:00.000Z"
            }
        ];

        const demoWorkers = [
            {
                id: "worker_1",
                userId: "demo_admin_1",
                name: "Raman Nair",
                mobile: "9876543215",
                type: "permanent",
                createdAt: "2024-01-01T00:00:00.000Z"
            },
            {
                id: "worker_2",
                userId: "demo_admin_1",
                name: "Murugan S",
                mobile: "9876543216",
                type: "permanent",
                createdAt: "2024-01-01T00:00:00.000Z"
            }
        ];

        const demoWorkLogs = [
            {
                id: "log_1",
                userId: "demo_admin_1",
                date: "2024-01-15",
                siteId: "site_1",
                workerId: "worker_1",
                amount: "1500.00",
                notes: "Completed foundation work",
                paid: true,
                createdAt: "2024-01-15T08:00:00.000Z"
            },
            {
                id: "log_2",
                userId: "demo_admin_1",
                date: "2024-01-16",
                siteId: "site_2",
                workerId: "worker_2",
                amount: "1200.00",
                notes: "Brick laying work",
                paid: false,
                createdAt: "2024-01-16T08:30:00.000Z"
            }
        ];

        localStorage.setItem('users', JSON.stringify(demoUsers));
        localStorage.setItem('sites', JSON.stringify(demoSites));
        localStorage.setItem('workers', JSON.stringify(demoWorkers));
        localStorage.setItem('workLogs', JSON.stringify(demoWorkLogs));

        console.log('Demo data loaded automatically for first-time user');
    }

    // Data Management
    loadData() {
        this.sites = JSON.parse(localStorage.getItem('sites') || '[]');
        this.workers = JSON.parse(localStorage.getItem('workers') || '[]');
        this.workLogs = JSON.parse(localStorage.getItem('workLogs') || '[]');
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    }

    saveData() {
        localStorage.setItem('sites', JSON.stringify(this.sites));
        localStorage.setItem('workers', JSON.stringify(this.workers));
        localStorage.setItem('workLogs', JSON.stringify(this.workLogs));
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }

    // Authentication
    checkAuthState() {
        if (this.currentUser) {
            this.showDashboard();
        } else {
            this.showAuthScreen();
        }
    }

    showAuthScreen() {
        document.getElementById('authScreen').classList.add('active');
        document.getElementById('dashboardScreen').classList.remove('active');
        
        // Show welcome message for first-time users
        setTimeout(() => {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            if (users.length > 0 && !localStorage.getItem('welcomeShown')) {
                this.showWelcomeMessage();
                localStorage.setItem('welcomeShown', 'true');
            }
        }, 1000);
    }

    async showWelcomeMessage() {
        await Swal.fire({
            title: '🏗️ Welcome to Mason Mestri Tracker!',
            html: `
                <p>Demo data has been loaded for you to explore the application.</p>
                <div style="background: #F4E4BC; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                    <h6 style="color: #8B4513; margin-bottom: 0.5rem;">Demo Login Credentials:</h6>
                    <p style="margin: 0.25rem 0;"><strong>Admin:</strong> 9876543210 / admin123</p>
                    <p style="margin: 0.25rem 0;"><strong>Worker:</strong> 9876543211 / worker123</p>
                </div>
                <p><small>You can also register a new account or clear all data using the controls below.</small></p>
            `,
            icon: 'info',
            confirmButtonText: 'Got it!',
            confirmButtonColor: '#8B4513',
            allowOutsideClick: false
        });
    }

    showDashboard() {
        document.getElementById('authScreen').classList.remove('active');
        document.getElementById('dashboardScreen').classList.add('active');
        
        // Show analytics tab only for admin users
        const analyticsTab = document.getElementById('analytics-tab-li');
        if (this.currentUser.role === 'admin') {
            analyticsTab.style.display = 'block';
        } else {
            analyticsTab.style.display = 'none';
        }
        
        // Update welcome message
        document.getElementById('userWelcome').textContent = 
            `${translate('welcome')}, ${this.currentUser.name}`;
        
        this.refreshAllData();
    }

    async login(mobile, password) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.mobile === mobile && u.password === password);
        
        if (user) {
            this.currentUser = user;
            this.saveData();
            this.showDashboard();
            this.showToast(`${translate('welcome')}, ${user.name}!`, 'success');
            return true;
        } else {
            this.showToast(translate('invalid_credentials') || 'Invalid mobile number or password', 'error');
            return false;
        }
    }

    register(name, mobile, password, role) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Check if user already exists
        if (users.find(u => u.mobile === mobile)) {
            this.showToast(translate('user_exists') || 'User already exists with this mobile number', 'error');
            return false;
        }
        
        const newUser = {
            id: Date.now().toString(),
            name,
            mobile,
            password,
            role,
            createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        this.currentUser = newUser;
        this.saveData();
        this.showDashboard();
        this.showToast(translate('registration_success') || 'Registration successful!', 'success');
        return true;
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.showAuthScreen();
    }

    // Sites Management
    addSite(siteData) {
        const site = {
            id: Date.now().toString(),
            userId: this.currentUser.id,
            ...siteData,
            createdAt: new Date().toISOString()
        };
        this.sites.push(site);
        this.saveData();
        this.renderSites();
        this.updateSiteSelects();
        this.showToast(translate('site_added') || 'Site added successfully', 'success');
    }

    updateSite(id, siteData) {
        const index = this.sites.findIndex(s => s.id === id);
        if (index !== -1) {
            this.sites[index] = { ...this.sites[index], ...siteData };
            this.saveData();
            this.renderSites();
            this.updateSiteSelects();
            this.showToast(translate('site_updated') || 'Site updated successfully', 'success');
        }
    }

    async deleteSite(id) {
        const result = await this.showConfirm(
            translate('confirm_delete') || 'Confirm Delete',
            translate('delete_site_confirm') || 'Are you sure you want to delete this site? This action cannot be undone.',
            translate('delete') || 'Delete',
            translate('cancel') || 'Cancel'
        );
        
        if (result.isConfirmed) {
            this.sites = this.sites.filter(s => s.id !== id);
            this.saveData();
            this.renderSites();
            this.updateSiteSelects();
            this.showToast(translate('site_deleted') || 'Site deleted successfully', 'success');
        }
    }

    getUserSites() {
        return this.sites.filter(s => s.userId === this.currentUser.id);
    }

    // Workers Management
    addWorker(workerData) {
        const worker = {
            id: Date.now().toString(),
            userId: this.currentUser.id,
            ...workerData,
            createdAt: new Date().toISOString()
        };
        this.workers.push(worker);
        this.saveData();
        this.renderWorkers();
        this.updateWorkerSelects();
        this.showToast(translate('worker_added') || 'Worker added successfully', 'success');
    }

    updateWorker(id, workerData) {
        const index = this.workers.findIndex(w => w.id === id);
        if (index !== -1) {
            this.workers[index] = { ...this.workers[index], ...workerData };
            this.saveData();
            this.renderWorkers();
            this.updateWorkerSelects();
            this.showToast(translate('worker_updated') || 'Worker updated successfully', 'success');
        }
    }

    async deleteWorker(id) {
        const result = await this.showConfirm(
            translate('confirm_delete') || 'Confirm Delete',
            translate('delete_worker_confirm') || 'Are you sure you want to delete this worker? This action cannot be undone.',
            translate('delete') || 'Delete',
            translate('cancel') || 'Cancel'
        );
        
        if (result.isConfirmed) {
            this.workers = this.workers.filter(w => w.id !== id);
            this.saveData();
            this.renderWorkers();
            this.updateWorkerSelects();
            this.showToast(translate('worker_deleted') || 'Worker deleted successfully', 'success');
        }
    }

    getUserWorkers() {
        return this.workers.filter(w => w.userId === this.currentUser.id);
    }

    // Work Logs Management
    addWorkLog(workLogData) {
        const workLog = {
            id: Date.now().toString(),
            userId: this.currentUser.id,
            ...workLogData,
            createdAt: new Date().toISOString()
        };
        this.workLogs.push(workLog);
        this.saveData();
        this.renderWorkLogs();
        this.showToast(translate('worklog_added') || 'Work entry added successfully', 'success');
    }

    updateWorkLog(id, workLogData) {
        const index = this.workLogs.findIndex(w => w.id === id);
        if (index !== -1) {
            this.workLogs[index] = { ...this.workLogs[index], ...workLogData };
            this.saveData();
            this.renderWorkLogs();
            this.showToast(translate('worklog_updated') || 'Work entry updated successfully', 'success');
        }
    }

    async deleteWorkLog(id) {
        const result = await this.showConfirm(
            translate('confirm_delete') || 'Confirm Delete',
            translate('delete_worklog_confirm') || 'Are you sure you want to delete this work entry? This action cannot be undone.',
            translate('delete') || 'Delete',
            translate('cancel') || 'Cancel'
        );
        
        if (result.isConfirmed) {
            this.workLogs = this.workLogs.filter(w => w.id !== id);
            this.saveData();
            this.renderWorkLogs();
            this.showToast(translate('worklog_deleted') || 'Work entry deleted successfully', 'success');
        }
    }

    getUserWorkLogs() {
        return this.workLogs.filter(w => w.userId === this.currentUser.id);
    }

    // Rendering Methods
    renderSites() {
        const container = document.getElementById('sitesList');
        const sites = this.getUserSites();
        
        if (sites.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-building"></i>
                    <h4>${translate('no_data')}</h4>
                    <p>Start by adding your first construction site</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = sites.map(site => `
            <div class="list-item">
                <div class="list-item-header">
                    <div>
                        <h5 class="list-item-title">${site.name}</h5>
                        <p class="list-item-subtitle">
                            <span class="badge badge-${site.type}">${translate(site.type)}</span>
                            ${site.address}
                        </p>
                        ${site.contact ? `<p class="list-item-subtitle"><i class="fas fa-phone"></i> ${site.contact}</p>` : ''}
                    </div>
                    <div class="list-item-actions">
                        <button class="btn btn-outline-primary btn-sm" onclick="app.editSite('${site.id}')">
                            <i class="fas fa-edit"></i> ${translate('edit')}
                        </button>
                        <button class="btn btn-outline-danger btn-sm" onclick="app.deleteSite('${site.id}')">
                            <i class="fas fa-trash"></i> ${translate('delete')}
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderWorkers() {
        const container = document.getElementById('workersList');
        const workers = this.getUserWorkers();
        
        if (workers.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-users"></i>
                    <h4>${translate('no_data')}</h4>
                    <p>Start by adding your team members</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = workers.map(worker => `
            <div class="list-item">
                <div class="list-item-header">
                    <div>
                        <h5 class="list-item-title">${worker.name}</h5>
                        <p class="list-item-subtitle">
                            <span class="badge badge-${worker.type}">${translate(worker.type)}</span>
                            <i class="fas fa-phone"></i> ${worker.mobile}
                        </p>
                    </div>
                    <div class="list-item-actions">
                        <button class="btn btn-outline-primary btn-sm" onclick="app.editWorker('${worker.id}')">
                            <i class="fas fa-edit"></i> ${translate('edit')}
                        </button>
                        <button class="btn btn-outline-danger btn-sm" onclick="app.deleteWorker('${worker.id}')">
                            <i class="fas fa-trash"></i> ${translate('delete')}
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderWorkLogs() {
        const container = document.getElementById('workLogsList');
        let workLogs = this.getUserWorkLogs();
        
        // Apply filters
        const dateFilter = document.getElementById('workLogDate').value;
        const siteFilter = document.getElementById('workLogSite').value;
        const workerFilter = document.getElementById('workLogWorker').value;
        
        if (dateFilter) {
            workLogs = workLogs.filter(log => log.date === dateFilter);
        }
        if (siteFilter) {
            workLogs = workLogs.filter(log => log.siteId === siteFilter);
        }
        if (workerFilter) {
            workLogs = workLogs.filter(log => log.workerId === workerFilter);
        }
        
        // Sort by date (newest first)
        workLogs.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        if (workLogs.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-calendar-day"></i>
                    <h4>${translate('no_data')}</h4>
                    <p>No work entries found for the selected filters</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = workLogs.map(log => {
            const site = this.sites.find(s => s.id === log.siteId);
            const worker = this.workers.find(w => w.id === log.workerId);
            
            return `
                <div class="list-item">
                    <div class="list-item-header">
                        <div>
                            <h5 class="list-item-title">${new Date(log.date).toLocaleDateString()}</h5>
                            <p class="list-item-subtitle">
                                <strong>${worker ? worker.name : 'Unknown Worker'}</strong> at 
                                <strong>${site ? site.name : 'Unknown Site'}</strong>
                            </p>
                            <p class="list-item-subtitle">
                                <span class="badge badge-${log.paid ? 'paid' : 'unpaid'}">
                                    ${translate(log.paid ? 'paid' : 'unpaid')}
                                </span>
                                Amount: ₹${parseFloat(log.amount).toFixed(2)}
                            </p>
                            ${log.notes ? `<p class="list-item-subtitle"><i class="fas fa-sticky-note"></i> ${log.notes}</p>` : ''}
                        </div>
                        <div class="list-item-actions">
                            <button class="btn btn-outline-primary btn-sm" onclick="app.editWorkLog('${log.id}')">
                                <i class="fas fa-edit"></i> ${translate('edit')}
                            </button>
                            <button class="btn btn-outline-danger btn-sm" onclick="app.deleteWorkLog('${log.id}')">
                                <i class="fas fa-trash"></i> ${translate('delete')}
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderAnalytics() {
        if (this.currentUser.role !== 'admin') return;
        
        const workLogs = this.getUserWorkLogs();
        
        // Earnings Summary
        const totalEarnings = workLogs.reduce((sum, log) => sum + parseFloat(log.amount), 0);
        const paidEarnings = workLogs.filter(log => log.paid).reduce((sum, log) => sum + parseFloat(log.amount), 0);
        const unpaidEarnings = totalEarnings - paidEarnings;
        
        document.getElementById('earningsSummary').innerHTML = `
            <div class="row">
                <div class="col-md-4">
                    <div class="summary-card">
                        <h3 class="summary-value">₹${totalEarnings.toFixed(2)}</h3>
                        <p class="summary-label">Total Earnings</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="summary-card">
                        <h3 class="summary-value">₹${paidEarnings.toFixed(2)}</h3>
                        <p class="summary-label">Paid Amount</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="summary-card">
                        <h3 class="summary-value">₹${unpaidEarnings.toFixed(2)}</h3>
                        <p class="summary-label">Pending Amount</p>
                    </div>
                </div>
            </div>
        `;
        
        // Site Activity
        const siteActivity = {};
        workLogs.forEach(log => {
            const site = this.sites.find(s => s.id === log.siteId);
            if (site) {
                if (!siteActivity[site.name]) {
                    siteActivity[site.name] = { count: 0, amount: 0 };
                }
                siteActivity[site.name].count++;
                siteActivity[site.name].amount += parseFloat(log.amount);
            }
        });
        
        document.getElementById('siteActivity').innerHTML = Object.keys(siteActivity).length > 0 ? 
            Object.entries(siteActivity).map(([siteName, data]) => `
                <div class="mb-3">
                    <h6>${siteName}</h6>
                    <p>Work Days: ${data.count} | Total: ₹${data.amount.toFixed(2)}</p>
                    <div class="progress">
                        <div class="progress-bar" style="width: ${(data.amount / totalEarnings) * 100}%"></div>
                    </div>
                </div>
            `).join('') : '<p>No site activity data available</p>';
        
        // Regional Trends (Mock data for demo)
        document.getElementById('regionalTrends').innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <h6>Construction Activity by Type</h6>
                    <p>Residential: 65% | Commercial: 35%</p>
                </div>
                <div class="col-md-6">
                    <h6>Peak Activity Days</h6>
                    <p>Monday-Friday: High | Weekends: Moderate</p>
                </div>
            </div>
            <p class="text-muted mt-3">
                <i class="fas fa-info-circle"></i> 
                This data can be valuable for construction material suppliers to understand regional trends.
            </p>
        `;
    }

    // Form Management
    showSiteForm(siteId = null) {
        const form = document.getElementById('siteFormCard');
        const formElement = document.getElementById('siteForm');
        
        form.style.display = 'block';
        
        if (siteId) {
            const site = this.sites.find(s => s.id === siteId);
            if (site) {
                document.getElementById('siteId').value = site.id;
                document.getElementById('siteName').value = site.name;
                document.getElementById('siteType').value = site.type;
                document.getElementById('siteAddress').value = site.address;
                document.getElementById('siteContact').value = site.contact || '';
                document.getElementById('siteLocation').value = site.location || '';
            }
        } else {
            formElement.reset();
            document.getElementById('siteId').value = '';
        }
    }

    hideSiteForm() {
        document.getElementById('siteFormCard').style.display = 'none';
        document.getElementById('siteForm').reset();
    }

    showWorkerForm(workerId = null) {
        const form = document.getElementById('workerFormCard');
        const formElement = document.getElementById('workerForm');
        
        form.style.display = 'block';
        
        if (workerId) {
            const worker = this.workers.find(w => w.id === workerId);
            if (worker) {
                document.getElementById('workerId').value = worker.id;
                document.getElementById('workerName').value = worker.name;
                document.getElementById('workerMobile').value = worker.mobile;
                document.getElementById('workerType').value = worker.type;
            }
        } else {
            formElement.reset();
            document.getElementById('workerId').value = '';
        }
    }

    hideWorkerForm() {
        document.getElementById('workerFormCard').style.display = 'none';
        document.getElementById('workerForm').reset();
    }

    showWorkLogForm(workLogId = null) {
        const form = document.getElementById('workLogFormCard');
        const formElement = document.getElementById('workLogForm');
        
        form.style.display = 'block';
        
        if (workLogId) {
            const workLog = this.workLogs.find(w => w.id === workLogId);
            if (workLog) {
                document.getElementById('workLogId').value = workLog.id;
                document.getElementById('workLogFormDate').value = workLog.date;
                document.getElementById('workLogFormSite').value = workLog.siteId;
                document.getElementById('workLogFormWorker').value = workLog.workerId;
                document.getElementById('workLogAmount').value = workLog.amount;
                document.getElementById('workLogNotes').value = workLog.notes || '';
                document.getElementById('workLogPaid').checked = workLog.paid || false;
            }
        } else {
            formElement.reset();
            document.getElementById('workLogId').value = '';
            document.getElementById('workLogFormDate').value = new Date().toISOString().split('T')[0];
        }
    }

    hideWorkLogForm() {
        document.getElementById('workLogFormCard').style.display = 'none';
        document.getElementById('workLogForm').reset();
    }

    // Edit Methods
    editSite(id) {
        this.showSiteForm(id);
    }

    editWorker(id) {
        this.showWorkerForm(id);
    }

    editWorkLog(id) {
        this.showWorkLogForm(id);
    }

    // Update Select Options
    updateSiteSelects() {
        const selects = ['workLogSite', 'workLogFormSite'];
        const sites = this.getUserSites();
        
        selects.forEach(selectId => {
            const select = document.getElementById(selectId);
            if (select) {
                const currentValue = select.value;
                const isFormSelect = selectId.includes('Form');
                
                select.innerHTML = isFormSelect ? 
                    `<option value="">${translate('select_site')}</option>` :
                    `<option value="">${translate('all_sites')}</option>`;
                
                sites.forEach(site => {
                    select.innerHTML += `<option value="${site.id}">${site.name}</option>`;
                });
                
                select.value = currentValue;
            }
        });
    }

    updateWorkerSelects() {
        const selects = ['workLogWorker', 'workLogFormWorker'];
        const workers = this.getUserWorkers();
        
        selects.forEach(selectId => {
            const select = document.getElementById(selectId);
            if (select) {
                const currentValue = select.value;
                const isFormSelect = selectId.includes('Form');
                
                select.innerHTML = isFormSelect ? 
                    `<option value="">${translate('select_worker')}</option>` :
                    `<option value="">${translate('all_workers')}</option>`;
                
                workers.forEach(worker => {
                    select.innerHTML += `<option value="${worker.id}">${worker.name}</option>`;
                });
                
                select.value = currentValue;
            }
        });
    }

    // Utility Methods
    setTodayDate() {
        const today = new Date().toISOString().split('T')[0];
        const dateInputs = ['workLogDate', 'workLogFormDate'];
        dateInputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            if (input && !input.value) {
                input.value = today;
            }
        });
    }

    refreshAllData() {
        this.renderSites();
        this.renderWorkers();
        this.renderWorkLogs();
        this.renderAnalytics();
        this.updateSiteSelects();
        this.updateWorkerSelects();
    }

    // Event Listeners Setup
    setupEventListeners() {
        // Auth Forms
        document.getElementById('loginFormElement').addEventListener('submit', async (e) => {
            e.preventDefault();
            const mobile = document.getElementById('loginMobile').value;
            const password = document.getElementById('loginPassword').value;
            
            const success = await this.login(mobile, password);
            if (success) {
                document.getElementById('loginFormElement').reset();
            }
        });

        document.getElementById('registerFormElement').addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('registerName').value;
            const mobile = document.getElementById('registerMobile').value;
            const password = document.getElementById('registerPassword').value;
            const role = document.getElementById('userRole').value;
            
            const success = this.register(name, mobile, password, role);
            if (success) {
                document.getElementById('registerFormElement').reset();
            }
        });

        // Auth Toggle
        document.getElementById('showRegister').addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('registerForm').style.display = 'block';
        });

        document.getElementById('showLogin').addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('registerForm').style.display = 'none';
            document.getElementById('loginForm').style.display = 'block';
        });

        // Logout
        document.getElementById('logoutBtn').addEventListener('click', () => {
            this.logout();
        });

        // Site Management
        document.getElementById('addSiteBtn').addEventListener('click', () => {
            this.showSiteForm();
        });

        document.getElementById('siteForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const siteData = {
                name: formData.get('siteName') || document.getElementById('siteName').value,
                type: formData.get('siteType') || document.getElementById('siteType').value,
                address: formData.get('siteAddress') || document.getElementById('siteAddress').value,
                contact: formData.get('siteContact') || document.getElementById('siteContact').value,
                location: formData.get('siteLocation') || document.getElementById('siteLocation').value
            };
            
            const siteId = document.getElementById('siteId').value;
            if (siteId) {
                this.updateSite(siteId, siteData);
            } else {
                this.addSite(siteData);
            }
            this.hideSiteForm();
        });

        document.getElementById('cancelSiteBtn').addEventListener('click', () => {
            this.hideSiteForm();
        });

        // Worker Management
        document.getElementById('addWorkerBtn').addEventListener('click', () => {
            this.showWorkerForm();
        });

        document.getElementById('workerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const workerData = {
                name: formData.get('workerName') || document.getElementById('workerName').value,
                mobile: formData.get('workerMobile') || document.getElementById('workerMobile').value,
                type: formData.get('workerType') || document.getElementById('workerType').value
            };
            
            const workerId = document.getElementById('workerId').value;
            if (workerId) {
                this.updateWorker(workerId, workerData);
            } else {
                this.addWorker(workerData);
            }
            this.hideWorkerForm();
        });

        document.getElementById('cancelWorkerBtn').addEventListener('click', () => {
            this.hideWorkerForm();
        });

        // Work Log Management
        document.getElementById('addWorkLogBtn').addEventListener('click', () => {
            this.showWorkLogForm();
        });

        document.getElementById('workLogForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const workLogData = {
                date: formData.get('workLogFormDate') || document.getElementById('workLogFormDate').value,
                siteId: formData.get('workLogFormSite') || document.getElementById('workLogFormSite').value,
                workerId: formData.get('workLogFormWorker') || document.getElementById('workLogFormWorker').value,
                amount: formData.get('workLogAmount') || document.getElementById('workLogAmount').value,
                notes: formData.get('workLogNotes') || document.getElementById('workLogNotes').value,
                paid: document.getElementById('workLogPaid').checked
            };
            
            const workLogId = document.getElementById('workLogId').value;
            if (workLogId) {
                this.updateWorkLog(workLogId, workLogData);
            } else {
                this.addWorkLog(workLogData);
            }
            this.hideWorkLogForm();
        });

        document.getElementById('cancelWorkLogBtn').addEventListener('click', () => {
            this.hideWorkLogForm();
        });

        // Filter Changes
        ['workLogDate', 'workLogSite', 'workLogWorker'].forEach(filterId => {
            document.getElementById(filterId).addEventListener('change', () => {
                this.renderWorkLogs();
            });
        });

        // Tab Changes
        document.querySelectorAll('[data-bs-toggle="tab"]').forEach(tab => {
            tab.addEventListener('shown.bs.tab', (e) => {
                if (e.target.id === 'analytics-tab') {
                    this.renderAnalytics();
                }
            });
        });

        // Auto-save functionality for forms
        this.setupAutoSave();
    }

    setupAutoSave() {
        // Auto-save for all form inputs with debouncing
        const autoSaveInputs = document.querySelectorAll('input, select, textarea');
        autoSaveInputs.forEach(input => {
            let timeout;
            input.addEventListener('input', () => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    // Auto-save logic can be implemented here
                    // For now, we'll just save the current state
                    this.saveData();
                }, 1000); // Save after 1 second of inactivity
            });
        });
    }
}

// Initialize the application
const app = new MasonMestriApp();

// Make app globally available for onclick handlers
window.app = app;