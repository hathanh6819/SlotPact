import test from'node:test';import assert from'node:assert/strict';import{assertFinalizedSuccess}from'./receipt.ts';
test('requires successful receipt, explicit finality and consensus',()=>{
 const tx={statusName:'FINALIZED',result_name:'MAJORITY_AGREE',consensus_data:{leader_receipt:{execution_result:'SUCCESS'}}};
 assert.doesNotThrow(()=>assertFinalizedSuccess({status:'success'},tx));
 assert.throws(()=>assertFinalizedSuccess({status:'reverted'},tx),/Execution failed/);
 assert.throws(()=>assertFinalizedSuccess({},tx),/Execution failed/);
 assert.throws(()=>assertFinalizedSuccess({status:'success'},{...tx,statusName:'ACCEPTED'}),/not finalized/);
 assert.throws(()=>assertFinalizedSuccess({status:'success'},{statusName:'FINALIZED'}),/Consensus/);
 assert.throws(()=>assertFinalizedSuccess({status:'success'},{...tx,consensus_data:{leader_receipt:{execution_result:'ERROR',result:{payload:'WRONG_PHASE'}}}}),/WRONG_PHASE/);
 assert.throws(()=>assertFinalizedSuccess({status:'success'},{statusName:'FINALIZED',result_name:'MAJORITY_AGREE'}),/MISSING/);
});
