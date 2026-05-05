# Kavach Frontend

Next.js 14 frontend for Kavach - AI Legal Document Engine for India.

## Features

- Modern React with Next.js 14 App Router
- TypeScript for type safety
- shadcn/ui component library
- Tailwind CSS for styling
- Dark theme with purple/magenta accent system
- Responsive design
- Real-time document preview
- Form validation with react-hook-form
- SWR for data fetching

## Tech Stack

- **Framework**: Next.js 14.0.4
- **Language**: TypeScript 5.3.3
- **Styling**: Tailwind CSS 3.3.6
- **UI Components**: shadcn/ui (Radix UI)
- **Forms**: react-hook-form 7.48.2
- **Data Fetching**: SWR 2.2.4
- **Authentication**: NextAuth.js 4.24.5
- **Animations**: Framer Motion 10.16.16

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/kavach.git
   cd kavach/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Visit http://localhost:3000

## Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── (auth)/            # Auth pages
│   └── (dashboard)/      # Dashboard pages
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Layout components
│   ├── dashboard/        # Dashboard components
│   ├── generator/        # Document generator components
│   └── shared/           # Shared components
├── lib/                   # Utility functions
│   ├── api.ts            # API client
│   ├── auth.ts           # Auth utilities
│   └── utils.ts          # Helper functions
└── styles/               # Global styles
    └── globals.css       # Design tokens
```

## Design System

### Colors
- **Primary**: Purple (#8B5CF6)
- **Secondary**: Magenta (#D946EF)
- **Background**: Deep dark (#0F0F1A)
- **Card**: Dark (#1A1A2E)
- **Text**: White (#F8FAFC)
- **Muted**: Gray (#94A3B8)

### Components
- **StatCard**: Dashboard statistics
- **DocumentCard**: Document listing
- **Sidebar**: Navigation sidebar
- **TopBar**: Header bar
- **SmartForm**: Dynamic form generator
- **PreviewPane**: Live document preview

## Pages

### Public Pages
- `/` - Landing page
- `/login` - Login page
- `/register` - Registration page

### Dashboard Pages
- `/dashboard` - Overview dashboard
- `/dashboard/generate` - Document generator
- `/dashboard/documents` - My documents
- `/dashboard/templates` - Templates library
- `/dashboard/settings` - Settings

## Development

### Run tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm run test:watch
```

### Run tests with coverage
```bash
npm run test:coverage
```

### Build for production
```bash
npm run build
```

### Start production server
```bash
npm start
```

### Lint code
```bash
npm run lint
```

## Environment Variables

See `.env.example` for required environment variables:

- `NEXT_PUBLIC_API_URL` - Backend API URL
- `NEXTAUTH_SECRET` - NextAuth secret
- `NEXTAUTH_URL` - Application URL
- `NEXT_PUBLIC_RAZORPAY_KEY_ID` - Razorpay key ID

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Set environment variables in Vercel dashboard
3. Deploy

### Docker
```bash
docker build -t kavach-frontend .
docker run -p 3000:3000 kavach-frontend
```

## Performance

- Static generation where possible
- Image optimization with Next.js Image
- Code splitting with dynamic imports
- Lazy loading for heavy components
- SWR for efficient data fetching

## Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Screen reader support
- Color contrast compliance

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - see LICENSE file for details.
