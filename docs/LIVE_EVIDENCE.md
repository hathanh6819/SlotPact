# Live evidence

Status: **not yet deployed**.

This file is a release gate, not a placeholder claim. Add evidence only after the exact committed source is deployed and exercised by two non-deployer wallets.

## Release identity

- Git commit: pending
- Contract source SHA-256: pending
- Studio Next contract: pending
- Constructor instance domain: pending
- Frontend deployment: pending

## Transactions and readbacks

No live transaction has been claimed yet. Populate the happy, forbidden, uncertain, authorization, binding, replay, expiry and booking rows described in `TEST_AND_EVIDENCE.md` with explorer links and canonical JSON artifacts.

## Superseded failed deployment

- Transaction: `0x303e597bd296ae605719a649a8b744f4a993ecd36b6813a49ab5f6389b698016`
- Constructor: `slotpact-studio-2026-10-14-a`
- Consensus: accepted agreement on the same execution error
- Execution: `ERROR`; no usable contract instance
- Root cause: the Studionet storage runtime rejected `TreeMap[str,str]` during constructor initialization.
- Remediation: policy storage now uses a collision-free packed `u256` key `(program_id << 64) | version`; direct regression forbids string-keyed `TreeMap` declarations.
