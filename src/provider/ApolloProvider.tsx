'use client';
import React from 'react'
import { ApolloProvider } from '@apollo/client';
import client from '@/lib/apolloClient';

const ApolloProv = ({ children }:{ children: React.ReactNode}) => {
  return (
     <ApolloProvider client={client}>
            {children}
     </ApolloProvider>
  )
}

export default ApolloProv