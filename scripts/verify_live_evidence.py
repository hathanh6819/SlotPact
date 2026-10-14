import hashlib,json
from pathlib import Path

root=Path(__file__).resolve().parents[1]
def canonical(value):return json.dumps(value,sort_keys=True,separators=(',',':'),ensure_ascii=True)
def sha(value):return 'sha256:'+hashlib.sha256(canonical(value).encode()).hexdigest()
main=json.loads((root/'docs/live-e2e.json').read_text())
assert main['source_sha256']==hashlib.sha256((root/'contracts/slot_pact.py').read_bytes()).hexdigest()
for policy in main['state']['policies']:
 payload={k:v for k,v in policy.items() if k!='policy_digest'}
 assert sha(payload)==policy['policy_digest']
for tx in main['transactions']:
 assert tx['status']=='FINALIZED' and tx['consensus'] in ('AGREE','MAJORITY_AGREE') and tx['execution']=='success'
assert [s['status'] for s in main['state']['swaps']]==['SETTLED','BLOCKED','UNRESOLVED']
assert main['state']['bookings'][0]['status']=='CONFIRMED'
audit=json.loads((root/'docs/live-audit.json').read_text())
for item in audit['cases']:
 if not item.get('verified'):continue
 observed=item['observed'];assert observed['finality'] in ('FINALIZED',7) and observed['consensus'] in ('AGREE','MAJORITY_AGREE')
 if item['expected_error']:
  assert observed['leader_execution']=='ERROR' and item['expected_error'] in observed['stderr']
  assert canonical(item['before'])==canonical(item['after'])
 else:assert observed['leader_execution']=='SUCCESS'
print('Evidence integrity PASS; verified live audit cases:',sum(bool(x.get('verified')) for x in audit['cases']))
if audit['result']!='PASS':raise SystemExit('Full live audit is still IN_PROGRESS')
