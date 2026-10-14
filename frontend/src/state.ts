export type Status='OPEN'|'MATCHED'|'SETTLED'|'BLOCKED'|'UNRESOLVED'|'CANCELLED'|'EXPIRED'|string;
export const short=(v:string)=>v?`${v.slice(0,6)}…${v.slice(-4)}`:'—';
export const finalStatus=(s:Status)=>['SETTLED','BLOCKED','UNRESOLVED','CANCELLED','EXPIRED'].includes(s);
export const statusLabel=(s:Status)=>({OPEN:'Awaiting counterparty',MATCHED:'Ready for consensus',SETTLED:'Credits exchanged',BLOCKED:'Policy blocked',UNRESOLVED:'Uncertain · released',CANCELLED:'Cancelled',EXPIRED:'Expired · released'}[s]||s);
export const canAccept=(s:Status,account:string,counterparty:string)=>s==='OPEN'&&!!account&&account.toLowerCase()===counterparty.toLowerCase();
export const canAssess=(s:Status)=>s==='MATCHED';
