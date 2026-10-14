# Proof model

## Proof obligation

Before transferring service credits, prove that both intended uses are compatible with the exact immutable provider policies attached to the offered credit lots, and that both parties consented to the same complete swap commitment.

## Ground truth map

| Fact | Authoritative source | Binding |
|---|---|---|
| Provider for a credit program | `program.provider` set from transaction sender | program ID |
| Service policy | immutable `policies[program:version]` | program, version, provider, service text, policy text, created time, digest |
| Credit ownership and availability | on-chain lot record | lot ID, owner, program/version, available/reserved |
| A's consent | proposal transaction sender | complete `swap_digest` |
| B's consent | acceptance transaction sender | exact recomputed `swap_digest` |
| Slot availability | on-chain slot record | program/version, provider, interval, status |
| Semantic compatibility | independent GenLayer validator consensus | exact two policy snapshots and two intended uses |

There is no external factual claim in the decision. GitHub is transport for source and test reproduction, not the authority for provider policy or contract state.

## Canonical commitment

The contract computes SHA-256 over canonical JSON containing domain/version, unique deployment domain, chain ID, swap ID, both wallets, both lot/program/version/policy bindings, both amounts, both intended uses, nonce and expiry. The digest is recomputed from storage during acceptance and assessment. A caller-supplied or model-supplied digest cannot authorize state movement.

## Consensus boundary

The model returns exactly two consequential fields:

```json
{"leg_a":"ALLOWED|FORBIDDEN|UNCERTAIN","leg_b":"ALLOWED|FORBIDDEN|UNCERTAIN"}
```

Comparative consensus checks consequence equivalence. `ALLOWED` requires clear affirmative compatibility. Ambiguity and model/schema failure become `UNCERTAIN`. The model never selects wallets, lots, amounts, expiry, recipients or booking slots.

## Consequence and liveness

- `ALLOWED + ALLOWED`: both reserved amounts are consumed atomically and new recipient lots are minted.
- Any `FORBIDDEN`: both reservations are released and the pact becomes `BLOCKED`.
- Any `UNCERTAIN`: both reservations are released and the pact becomes `UNRESOLVED`.
- Before acceptance, proposer cancellation releases A's reservation.
- At/after expiry, anyone may release an open or matched pact.
- Booking requires a lot whose origin is a settled swap; issuer inventory cannot bypass consensus.
- A slot moves once from `AVAILABLE` to `BOOKED` and a credit unit is consumed in the same transaction.

## Threats covered

- caller digest tampering and stale acceptance;
- wrong-wallet acceptance and booking;
- policy version migration;
- cross-swap/cross-instance replay;
- partial settlement and reservation leakage;
- double reservation, double booking and inventory bypass;
- prompt injection inside intended-use evidence;
- leader/validator consequence disagreement;
- expiry versus assessment ordering.

## Honest limitations

SlotPact does not authenticate a provider's real-world identity, verify credentials, observe service delivery or resolve payment disputes. A provider's on-chain policy is authoritative only for that provider's own credit offer. Booking is a protocol reservation, not proof that a meeting occurred.
