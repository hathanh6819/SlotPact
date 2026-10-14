import test from'node:test';import assert from'node:assert/strict';import{canAccept,canAssess,finalStatus,statusLabel}from'./state.ts';
test('role and phase controls mirror contract',()=>{assert.equal(canAccept('OPEN','0xAb','0xab'),true);assert.equal(canAccept('MATCHED','0xab','0xab'),false);assert.equal(canAssess('MATCHED'),true);assert.equal(canAssess('OPEN'),false)});
test('terminal statuses are not presented as pending',()=>{for(const x of['SETTLED','BLOCKED','UNRESOLVED','CANCELLED','EXPIRED'])assert.equal(finalStatus(x),true);assert.match(statusLabel('UNRESOLVED'),/released/)});
