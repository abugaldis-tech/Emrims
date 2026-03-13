import { useCallback } from 'react';

export const useToast = () => {
  const showToast = useCallback(
    (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', duration = 3000) => {
      const id = `toast-${Date.now()}`;
      const element = document.createElement('div');
      element.id = id;
      element.className = `toast-enter fixed bottom-4 right-4 px-6 py-4 rounded-lg shadow-lg text-white`;

      switch (type) {
        case 'success':
          element.classList.add('bg-green-500');
          break;
        case 'error':
          element.classList.add('bg-red-500');
          break;
        case 'warning':
          element.classList.add('bg-yellow-500');
          break;
        default:
          element.classList.add('bg-blue-500');
      }

      element.textContent = message;
      document.body.appendChild(element);

      setTimeout(() => {
        element.classList.add('toast-exit');
        setTimeout(() => element.remove(), 300);
      }, duration);

      return id;
    },
    []
  );

  return { showToast };
};