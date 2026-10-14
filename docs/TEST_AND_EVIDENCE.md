# Test and evidence plan

## Source policy

All semantic inputs are provider-authored immutable on-chain policy snapshots and party-authored intended-use commitments. External fetch is deliberately absent because the contract makes no claim about a third-party document or off-chain event. If a future version introduces external evidence, release is blocked until exact publisher authority, object/revision, byte acquisition, redirect safety and digest recomputation are implemented and tested.

`tests/fixtures/*.json` are synthetic deterministic validator outputs. Their manifest records publisher, subject, version, SHA-256 and the narrow claim “deterministic test input only.” They must never be presented as proof of live consensus or real service delivery.

## Local matrix

| Requirement | Direct evidence |
|---|---|
| Atomic successful exchange | `test_happy_path_atomic_swap_and_booking` |
| Forbidden leg rolls back both sides | `test_forbidden_leg_releases_both_reservations` |
| Uncertainty fails closed | `test_uncertain_fails_closed_and_releases` |
| Independent validator disagreement | `test_validator_disagreement_rolls_back` |
| Sender authorization | `test_only_counterparty_accepts_and_failure_has_no_mutation` |
| Exact digest / stale consent | `test_digest_tamper_and_stale_consent_blocked` |
| Immutable policy version | `test_policy_revision_never_migrates_bound_lot_or_swap` |
| Cancellation and replay | `test_cancel_open_and_replay_blocked` |
| Expiry recovery | `test_expiry_releases_open_and_matched` |
| Deadline boundary | `test_early_expiry_is_rejected_without_mutation` |
| Double booking | `test_double_booking_and_booking_authority` |
| Positive-state bypass | `test_inventory_cannot_bypass_settled_swap` |
| Cross-program mismatch | `test_wrong_program_slot_cannot_consume_credit` |
| Prompt injection | `test_prompt_injection_is_inert_and_uncertain_safe` |
| Double reservation | `test_duplicate_reservation_is_impossible` |
| Fixture provenance/integrity | `test_fixture_manifest_hash_and_authority_scope` |
| No hidden external fetch | `test_header_no_web_fetch_and_digest_recomputed` |

Every rejected direct call snapshots all contract fields and asserts complete equality where applicable.

## Required live matrix

Use the deployment wallet only for deployment. Use two independent subsidiary wallets for all roles and record:

1. Each wallet creates one program; read back provider, version and policy digest.
2. Wallet B creates a slot.
3. Wallet A proposes; record both original lots before/after reservation.
4. Wallet B accepts the exact digest; record matched state and both reservations.
5. Run compatible assessment; record finality, consensus, execution, recipient lots and conservation.
6. Wallet A books B's slot; record one-unit consumption and slot/booking readback.
7. Run a forbidden pact; prove both reservations are released and no recipient lots are created.
8. Run uncertain/prompt-injection and wrong-wallet/wrong-digest attempts; prove no unauthorized mutation.
9. Run an expiry recovery and a replay attempt.
10. Repeat the production UI happy path with browser-injected signatures; SDK execution alone does not satisfy frontend E2E.

For every live transaction capture exact source commit, contract source SHA-256, deployment address, transaction hash, sender, arguments, expected branch, finality, consensus result, execution result and finalized state readback. Failed/superseded deployments remain listed.
