# Structure

```bash
.
├── public               # CRA stuff.
├── src
│   └── assets
│   │   │── svgs
│   │   │── images       # PNGs, JPEGs, WEBPs, etc.
│   ├── components
│   │   │── common
│   │   │── boards
│   │   │── account      # Components related to the user's account.
│   │   └── etc      
│   │── pages
│   │── services         # Connection w/ the API, 3rd parties, etc.
│   │── hooks            # Hooks that are used in multiple components.
│   │── utils
│   │── stores           # Zustand hooks for state management.
│   └── theme
└── config-overrides     # Custom configuration for imports.
```