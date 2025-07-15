import { beforeEach, vi } from 'vitest';

// This file will be run before each test file
beforeEach(() => {
  vi.mock('vue', async (importOriginal) => {
    const actual = await importOriginal();

    return {
      ...actual,
      getCurrentInstance: () => ({
        proxy: {
          $webSocketURL: 'ws://localhost:8000/ws', // 🟢 укажи валидный WebSocket URL
          $serverURL: 'http://localhost:8000/api',
          $privateNote: 'private',
        },
      }),
    };
  });
});
