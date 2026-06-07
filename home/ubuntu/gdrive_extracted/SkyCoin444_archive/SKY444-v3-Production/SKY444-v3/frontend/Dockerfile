# ════════════════════════════════════════════════════════════════════════════
# SKY444 Frontend — Vite + React production build
# Multi-stage: Node build → Nginx static serve (final image ≈ 40 MB)
# ════════════════════════════════════════════════════════════════════════════

# ─── STAGE 1: Build ────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

# Install pnpm for efficient dep management
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy manifests first for layer caching
COPY package.json pnpm-lock.yaml* ./

# Install dependencies (honor lockfile if present)
RUN pnpm install --prefer-frozen-lockfile || pnpm install

# Copy source and build
COPY . .
RUN pnpm run build

# ─── STAGE 2: Serve ────────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS runner

# Remove default Nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Frontend-specific Nginx config (SPA fallback, long cache for assets)
COPY <<'EOF' /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript
               text/xml application/xml application/xml+rss text/javascript
               image/svg+xml;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=(self)" always;

    # Hashed assets: immutable long cache
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
        try_files $uri =404;
    }

    # PWA manifest / SW / icons — shorter cache
    location ~* \.(webmanifest|json|svg|png|ico)$ {
        expires 1d;
        add_header Cache-Control "public, must-revalidate";
        try_files $uri =404;
    }

    # Service worker must always revalidate
    location = /sw.js {
        expires off;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        try_files $uri =404;
    }

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Health check endpoint
    location = /health {
        access_log off;
        return 200 "ok\n";
        add_header Content-Type text/plain;
    }
}
EOF

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget --spider -q http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
