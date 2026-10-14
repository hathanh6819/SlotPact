# Live evidence

Status: **SDK lifecycle and 24-case adversarial live matrix verified on Studionet; production hosting pending**.

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

Verified operations:

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

This packet demonstrates transactions signed by two independent non-deployer wallets through `genlayer-js`. Browser-wallet signing is not part of the evidence claim. Frontend production hosting remains pending.

## Additional live adversarial audit

The complete checkpointed packet is [live-audit.json](live-audit.json): **24/24 cases verified, result `PASS`**. Every transaction reached `FINALIZED` with `MAJORITY_AGREE`. Every rejected call records the expected leader rollback payload and an identical complete decoded state snapshot before/after.

Coverage includes provider-only authorization, wrong lot owner, wrong counterparty, wrong proposer, digest mismatch, over-reservation, premature expiry, settlement/accept/cancel/expiry replay, cancellation of a matched pact, an expired acceptance, successful cancellation and expiry release. The prompt-injection sequence ([proposal](https://explorer-studio.genlayer.com/transactions/0x000a6734cb56d145d990c8a6ca88567b39159f752326797f1f36744d83d5a5ee), [acceptance](https://explorer-studio.genlayer.com/transactions/0xf8a2d28a8b31486dda894cc4930fb25c99de6cad123500a0d989c0c19edec8d3), [assessment](https://explorer-studio.genlayer.com/transactions/0xc91d12db07171a63d2c86e4a14c1fe539160c2e09eea3f6ad5141bbe1d8b2162)) could not force `ALLOWED`: the two-leg result was `FORBIDDEN / ALLOWED`, the pact finished `BLOCKED`, and both reservations were released. The expiry sequence rejected late acceptance with `SWAP_EXPIRED`, then [released the reservation](https://explorer-studio.genlayer.com/transactions/0x9d5111f0cb853316e1d67925097397470d1f4036cdeb6da55c7a0e1b84bc3ab2) and rejected replay with `WRONG_PHASE`.

`python scripts/verify_live_evidence.py` independently reports `Evidence integrity PASS; verified live audit cases: 24`. Forced public-validator disagreement cannot be induced by the two test wallets and remains covered only by the local consensus-boundary test.

See [BROWSER_VERIFICATION.md](BROWSER_VERIFICATION.md) for production-build UI readback. It matches the three primary live semantic outcomes and booking. Live transaction evidence was signed through the SDK, as stated above.

`genlayer-js` 1.1.8 `waitForTransactionReceipt` returns the finalized GenLayer transaction on this RPC. Execution must be obtained separately from `getTransactionReceipt`; Ethereum receipt `status: success` is checked together with GenLayer `statusName: FINALIZED` and explicit `AGREE` or `MAJORITY_AGREE`. The frontend regression test rejects missing execution, missing consensus and ACCEPTED-only results.

## Superseded failed deployment

- Transaction: `0x303e597bd296ae605719a649a8b744f4a993ecd36b6813a49ab5f6389b698016`
- Constructor: `slotpact-studio-2026-10-14-a`
- Consensus: accepted agreement on the same execution error
- Execution: `ERROR`; no usable contract instance
- Root cause: the Studionet storage runtime rejected `TreeMap[str,str]` during constructor initialization.
- Remediation: policy storage now uses a collision-free packed `u256` key `(program_id << 64) | version`; direct regression forbids string-keyed `TreeMap` declarations.
