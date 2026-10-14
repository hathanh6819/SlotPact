# SlotPact

SlotPact is a bilateral exchange for provider-issued service credits. Two holders commit exact credit lots and intended uses; GenLayer evaluates each use against the immutable policy version that issued that lot. Credits move only when both legs are `ALLOWED`. A settled credit can then reserve one matching scarce service slot.

## Why GenLayer

The deterministic contract can enforce ownership, quantities, versions, reservations, replay protection and atomic state changes. It cannot reduce natural-language service policies and intended uses to simple exact comparisons. GenLayer consensus performs only that bounded semantic compatibility judgment.

## Authority boundaries

| Authority | What it controls | What it cannot claim |
|---|---|---|
| Program provider wallet | Its policy versions, issued lots and service slots | Independent identity or off-chain delivery |
| Two holder wallets | Exact proposed and accepted swap digest | Permission outside the bound provider policies |
| Validator consensus | `ALLOWED`, `FORBIDDEN`, or `UNCERTAIN` for each leg | Credit amount, ownership, recipient, deadline or booking |
| Contract code | Reservations, atomic settlement, release and single-use booking | Truth about off-chain service completion |

The deployment wallet has no owner/admin role. It only deploys the instance. Operational tests must use two separate holder/provider wallets; reviewers can create programs and run the same flow with their own wallets.

## Lifecycle

```text
provider creates versioned program → inventory lot
two independent wallets own lots
A proposes and reserves exact lot units
B accepts exact recomputed digest and reserves its units
consensus evaluates both bound policy/use legs
  ALLOWED + ALLOWED → both reservations consumed → two recipient lots minted
  any FORBIDDEN     → both reservations released → BLOCKED
  any UNCERTAIN     → both reservations released → UNRESOLVED
recipient lot + matching available slot → one confirmed booking
```

## Proof scope

SlotPact proves that:

- the exact two wallets consented to a complete commitment;
- each transferred lot was owned, available, version-bound and reserved;
- validator consensus classified both intended uses against the exact provider-authored on-chain policy snapshots;
- settlement was atomic and a confirmed slot consumed one settled credit.

It does **not** prove provider identity, professional qualifications, service quality or off-chain delivery. Provider policy is authoritative only for the provider's own offered service. No external source is fetched and no repository fixture is treated as world truth.

## Repository

- `contracts/slot_pact.py` — GenLayer Intelligent Contract.
- `tests/test_slot_pact.py` — direct and adversarial state-machine tests.
- `tests/fixtures/manifest.json` — test-resource origin, scope, version and hashes.
- `frontend/` — signed browser-wallet React client.
- `docs/PROOF_MODEL.md` — evidence chain, consensus boundary and threats.
- `docs/TEST_AND_EVIDENCE.md` — local/live test plan and release gates.
- `docs/LIVE_EVIDENCE.md` — populated only after deployment and two-wallet live execution.

## Local verification

```powershell
./verify.ps1
```

Or run the layers separately:

```powershell
python scripts/check_contract.py
python -m pytest -q
cd frontend
npm test
npm run build
```

## Deploy and configure

Deploy `contracts/slot_pact.py` with a unique constructor value such as `slotpact-studio-2026-10-14-a`. The string is part of every pact digest and prevents cross-instance commitment reuse.

Verified Studionet deployment: [`0x64F95408268469E46e79526E39e069Ee95BCebad`](https://explorer-studio.genlayer.com/address/0x64F95408268469E46e79526E39e069Ee95BCebad).

After deployment, set:

```text
VITE_CONTRACT_ADDRESS=0x...
```

The frontend uses the official `studionet` descriptor from `genlayer-js` 1.1.8 (chain ID `61999`, RPC `https://studio.genlayer.com/api`), waits for finalized execution and consensus, then reads authoritative state back before showing success.

## Reviewer quick path

1. Connect wallet A; create a program and inventory lot.
2. Connect wallet B; create a different program, inventory lot and a slot.
3. Wallet A composes a pact using its lot and wallet B's lot.
4. Wallet B accepts the displayed exact digest.
5. Either wallet assesses the matched pact.
6. With compatible policies, wallet A books wallet B's matching slot using its new settled lot.
7. Repeat with a prohibited use and confirm both original lots are fully released.

Deployment links and exact transaction/readback records are intentionally not fabricated; they are added to `docs/LIVE_EVIDENCE.md` after the matching source is deployed.
