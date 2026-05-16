export interface User {
  id: string;
  uuid: string;
  fullName: string;
  email: string;
  phone: string;
  roleId: string;
  role?: string;
  employeeId?: string;
  branchId?: string;
  customerId?: string;
  profilePhoto: string;
  status: 'active' | 'inactive' | 'suspended' | 'frozen';
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  is2FAEnabled: boolean;
  isPremium?: boolean;
  address?: string;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  id: string;
  name: string;
  code: string;
  description?: string;
}

export interface Permission {
  id: string;
  name: string;
  code: string;
  module: string;
  description?: string;
}

export interface RolePermission {
  id: string;
  roleId: string;
  permissionId: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Session {
  id: string;
  userId: string;
  device: string;
  browser: string;
  ipAddress: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}
