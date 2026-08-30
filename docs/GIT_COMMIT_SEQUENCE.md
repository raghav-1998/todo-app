CHAPTER-5

<!-- git add docker-compose.yml
git commit -m "chore: add postgres docker environment" -->

<!-- git add backend/prisma.config.ts backend/prisma
git commit -m "feat: configure prisma database schema" -->

<!-- git add backend/src/db
git commit -m "feat: add prisma database client" -->

git add backend/src/repositories
git commit -m "feat: add database repository foundation"

<!-- git add backend/src/repositories
git commit -m "feat: add database repository foundation" -->


CHAPTER-6

<!-- Commit 1 — Dependencies
git add backend/package.json backend/package-lock.json
git commit -m "feat: add authentication dependencies"

Commit 2 — Environment
git add backend/src/config backend/.env.example
git commit -m "feat: configure authentication environment" -->

Commit 3 — Security Utilities
git add backend/src/utils
git commit -m "feat: add password and token utilities"

Commit 4 — Auth Repository
git add backend/src/repositories/auth.repository.ts
git commit -m "feat: add auth repository"

Commit 5 — Auth Service
git add backend/src/services/auth.service.ts
git commit -m "feat: add authentication service"

Commit 6 — Auth Controller & Validation
git add backend/src/controllers/auth.controller.ts
git add backend/src/validators/auth.validator.ts
git commit -m "feat: add authentication controllers and validation"

Commit 7 — Authentication Middleware
git add backend/src/middleware/auth.middleware.ts
git add backend/src/types/express.d.ts
git commit -m "feat: add authentication middleware"

Commit 8 — Auth Routes
git add backend/src/routes
git commit -m "feat: add authentication routes"

Commit 9 — Cookie/CORS Integration
git add backend/src/config/cookie.ts backend/src/app.ts
git commit -m "feat: configure authentication cookies and cors"