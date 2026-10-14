# Live evidence

Status: **deployment identity verified; two-wallet lifecycle pending**.

This file is a release gate, not a placeholder claim. Add evidence only after the exact committed source is deployed and exercised by two non-deployer wallets.

## Release identity

- Git commit containing deployed source: `41136ba1b150b303ab22055c1cb18487707b9159`
- Contract source SHA-256: `c70a65b05fb54bd8fbed0e1f96cd376e6a84a47f92084475f9f2c0ce9dba1ebc`
- Studionet contract: [`0x64F95408268469E46e79526E39e069Ee95BCebad`](https://explorer-studio.genlayer.com/address/0x64F95408268469E46e79526E39e069Ee95BCebad)
- Network: GenLayer Studionet, chain ID `61999`, RPC `https://studio.genlayer.com/api`
- Constructor instance domain: `slotpact-studio-2026-10-14-a`
- Frontend deployment: pending

The deployed source returned by `gen_getContractCode` is 16,096 bytes and hashes exactly to the local source SHA-256 above. Finalized initial readback:

```json
{"get_protocol":{"architecture":"versioned-credit-lots-bilateral-reservation-semantic-two-leg-gate-atomic-booking","custody":false,"deployer_privileges":false,"external_sources":false,"instance_domain":"slotpact-studio-2026-10-14-a","name":"SlotPact","version":1},"get_counts":{"bookings":0,"lots":0,"programs":0,"slots":0,"swaps":0}}
```

## Transactions and readbacks

No operational transaction has been claimed yet. Populate the happy, forbidden, uncertain, authorization, binding, replay, expiry and booking rows described in `TEST_AND_EVIDENCE.md` with explorer links and canonical JSON artifacts.

## Superseded failed deployment

- Transaction: `0x303e597bd296ae605719a649a8b744f4a993ecd36b6813a49ab5f6389b698016`
- Constructor: `slotpact-studio-2026-10-14-a`
- Consensus: accepted agreement on the same execution error
- Execution: `ERROR`; no usable contract instance
- Root cause: the Studionet storage runtime rejected `TreeMap[str,str]` during constructor initialization.
- Remediation: policy storage now uses a collision-free packed `u256` key `(program_id << 64) | version`; direct regression forbids string-keyed `TreeMap` declarations.
