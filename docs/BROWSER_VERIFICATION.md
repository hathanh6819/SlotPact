# Browser verification

Target: production Vite build served at `http://127.0.0.1:5174/`, bound to Studionet contract `0x64F95408268469E46e79526E39e069Ee95BCebad`.

Observed directly through the browser accessibility tree:

- Exchange shows 1 settled pact, 2 programs and 9 available credit units.
- Pact 1: Credits exchanged, ALLOWED / ALLOWED, exact digest `sha256:3e7c0036838cfb535f8c77ff0e562e4ab0ef55d68b74e6673f0b6a5b693c34d6`.
- Pact 2: Policy blocked, ALLOWED / FORBIDDEN, no recipient lots.
- Pact 3: Uncertain · released, UNCERTAIN / ALLOWED, no recipient lots.
- Audit shows pact 1 recipient lots 4 / 3, with policy versions 1 / 1.
- Audit shows booking 1 CONFIRMED, lot 4 → slot 1, customer A → provider B.
- All terminal pact acceptance/assessment controls are disabled.
- Active-contract explorer link points to the correct Studionet address.

These observations match finalized SDK readbacks in `live-e2e.json`. This verifies live browser readback of the production build, not public hosting or wallet signing.

The available browser is the Codex in-app browser. Clicking Connect wallet returns `Install a compatible injected wallet.` No injected wallet is available in this browser. A signed browser-wallet journey, account switching and pending-reload recovery remain release blockers until tested in a browser connected to the test wallets.

## Failure UI regression discovered during live audit

Studionet returns an Ethereum receipt with `status: success` even when a finalized GenLayer execution rolls back with `WRONG_PHASE`. `frontend/src/receipt.ts` now requires the leader receipt's `execution_result: SUCCESS`, as well as explicit finality and consensus, before allowing success UI. The regression test covers the observed receipt-success/leader-error combination.
