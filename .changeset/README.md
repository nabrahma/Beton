# Changesets

Every pull request that changes a published package needs a changeset:

```sh
pnpm changeset
```

Pick the affected packages, choose a bump type, and write one sentence a user
would understand. The release workflow turns merged changesets into version
bumps, changelog entries and npm releases.
