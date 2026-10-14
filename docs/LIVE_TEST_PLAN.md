# Live test resource plan

Contract: `0x64F95408268469E46e79526E39e069Ee95BCebad`, Studionet 61999.

Provider A is `0x1D283b45974B0be9630DFD1deC6A62a9B72B2760`; provider B is `0xf96Cf822F9f4e76956AB9fAAa22B3BdCD7b10aD6`. These are test service providers acting through transaction sender authentication. No independent professional identity or actual service delivery is claimed.

The source of each policy is its immutable on-chain `get_policy(program_id,version)` record. The runner fixes program/version, lot owners, quantities and intended uses before either party consents. Evidence records the actual policy digest and complete swap digest. Local synthetic model outputs are not used by the live validators.

| Case | Inputs and expected effect |
|---|---|
| Happy | Architecture advice for an open-source DAO module; maintainability review for a public open-source library. Expect both ALLOWED, atomic credit transfer, then one matching slot reservation. |
| Forbidden | Second use explicitly requests a formal security audit and exploit development for closed proprietary software, which program B forbids. Expect FORBIDDEN, no transferred lots, and both reservations released. |
| Ambiguous | First use leaves the future project unspecified. Expect no settlement because policy coverage cannot be established. Actual FORBIDDEN or UNCERTAIN will be reported exactly. |

The exact strings are defined in `scripts/run_live_e2e.mjs`; transaction arguments and finalized readbacks form the live evidence. Live outcomes must not be relabeled to match expected labels. Program IDs 1/2, lots 1/2 and slot 1 are accepted only after explicit initial-state and provider checks on this deployment.

Remaining release tests include authorization failures, wrong digest, replay, expiry recovery and a signed browser-wallet journey. Successful SDK transactions do not establish production browser E2E completion.
