# ════════════════════════════════════════════════════════════════════════════
# SKY444 Backend — FastAPI + PoW blockchain
# Multi-stage build for minimal production image
# ════════════════════════════════════════════════════════════════════════════
FROM python:3.11-slim AS base

# System deps for cryptography + general build
RUN apt-get update && apt-get install -y --no-install-recommends \
      build-essential \
      libssl-dev \
      libffi-dev \
      curl \
 && rm -rf /var/lib/apt/lists/*

# Create unprivileged user for defense-in-depth
RUN groupadd -r sky444 && useradd -r -g sky444 -s /bin/false sky444

WORKDIR /app

# ─── Dependencies layer (cached) ───────────────────────────────────────────
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip \
 && pip install --no-cache-dir -r requirements.txt

# ─── Application code ──────────────────────────────────────────────────────
COPY . .

# Ensure blockchain data dir exists
RUN mkdir -p /app/data && chown -R sky444:sky444 /app

USER sky444

EXPOSE 8000

# Healthcheck command used by Compose
HEALTHCHECK --interval=30s --timeout=10s --start-period=20s --retries=3 \
  CMD python3 -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/').read()" || exit 1

# Production server: uvicorn with Gunicorn-style worker concurrency
CMD ["uvicorn", "main:app", \
     "--host", "0.0.0.0", \
     "--port", "8000", \
     "--workers", "2", \
     "--log-level", "info", \
     "--proxy-headers", \
     "--forwarded-allow-ips", "*"]
