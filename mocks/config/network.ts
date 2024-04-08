import type { FeaturedNetwork } from 'types/networks';

const FEATURED_NETWORKS: Array<FeaturedNetwork> = [
  { title: 'Gnosis Chain', url: 'https://gemefi.io/xdai/mainnet', group: 'Mainnets', isActive: true },
  { title: 'Arbitrum on xDai', url: 'https://gemefi.io/xdai/aox', group: 'Mainnets' },
  { title: 'Ethereum', url: 'https://gemefi.io/eth/mainnet', group: 'Mainnets' },
  { title: 'Ethereum Classic', url: 'https://gemefi.io/etx/mainnet', group: 'Mainnets', icon: 'https://localhost:3000/my-logo.png' },
  { title: 'POA', url: 'https://gemefi.io/poa/core', group: 'Mainnets' },
  { title: 'RSK', url: 'https://gemefi.io/rsk/mainnet', group: 'Mainnets' },
  { title: 'Gnosis Chain Testnet', url: 'https://gemefi.io/xdai/testnet', group: 'Testnets' },
  { title: 'POA Sokol', url: 'https://gemefi.io/poa/sokol', group: 'Testnets' },
  { title: 'ARTIS Σ1', url: 'https://gemefi.io/artis/sigma1', group: 'Other' },
  { title: 'LUKSO L14', url: 'https://gemefi.io/lukso/l14', group: 'Other' },
  { title: 'Astar', url: 'https://gemefi.io/astar', group: 'Other' },
];

export const FEATURED_NETWORKS_MOCK = JSON.stringify(FEATURED_NETWORKS);
