import { useRouter } from 'next/router';
import React from 'react';

import type { NavItemInternal, NavItem, NavGroupItem } from 'types/client/navigation-items';

import config from 'configs/app';
import UserAvatar from 'ui/shared/UserAvatar';

interface ReturnType {
  mainNavItems: Array<NavItem | NavGroupItem>;
  accountNavItems: Array<NavItem>;
  profileItem: NavItem;
}

export function isGroupItem(item: NavItem | NavGroupItem): item is NavGroupItem {
  return 'subItems' in item;
}

export function isInternalItem(item: NavItem): item is NavItemInternal {
  return 'nextRoute' in item;
}

export default function useNavItems(): ReturnType {
  const router = useRouter();
  const pathname = router.pathname;

  return React.useMemo(() => {
    // let blockchainNavItems: Array<NavItem> | Array<Array<NavItem>> = [];

    const topAccounts: NavItem | null = !config.UI.views.address.hiddenViews?.top_accounts ? {
      text: 'Top accounts',
      nextRoute: { pathname: '/accounts' as const },
      icon: 'top-accounts',
      isActive: pathname === '/accounts',
    } : null;
    const blocks: NavItem | null = {
      text: 'Blocks',
      nextRoute: { pathname: '/blocks' as const },
      icon: 'block',
      isActive: pathname === '/blocks' || pathname === '/block/[height_or_hash]',
    };
    const txs: NavItem | null = {
      text: 'Transactions',
      nextRoute: { pathname: '/txs' as const },
      icon: 'transactions',
      isActive: pathname === '/txs' || pathname === '/tx/[hash]',
    };
    const userOps: NavItem | null = config.features.userOps.isEnabled ? {
      text: 'User operations',
      nextRoute: { pathname: '/ops' as const },
      icon: 'user_op',
      isActive: pathname === '/ops' || pathname === '/op/[hash]',
    } : null;

    const apiNavItems: Array<NavItem> = [
      config.features.restApiDocs.isEnabled ? {
        text: 'REST API',
        nextRoute: { pathname: '/api-docs' as const },
        icon: 'restAPI',
        isActive: pathname === '/api-docs',
      } : null,
      config.features.graphqlApiDocs.isEnabled ? {
        text: 'GraphQL',
        nextRoute: { pathname: '/graphiql' as const },
        icon: 'graphQL',
        isActive: pathname === '/graphiql',
      } : null,
      !config.UI.sidebar.hiddenLinks?.rpc_api && {
        text: 'RPC API',
        icon: 'RPC',
        url: 'https://docs.gemefi.io/for-users/api/rpc-endpoints',
      },
      !config.UI.sidebar.hiddenLinks?.eth_rpc_api && {
        text: 'Eth RPC API',
        icon: 'RPC',
        url: ' https://docs.gemefi.io/for-users/api/eth-rpc',
      },
    ].filter(Boolean);

    const mainNavItems: ReturnType['mainNavItems'] = [
      blocks,
      txs,
      userOps,
      topAccounts,
      {
        text: 'Tokens',
        nextRoute: { pathname: '/tokens' as const },
        icon: 'token',
        isActive: pathname.startsWith('/token'),
      },
      config.features.marketplace.isEnabled ? {
        text: 'DApps',
        nextRoute: { pathname: '/apps' as const },
        icon: 'apps',
        isActive: pathname.startsWith('/app'),
      } : null,
      config.features.stats.isEnabled ? {
        text: 'Charts & stats',
        nextRoute: { pathname: '/stats' as const },
        icon: 'stats',
        isActive: pathname === '/stats',
      } : null,
      apiNavItems.length > 0 && {
        text: 'API',
        icon: 'restAPI',
        isActive: apiNavItems.some(item => isInternalItem(item) && item.isActive),
        subItems: apiNavItems,
      },
      {
        text: 'Other',
        icon: 'gear',
        subItems: [
          {
            text: 'Verify contract',
            nextRoute: { pathname: '/contract-verification' as const },
            isActive: pathname.startsWith('/contract-verification'),
          },
          config.features.gasTracker.isEnabled && {
            text: 'Gas tracker',
            nextRoute: { pathname: '/gas-tracker' as const },
            isActive: pathname.startsWith('/gas-tracker'),
          },
          ...config.UI.sidebar.otherLinks,
        ].filter(Boolean),
      },
    ].filter(Boolean);

    const accountNavItems: ReturnType['accountNavItems'] = [
      {
        text: 'Watch list',
        nextRoute: { pathname: '/account/watchlist' as const },
        icon: 'watchlist',
        isActive: pathname === '/account/watchlist',
      },
      {
        text: 'Private tags',
        nextRoute: { pathname: '/account/tag-address' as const },
        icon: 'privattags',
        isActive: pathname === '/account/tag-address',
      },
      {
        text: 'Public tags',
        nextRoute: { pathname: '/account/public-tags-request' as const },
        icon: 'publictags',
        isActive: pathname === '/account/public-tags-request',
      },
      {
        text: 'API keys',
        nextRoute: { pathname: '/account/api-key' as const },
        icon: 'API',
        isActive: pathname === '/account/api-key',
      },
      {
        text: 'Custom ABI',
        nextRoute: { pathname: '/account/custom-abi' as const },
        icon: 'ABI',
        isActive: pathname === '/account/custom-abi',
      },
      config.features.addressVerification.isEnabled && {
        text: 'Verified addrs',
        nextRoute: { pathname: '/account/verified-addresses' as const },
        icon: 'verified',
        isActive: pathname === '/account/verified-addresses',
      },
    ].filter(Boolean);

    const profileItem = {
      text: 'My profile',
      nextRoute: { pathname: '/auth/profile' as const },
      iconComponent: UserAvatar,
      isActive: pathname === '/auth/profile',
    };

    return { mainNavItems, accountNavItems, profileItem };
  }, [ pathname ]);
}
