## Getting Started

```ts
notepad-frontend/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/                      # API routes
│   │   │   └── auth/
│   │   │       └── [...nextauth]/
│   │   │           └── route.ts
│   │   ├── auth/                     # Auth pages
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── signup/
│   │   │       └── page.tsx
│   │   ├── dashboard/               # Protected dashboard
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/                   # Reusable components
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── SignUpForm.tsx
│   │   │   └── AuthGuard.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Layout.tsx
│   │   └── ui/
│   │       ├── LoadingSpinner.tsx
│   │       └── ErrorAlert.tsx
│   ├── lib/                         # Core libraries and configurations
│   │   ├── auth.ts                  # NextAuth configuration
│   │   ├── theme.ts                 # Material-UI theme
│   │   └── providers.tsx            # App providers
│   ├── repositories/                # Repository pattern implementation
│   │   ├── interfaces/
│   │   │   ├── IAuthRepository.ts
│   │   │   └── INoteRepository.ts   # For future notes implementation
│   │   ├── implementations/
│   │   │   ├── AuthRepository.ts
│   │   │   └── NoteRepository.ts    # For future notes implementation
│   │   └── RepositoryFactory.ts
│   ├── services/                    # Business logic services
│   │   ├── AuthService.ts
│   │   └── NoteService.ts           # For future notes implementation
│   ├── store/                       # Redux store configuration
│   │   ├── slices/
│   │   │   ├── authSlice.ts
│   │   │   └── noteSlice.ts         # For future notes implementation
│   │   ├── api/
│   │   │   ├── authApi.ts
│   │   │   └── noteApi.ts           # For future notes implementation
│   │   ├── store.ts
│   │   └── hooks.ts
│   ├── types/                       # TypeScript type definitions
│   │   ├── auth.types.ts
│   │   ├── note.types.ts            # For future notes implementation
│   │   └── api.types.ts
│   └── utils/                       # Utility functions
│       ├── validation.ts
│       └── constants.ts
├── public/
├── .env.example
├── .gitignore
├── next.config.js
├── package.json
├── README.md
└── tsconfig.json
```