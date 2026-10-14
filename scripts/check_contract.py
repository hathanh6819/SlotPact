import ast,sys
from pathlib import Path

root=Path(__file__).resolve().parents[1];path=root/"contracts/slot_pact.py";source=path.read_text(encoding="utf-8")
errors=[]
try:ast.parse(source)
except SyntaxError as exc:errors.append(f"syntax: {exc}")
if source.splitlines()[:2]!=['# v0.2.16','# { "Depends": "py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6" }']:errors.append("runner header mismatch")
for forbidden in ("requests.","urllib","web.get","strict_eq("):
 if forbidden in source:errors.append(f"forbidden pattern: {forbidden}")
for required in ("prompt_comparative","response_format=\"json\"","_swap_digest(s)","SWAP_SETTLEMENT_REQUIRED","POLICY_BINDING_CHANGED"):
 if required not in source:errors.append(f"missing invariant: {required}")
if errors:
 print("\n".join(errors));sys.exit(1)
print("contract static checks: PASS")
