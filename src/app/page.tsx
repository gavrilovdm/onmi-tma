"use client";

import { Container, Title, Text, Button, Stack, Group } from '@mantine/core';
import { useTelegram } from '../providers/TelegramProvider';

export default function Home() {
  const { webApp, ready } = useTelegram();

  const handleMainButton = () => {
    if (webApp?.MainButton) {
      webApp.MainButton.setText('Thanks for clicking!');
      webApp.MainButton.show();
    }
  };

  return (
    <Container size="sm" py="xl">
      <Stack gap="xl">
        <Title order={1}>Welcome to TMA</Title>
        <Text>This is a Telegram Mini App template built with Next.js and Mantine UI.</Text>
        
        <Group>
          <Button onClick={handleMainButton} variant="filled" color="blue">
            Show Main Button
          </Button>
          
          <Button onClick={() => webApp?.close()} variant="light" color="red">
            Close App
          </Button>
        </Group>

        <Text size="sm" c="dimmed">
          App Status: {ready ? 'Ready' : 'Loading...'}
        </Text>
      </Stack>
    </Container>
  );
}
