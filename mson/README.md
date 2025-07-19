# Mason Mestri Tracker

A mobile-first web application designed for mason mestris (skilled artisans) to track daily work, manage teams, and monitor construction projects. Built with accessibility and simplicity in mind for non-tech-savvy users.

## Features

### 🏗️ Core Functionality
- **Site Management**: Create and manage multiple construction sites (residential/commercial)
- **Team Management**: Add permanent team members or temporary workers
- **Daily Work Tracking**: Log daily work entries with earnings and notes
- **Payment Tracking**: Mark payments and track pending amounts
- **Multi-language Support**: English, Malayalam, Tamil, Hindi

### 👥 User Roles
- **Admin (Business Owner)**: Full access to all data and analytics
- **Worker (Mason Mestri)**: Access to work tracking and team management

### 📱 Mobile-First Design
- Responsive design optimized for mobile devices
- Large, touch-friendly buttons and inputs
- High-contrast earth-tone color scheme
- Accessibility features for users with disabilities

### 🌍 Multilingual Support
- Dynamic language switching
- Comprehensive translations for all UI elements
- Persistent language preferences

### 💾 Local Storage
- All data stored locally in browser
- Real-time auto-save functionality
- No backend required - perfect for demo purposes

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **CSS Framework**: Bootstrap 5.3.0
- **Icons**: Font Awesome 6.0.0
- **Storage**: Browser Local Storage
- **Deployment**: GitHub Pages compatible

## Color Palette (Earth Tones)

- **Primary Brown**: #8B4513
- **Tan**: #D2B48C
- **Beige**: #F5F5DC
- **Green**: #6B8E23
- **Orange**: #CD853F
- **Dark**: #654321
- **Light**: #F4E4BC

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required

### Installation
1. Clone or download the repository
2. Open `index.html` in a web browser
3. Start using the application immediately

### Demo Deployment
This application is designed to be deployed on GitHub Pages:
1. Push code to a GitHub repository
2. Enable GitHub Pages in repository settings
3. Access via `https://username.github.io/repository-name`

## Usage Guide

### First Time Setup
1. Open the application
2. Register as either Admin or Worker
3. Select your preferred language
4. Start adding sites and team members

### Daily Workflow
1. **Add Sites**: Create construction sites with details
2. **Manage Team**: Add permanent or temporary workers
3. **Log Work**: Record daily work entries with earnings
4. **Track Payments**: Mark payments to reset pending amounts
5. **View Analytics**: (Admin only) Monitor earnings and trends

### Key Features

#### Site Management
- Add site name, type (residential/commercial), address
- Optional contact number and map location
- Edit or delete existing sites

#### Worker Management
- Add worker name and mobile number
- Classify as permanent team member or temporary worker
- Maintain worker database for easy selection

#### Daily Work Logging
- Select date, site, and worker
- Enter earning amount and optional notes
- Mark as paid to track payment status
- Filter logs by date, site, or worker

#### Analytics (Admin Only)
- Earnings summary (total, paid, pending)
- Site activity breakdown
- Regional construction trends (for business insights)

## Data Structure

### Users
```javascript
{
  id: "unique_id",
  name: "User Name",
  mobile: "phone_number",
  password: "password",
  role: "admin|worker",
  createdAt: "ISO_date"
}
```

### Sites
```javascript
{
  id: "unique_id",
  userId: "owner_id",
  name: "Site Name",
  type: "residential|commercial",
  address: "Full Address",
  contact: "Contact Number",
  location: "Lat, Long",
  createdAt: "ISO_date"
}
```

### Workers
```javascript
{
  id: "unique_id",
  userId: "owner_id",
  name: "Worker Name",
  mobile: "Phone Number",
  type: "permanent|temporary",
  createdAt: "ISO_date"
}
```

### Work Logs
```javascript
{
  id: "unique_id",
  userId: "owner_id",
  date: "YYYY-MM-DD",
  siteId: "site_id",
  workerId: "worker_id",
  amount: "earning_amount",
  notes: "Optional notes",
  paid: boolean,
  createdAt: "ISO_date"
}
```

## Accessibility Features

- **High Contrast Mode**: Supports system preference
- **Large Touch Targets**: Minimum 48px for mobile
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Keyboard Navigation**: Full keyboard accessibility
- **Reduced Motion**: Respects user motion preferences
- **Focus Indicators**: Clear focus outlines for navigation

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Business Model Insights

The application collects valuable construction activity data that can be leveraged for:
- Regional construction trend analysis
- Material supplier partnerships
- Market insights for construction industry
- Commission-based revenue opportunities

## Security Considerations

- All data stored locally (no server transmission)
- Basic password protection for user accounts
- No sensitive data encryption (demo purposes)
- Consider HTTPS for production deployment

## Future Enhancements

- **Photo Upload**: Add photos to work logs
- **GPS Integration**: Automatic location tracking
- **Offline Support**: Service worker for offline functionality
- **Export Features**: PDF reports and data export
- **Push Notifications**: Payment reminders
- **Advanced Analytics**: Charts and graphs
- **Multi-currency Support**: Different currency options

## Contributing

This is a demo application. For production use, consider:
- Backend integration for data persistence
- User authentication and authorization
- Data encryption and security measures
- Advanced analytics and reporting
- Mobile app development

## License

This project is created for demonstration purposes. Feel free to use and modify as needed.

## Support

For questions or issues, please refer to the code comments and documentation within the application files.

---

**Note**: This application is designed as a frontend-only demo for GitHub Pages deployment. For production use, implement proper backend services, authentication, and security measures.