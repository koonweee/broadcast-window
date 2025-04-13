# Broadcast Window

A React frontend to watch streams broadcasted using [broadcast-box](https://github.com/Glimesh/broadcast-box), built with Next.js. This adds Google OAuth (and can be extended to other OAuth providers).

## Prerequisites

Before you begin, ensure you have:
- Node.js 18.0.0 or higher
- A running instance of [broadcast-box](https://github.com/Glimesh/broadcast-box)
- Google OAuth credentials (for authentication)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/broadcast-window.git
cd broadcast-window
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   - Fill in the required values:
     - `GOOGLE_CLIENT_ID`: Your Google OAuth client ID
     - `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret
     - `NEXT_PUBLIC_API_HOSTNAME`: Hostname of your broadcast-box instance (e.g., `http://localhost:8080`)
     - `NEXT_PUBLIC_STREAM_KEY`: The stream key configured in your streaming software

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Building for Production

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```
