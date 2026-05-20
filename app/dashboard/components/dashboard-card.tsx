import React from 'react';

interface DashboardCardProps {
  title: string;
  value: number | string;
  description?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, description }) => {
  return (
    <div className="bg-white shadow-lg rounded-3xl p-6 border border-slate-200">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <p className="text-4xl font-bold text-slate-900 mb-4">{value}</p>
      <p className="text-slate-600">{description ?? 'Informasi layanan desa terbaru.'}</p>
    </div>
  );
};

export default DashboardCard;