"use client";

import { Group, UnstyledButton, Stack, Image } from '@mantine/core';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface NavItem {
  icon: string;
  label: string;
  path: string;
  badge?: ReactNode;
  disabled?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { icon: '/icons/inventory-icon.svg', label: 'Inventory', path: '/inventory', disabled: true },
  { icon: '/icons/craft-icon.svg', label: 'Craft', path: '/craft', disabled: true },
  { icon: '/icons/profile-icon.svg', label: 'Profile', path: '/profile', disabled: false },
  { icon: '/icons/quests-icon.svg', label: 'Spin', path: '/spin', badge: '2', disabled: false },
  { icon: '/icons/market-icon.svg', label: 'Market', path: '/market', disabled: true },
];

export function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Group 
      justify="space-between" 
      style={{ 
        position: 'fixed', 
        bottom: 16, 
        left: 0, 
        right: 0,
        background: 'transparent',
        padding: '24px 48px',
        zIndex: 100,
      }}
    >
      {NAV_ITEMS.map((item) => (
        <UnstyledButton
          key={item.path}
          onClick={() => !item.disabled && router.push(item.path)}
          style={{ 
            opacity: pathname === item.path ? 1 : 0.6,
            position: 'relative'
          }}
        >
          <Stack align="center" gap={4}>
            <div style={{ position: 'relative' }}>
              <Image
                src={item.icon}
                alt={item.label}
                width={24}
                height={24}
              />
              {item.badge && (
                <div style={{
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  background: '#FF3B30',
                  color: 'white',
                  borderRadius: '50%',
                  width: '16px',
                  height: '16px',
                  fontSize: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {item.badge}
                </div>
              )}
            </div>
          </Stack>
        </UnstyledButton>
      ))}
    </Group>
  );
} 