import{createClient}from'../frontend/node_modules/genlayer-js/dist/index.js';
import{studionet}from'../frontend/node_modules/genlayer-js/dist/chains/index.js';
import{writeFile}from'node:fs/promises';import{createHash}from'node:crypto';
const address='0x64F95408268469E46e79526E39e069Ee95BCebad';const client=createClient({chain:studionet});
const read=(functionName,args=[])=>client.readContract({address,functionName,args,stateStatus:'finalized',jsonSafeReturn:true});
const entries=[
 ['create_program_a','0xab8546f532d8ea85bc7abb602ee19356d77ba65e2fa0308f1ed44cc224a3591c'],
 ['create_program_b','0xede859302f407fbd2b2e20b1c49400ef29578abff1757777dcf3a4f7aa076bdd'],
 ['create_slot_b','0xa12d9653a41375f8dd65817a91cc54991a58263791c8cc1fb694e834932db1af'],
 ['happy_propose','0x170d8a9ae3295c31c751e48518432c1415936706ff60d789c37ccd892829fe5c'],
 ['happy_accept','0x3286443e025ad9bd66a62579e2c309114ac5e7e35a4ef84f37c232da6042462f'],
 ['happy_assess','0x413003334e246f2f6bc9c72654f326f853132a7cf8896585ede6e8c0a5743517'],
 ['happy_book','0x63a6eb9e18d395f6e646711c9cdf3fa8e41b95dcad74c9baf5033027ea1c561c'],
 ['forbidden_propose','0x00dfefdda7d6bc3048d151e9abff215dac95e03e6037dacfb075a39c65268643'],
 ['forbidden_accept','0x12d0150161757ef1acf2e281ff57c9cffbfe52498415138be2177f4590c133fb'],
 ['forbidden_assess','0xef1fb518697ed4a2e388646459d6395cc39a35ff63d020268e1224c3ceedab44'],
 ['ambiguous_propose','0x0c9129beb7102b2f4d29032be3527b066870afdff9f5d1cbe086b534f2f50be4'],
 ['ambiguous_accept','0xc8728b3ddc64124dd7fe63f3292f65c51a48d513a77e1b7e04b641f5aa758b1a']
];
const evidence={contract:address,network:'studionet',chain_id:61999,captured_at:new Date().toISOString(),transactions:[],state:{},result:'IN_PROGRESS'};
for(const[label,hash]of entries){const tx=await client.getTransaction({hash});const receipt=await client.getTransactionReceipt({hash});const item={label,hash,sender:tx.from_address,recipient:tx.to_address,status:tx.statusName??tx.status,consensus:tx.result_name,execution:receipt.status,calldata:tx.data?.calldata?.readable};evidence.transactions.push(item);console.log(JSON.stringify(item));}
const code=await client.getContractCode(address);evidence.source_sha256=createHash('sha256').update(code).digest('hex');
evidence.state.protocol=await read('get_protocol');evidence.state.counts=await read('get_counts');
for(const[name,method,count]of[['programs','get_program',2],['lots','get_lot',4],['swaps','get_swap',3],['slots','get_slot',1],['bookings','get_booking',1]]){evidence.state[name]=[];for(let i=1;i<=count;i++)evidence.state[name].push(await read(method,[i]));}
evidence.state.policies=[await read('get_policy',[1,1]),await read('get_policy',[2,1])];
await writeFile(new URL('../docs/live-e2e.json',import.meta.url),JSON.stringify(evidence,null,2)+'\n');console.log('state',JSON.stringify(evidence.state));
