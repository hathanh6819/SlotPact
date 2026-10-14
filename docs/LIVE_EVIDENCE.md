# Live evidence

Status: **SDK happy, forbidden and uncertain lifecycles verified; full adversarial live matrix and production browser journey pending**.

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

Live lifecycle is in progress. Verified operations:

| Operation | Explorer transaction | Observed |
|---|---|---|
| Provider A program | [transaction](https://explorer-studio.genlayer.com/transactions/0xab8546f532d8ea85bc7abb602ee19356d77ba65e2fa0308f1ed44cc224a3591c) | Finalized; MAJORITY_AGREE; program 1 belongs to wallet A |
| Provider B program | [transaction](https://explorer-studio.genlayer.com/transactions/0xede859302f407fbd2b2e20b1c49400ef29578abff1757777dcf3a4f7aa076bdd) | Finalized; program 2 belongs to wallet B |
| Provider B slot | [transaction](https://explorer-studio.genlayer.com/transactions/0xa12d9653a41375f8dd65817a91cc54991a58263791c8cc1fb694e834932db1af) | Finalized; SUCCESS; MAJORITY_AGREE |
| Happy proposal | [transaction](https://explorer-studio.genlayer.com/transactions/0x170d8a9ae3295c31c751e48518432c1415936706ff60d789c37ccd892829fe5c) | Finalized; SUCCESS; MAJORITY_AGREE; A lot available 3 / reserved 2 |
| Happy consent | [transaction](https://explorer-studio.genlayer.com/transactions/0x3286443e025ad9bd66a62579e2c309114ac5e7e35a4ef84f37c232da6042462f) | Both reservations active, exact digest accepted |
| Happy assessment | [transaction](https://explorer-studio.genlayer.com/transactions/0x413003334e246f2f6bc9c72654f326f853132a7cf8896585ede6e8c0a5743517) | ALLOWED / ALLOWED; SETTLED; recipient lots 3 and 4 |
| Booking | [transaction](https://explorer-studio.genlayer.com/transactions/0x63a6eb9e18d395f6e646711c9cdf3fa8e41b95dcad74c9baf5033027ea1c561c) | Booking 1 CONFIRMED; slot 1 BOOKED; lot 4 available 0 |
| Forbidden assessment | [transaction](https://explorer-studio.genlayer.com/transactions/0xef1fb518697ed4a2e388646459d6395cc39a35ff63d020268e1224c3ceedab44) | ALLOWED / FORBIDDEN; BLOCKED; both reservations released; no recipient lots |
| Uncertain assessment | [transaction](https://explorer-studio.genlayer.com/transactions/0xfbb9f77162dfb46ea986375b197bf9be9d3dd04ffe50ecf9a86ea4001cd2fc07) | UNCERTAIN / ALLOWED; UNRESOLVED; both reservations released; no recipient lots |

Complete filtered transaction metadata, exact calldata, policy snapshots and finalized readbacks are in [live-e2e.json](live-e2e.json). All 13 recorded transactions finalized with successful execution and MAJORITY_AGREE. Final counts: 2 programs, 4 lots, 1 slot, 3 swaps, 1 booking. Final available plus reserved credits are 5 for program A and 4 for program B; program B's remaining unit is consumed by booking 1. Original lots 1 and 2 have no reserved units.

This packet demonstrates SDK execution. Wrong-wallet, wrong-digest, replay, expiry and injection cases still require live evidence; their direct local tests do not substitute for that evidence. Frontend production hosting and browser wallet signing remain unverified.

`genlayer-js` 1.1.8 `waitForTransactionReceipt` returns the finalized GenLayer transaction on this RPC. Execution must be obtained separately from `getTransactionReceipt`; Ethereum receipt `status: success` is checked together with GenLayer `statusName: FINALIZED` and explicit `AGREE` or `MAJORITY_AGREE`. The frontend regression test rejects missing execution, missing consensus and ACCEPTED-only results.

## Superseded failed deployment

- Transaction: `0x303e597bd296ae605719a649a8b744f4a993ecd36b6813a49ab5f6389b698016`
- Constructor: `slotpact-studio-2026-10-14-a`
- Consensus: accepted agreement on the same execution error
- Execution: `ERROR`; no usable contract instance
- Root cause: the Studionet storage runtime rejected `TreeMap[str,str]` during constructor initialization.
- Remediation: policy storage now uses a collision-free packed `u256` key `(program_id << 64) | version`; direct regression forbids string-keyed `TreeMap` declarations.
