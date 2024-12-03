import React from 'react';
import { FAQ } from '../components/support/FAQ';
import { KnowledgeBase } from '../components/support/KnowledgeBase';
import { ApiDocs } from '../components/support/ApiDocs';
import { IntegrationGuides } from '../components/support/IntegrationGuides';
import { TicketSystem } from '../components/support/TicketSystem';

export const Support = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Support Center</h1>
      <div className="grid grid-cols-3 gap-6">
        <FAQ />
        <KnowledgeBase />
        <ApiDocs />
        <IntegrationGuides />
        <TicketSystem />
      </div>
    </div>
  );
};