export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardData {
  totalUsers: number;
  totalServices: number;
  activeUsers: number;
  newUsers: number;
}