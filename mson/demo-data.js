// Demo Data for Mason Mestri Tracker
// This file contains sample data to demonstrate the application functionality

const demoData = {
    users: [
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
    ],
    
    sites: [
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
        },
        {
            id: "site_3",
            userId: "demo_admin_1",
            name: "Sunrise Villa",
            type: "residential",
            address: "789 Beach Road, Chennai, Tamil Nadu 600001",
            contact: "9876543214",
            location: "13.0827, 80.2707",
            createdAt: "2024-01-03T00:00:00.000Z"
        }
    ],
    
    workers: [
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
        },
        {
            id: "worker_3",
            userId: "demo_admin_1",
            name: "Prakash Kumar",
            mobile: "9876543217",
            type: "temporary",
            createdAt: "2024-01-05T00:00:00.000Z"
        },
        {
            id: "worker_4",
            userId: "demo_admin_1",
            name: "Vinod Mestri",
            mobile: "9876543218",
            type: "permanent",
            createdAt: "2024-01-01T00:00:00.000Z"
        }
    ],
    
    workLogs: [
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
            date: "2024-01-15",
            siteId: "site_1",
            workerId: "worker_2",
            amount: "1200.00",
            notes: "Brick laying work",
            paid: true,
            createdAt: "2024-01-15T08:30:00.000Z"
        },
        {
            id: "log_3",
            userId: "demo_admin_1",
            date: "2024-01-16",
            siteId: "site_2",
            workerId: "worker_1",
            amount: "1800.00",
            notes: "Concrete pouring",
            paid: false,
            createdAt: "2024-01-16T09:00:00.000Z"
        },
        {
            id: "log_4",
            userId: "demo_admin_1",
            date: "2024-01-16",
            siteId: "site_2",
            workerId: "worker_3",
            amount: "1000.00",
            notes: "Helper work",
            paid: false,
            createdAt: "2024-01-16T09:15:00.000Z"
        },
        {
            id: "log_5",
            userId: "demo_admin_1",
            date: "2024-01-17",
            siteId: "site_3",
            workerId: "worker_4",
            amount: "1600.00",
            notes: "Plastering work",
            paid: true,
            createdAt: "2024-01-17T10:00:00.000Z"
        },
        {
            id: "log_6",
            userId: "demo_admin_1",
            date: "2024-01-17",
            siteId: "site_1",
            workerId: "worker_2",
            amount: "1300.00",
            notes: "Electrical conduit installation",
            paid: false,
            createdAt: "2024-01-17T10:30:00.000Z"
        },
        {
            id: "log_7",
            userId: "demo_admin_1",
            date: "2024-01-18",
            siteId: "site_2",
            workerId: "worker_1",
            amount: "2000.00",
            notes: "Structural work supervision",
            paid: false,
            createdAt: "2024-01-18T08:00:00.000Z"
        },
        {
            id: "log_8",
            userId: "demo_admin_1",
            date: "2024-01-18",
            siteId: "site_3",
            workerId: "worker_4",
            amount: "1400.00",
            notes: "Tile work",
            paid: true,
            createdAt: "2024-01-18T11:00:00.000Z"
        }
    ]
};

// Function to load demo data
async function loadDemoData() {
    const result = await Swal.fire({
        title: 'Load Demo Data?',
        text: 'This will load demo data and overwrite any existing data. Continue?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#8B4513',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Yes, load demo data',
        cancelButtonText: 'Cancel'
    });
    
    if (result.isConfirmed) {
        localStorage.setItem('users', JSON.stringify(demoData.users));
        localStorage.setItem('sites', JSON.stringify(demoData.sites));
        localStorage.setItem('workers', JSON.stringify(demoData.workers));
        localStorage.setItem('workLogs', JSON.stringify(demoData.workLogs));
        
        await Swal.fire({
            title: 'Demo Data Loaded!',
            html: `
                <p>Demo data loaded successfully!</p>
                <p><strong>Login Credentials:</strong></p>
                <p>Admin: 9876543210 / admin123</p>
                <p>Worker: 9876543211 / worker123</p>
            `,
            icon: 'success',
            confirmButtonColor: '#8B4513'
        });
        
        location.reload();
    }
}

// Function to clear all data
async function clearAllData() {
    const result = await Swal.fire({
        title: 'Clear All Data?',
        text: 'This will delete all data permanently. Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Yes, delete all data',
        cancelButtonText: 'Cancel'
    });
    
    if (result.isConfirmed) {
        localStorage.clear();
        
        await Swal.fire({
            title: 'Data Cleared!',
            text: 'All data cleared successfully!',
            icon: 'success',
            confirmButtonColor: '#8B4513'
        });
        
        location.reload();
    }
}

// Add demo data controls to the page
document.addEventListener('DOMContentLoaded', function() {
    // Add demo controls to auth screen
    const authCard = document.querySelector('.auth-card');
    if (authCard) {
        const demoControls = document.createElement('div');
        demoControls.className = 'mt-4 text-center';
        demoControls.innerHTML = `
            <hr>
            <h6>Demo Controls</h6>
            <button type="button" class="btn btn-outline-secondary btn-sm me-2" onclick="loadDemoData()">
                Load Demo Data
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm" onclick="clearAllData()">
                Clear All Data
            </button>
            <p class="text-muted mt-2 small">
                Demo Login: Admin (9876543210/admin123) | Worker (9876543211/worker123)
            </p>
        `;
        authCard.appendChild(demoControls);
    }
});