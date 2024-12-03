import React, { useEffect, useState } from 'react';
import { CompanyOverview } from '../components/dashboard/CompanyOverview';
import { EshopList } from '../components/eshop/EshopList';
import { getCompanyById, getCompanyEshops } from '../services/companyService';
import type { Company, Eshop } from '../types/company';
import { useAuthStore } from '../store/authStore';

export const ClientDashboard = () => {
  const { user } = useAuthStore();
  const [company, setCompany] = useState<Company | null>(null);
  const [eshops, setEshops] = useState<Eshop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        const companyData = await getCompanyById(user.company);
        if (companyData) {
          setCompany(companyData);
          const eshopsData = await getCompanyEshops(companyData.companyId);
          setEshops(eshopsData);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!company) {
    return <div>No company data found</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <CompanyOverview company={company} eshopsCount={eshops.length} />
      <EshopList eshops={eshops} />
    </div>
  );
};