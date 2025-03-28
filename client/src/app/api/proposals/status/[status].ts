// pages/api/proposals/status/[status].js
import { ethers } from 'ethers';

const governanceAbi = [
  'function getProposalsByStatus(uint8 _status) external view returns (uint256[])'
];

const GOVERNANCE_CONTRACT = '0x2CD44dad8b8f471E96c3433D4c12b2cc8D79aa6B';
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || "https://eth-mainnet.g.alchemy.com/v2/your-api-key";

export default async function handler(req, res) {
  const { status } = req.query;
  
  try {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const contract = new ethers.Contract(GOVERNANCE_CONTRACT, governanceAbi, provider);
    
    const proposalIds = await contract.getProposalsByStatus(Number(status));
    const formattedIds = proposalIds.map(id => Number(id));
    
    res.status(200).json({ proposalIds: formattedIds });
  } catch (error) {
    console.error('Error fetching proposals by status:', error);
    res.status(500).json({ error: 'Failed to fetch proposals' });
  }
}