# ShadowChat v10 - QA & Evaluation Framework

## Quality Gates (Enforced by Bot 5)

1. **Unit Test Coverage**: >80% on critical paths (Casino, Mining, AI Agent)
2. **Integration Tests**: Real-time features, Web3 interactions
3. **E2E Smoke Tests**: Core user journeys
4. **Safety & Privacy Tests**: No PII leakage, content moderation
5. **Performance Benchmarks**: < 200ms response for chat, stable casino mining

## Running Tests
```bash
pnpm test
pnpm test:coverage
pnpm test:e2e
```

Bot 5 owns continuous quality enforcement across all parallel bots.
