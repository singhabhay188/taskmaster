'use client';
import React from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const TanStackProv = ({ children }:{ children: React.ReactNode}) => {
     return (
          <QueryClientProvider client={queryClient}>
               {children}
          </QueryClientProvider>
     )
}

export default TanStackProv;
