export function assertFinalizedSuccess(receipt:any,tx:any):void{
 const status=tx?.statusName??tx?.status_name??tx?.status;
 if(status!=='FINALIZED'&&status!==7)throw Error(`Transaction not finalized: ${status??'MISSING'}`);
 const consensus=tx?.result_name??tx?.resultName;
 if(!['AGREE','MAJORITY_AGREE'].includes(consensus))throw Error(`Consensus did not agree: ${consensus??'MISSING'}`);
 if(receipt?.status!=='success')throw Error(`Execution failed: ${receipt?.status??'MISSING'}`);
}
