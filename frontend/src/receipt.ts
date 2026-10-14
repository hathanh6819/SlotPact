export function assertFinalizedSuccess(receipt:any,tx:any):void{
 const status=tx?.statusName??tx?.status_name??tx?.status;
 if(status!=='FINALIZED'&&status!==7)throw Error(`Transaction not finalized: ${status??'MISSING'}`);
 const consensus=tx?.result_name??tx?.resultName;
 if(!['AGREE','MAJORITY_AGREE'].includes(consensus))throw Error(`Consensus did not agree: ${consensus??'MISSING'}`);
 if(receipt?.status!=='success')throw Error(`Execution failed: ${receipt?.status??'MISSING'}`);
 const raw=tx?.consensus_data?.leader_receipt;
 const leader=Array.isArray(raw)?raw[0]:raw;
 if(leader?.execution_result!=='SUCCESS')throw Error(`Contract execution failed: ${leader?.result?.payload??leader?.execution_result??'MISSING'}`);
}
