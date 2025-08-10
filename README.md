# 🚀 Polaris Marketing - Standalone Repository

![Polaris Platform](./public/assets/logos/polaris-logo-horizontal.png)

The official marketing website for Polaris Platform - an independent, containerized Next.js application.

## 🌟 Features

- **📱 Responsive Design** - Modern, mobile-first interface with Tailwind CSS
- **🌍 Multi-language Support** - English, Spanish, and German localization
- **⚡ High Performance** - Optimized Next.js with static generation
- **📊 Real-time Statistics** - Dynamic platform statistics display
- **📝 Blog System** - Multi-language blog with consistent content validation
- **📧 Contact Forms** - Integrated email functionality with SMTP
- **🔗 Google Sheets Integration** - Dynamic team and testimonials data
- **🐳 Docker Ready** - Production-optimized containerization
- **🔒 Security First** - Environment validation and security headers

## 🏗️ Architecture

This is a standalone Next.js application that was extracted from the Polaris monorepo to enable independent deployment and scaling.

### Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Internationalization**: next-i18next
- **Email**: Nodemailer
- **Data**: Google Sheets API
- **Deployment**: Docker, GitHub Actions

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- npm 9.x or higher
- Docker (for containerized deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Polaris-Platfom/polaris-marketing.git
   cd polaris-marketing
   ```

2. **Install dependencies**
   ```bash
   npm ci
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Docker Development

```bash
# Build and run development container
docker-compose -f docker-compose.dev.yml up --build

# Or use the production setup
docker-compose up --build
```

## 🔧 Configuration

### Environment Variables

Copy `env.example` to `.env.local` and configure:

- **Application URLs**: Set correct URLs for API, Platform, and Marketing
- **Email Configuration**: SMTP settings for contact forms
- **Google Sheets**: Service account credentials for dynamic data
- **Analytics**: Google Analytics and Tag Manager IDs

### Google Sheets Setup

For dynamic team and testimonials data:

1. Create a Google Cloud service account
2. Generate a private key (JSON)
3. Share your Google Sheet with the service account email
4. Add the credentials to your environment variables

Detailed setup guide: [docs/setup/google-sheets-setup.md](docs/setup/google-sheets-setup.md)

## 🚀 Deployment

### Production Deployment

The application uses GitHub Actions for automated deployment:

1. **Set up repository secrets**:
   - `DEPLOY_HOST`: Your server IP/domain
   - `DEPLOY_USER`: SSH username
   - `DEPLOY_KEY`: SSH private key

2. **Deploy**:
   - Push to `main` branch for automatic deployment
   - Or use manual dispatch with version selection

### Manual Docker Deployment

```bash
# Build production image
docker build -f Dockerfile -t polaris-marketing .

# Run container
docker run -p 3000:3000 --env-file .env.local polaris-marketing
```

## 📁 Project Structure

```
polaris-marketing/
├── src/
│   ├── components/          # React components
│   │   ├── home/           # Homepage sections
│   │   ├── layout/         # Layout components
│   │   └── ui/             # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility libraries
│   ├── pages/              # Next.js pages and API routes
│   ├── styles/             # Global styles
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
├── public/
│   ├── assets/             # Static assets (logos, icons)
│   ├── data/               # JSON data files
│   └── locales/            # Translation files
├── docs/                   # Documentation
├── scripts/                # Build and validation scripts
└── Docker configuration files
```

## 🌍 Internationalization

The application supports multiple languages:

- **English** (`en`) - Primary language
- **Spanish** (`es`) - Secondary language  
- **German** (`de`) - Tertiary language

Translation files are located in `public/locales/[lang]/` and managed through next-i18next.

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks
- `npm run validate:blog` - Validate blog content consistency

### Code Quality

- **ESLint**: Code linting with TypeScript support
- **Prettier**: Code formatting
- **TypeScript**: Type safety
- **Husky**: Git hooks (if configured)

## 📊 Monitoring & Health Checks

The application includes built-in health checks:

- **Endpoint**: `/api/health`
- **Docker**: Automatic health check configuration
- **Monitoring**: Ready for integration with monitoring tools

## 🔒 Security

- **Environment Validation**: Comprehensive environment variable validation
- **Security Headers**: Implemented security best practices
- **Container Security**: Non-root user, minimal attack surface
- **Dependency Scanning**: Trivy security scanning in CI/CD

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- All code must be written in English (comments, variables, functions)
- Follow the established TypeScript and React best practices
- Ensure all environment variables are properly validated
- Test Docker builds before submitting PRs
- Maintain translation consistency across all languages

## 📄 License

This project is proprietary software owned by Polaris Platform.

## 🆘 Support

For questions and support:

- **Documentation**: Check the `docs/` directory
- **Issues**: Open an issue on GitHub
- **Contact**: reach out to the development team

## 🎯 Roadmap

- [ ] Performance optimizations
- [ ] Advanced analytics integration
- [ ] A/B testing framework
- [ ] Enhanced SEO features
- [ ] Progressive Web App (PWA) capabilities

---

Built with ❤️ by the Polaris Platform Team