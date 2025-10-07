import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ApplicationForm } from './components/application/ApplicationForm';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
    mutations: {
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ApplicationForm />
    </QueryClientProvider>
  );
}

export default App;