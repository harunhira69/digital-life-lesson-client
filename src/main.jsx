import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from "react-router/dom";
import router from './Route/Route.jsx';
import AuthProvider from './Context/AuthProvider.jsx';
import { ThemeProvider } from './Context/ThemeContext.jsx'; 
import { Toaster } from "react-hot-toast";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 1️⃣ Create a QueryClient instance
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <>
            <RouterProvider router={router} />
            <Toaster position="top-center" reverseOrder={false} />
          </>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
