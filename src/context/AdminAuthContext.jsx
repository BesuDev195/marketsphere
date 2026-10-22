import React, { createContext, useContext, useState } from 'react';
import { initialEmployees } from '../data/employees';
import { initialCustomers } from '../data/customers';

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = sessionStorage.getItem('marketsphere_admin_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = (email, password = '') => {
    // 1. Check if employee
    const foundEmp = initialEmployees.find(
      (emp) => emp.displayEmail.toLowerCase() === email.toLowerCase()
    );

    if (foundEmp) {
      setAdminUser(foundEmp);
      try {
        sessionStorage.setItem('marketsphere_admin_session', JSON.stringify(foundEmp));
      } catch (e) {
        console.error(e);
      }
      return foundEmp;
    }

    // 2. Check if customer (e.g. Besufekad Z.)
    const foundCust = initialCustomers.find(
      (cust) => cust.email.toLowerCase() === email.toLowerCase()
    );

    if (foundCust) {
      const custObj = {
        id: foundCust.id,
        name: foundCust.name,
        position: foundCust.tier,
        department: 'Marketplace Member',
        displayEmail: foundCust.email,
        role: 'Customer Account',
        status: foundCust.status,
        avatar: foundCust.avatar,
        isCustomer: true,
      };
      setAdminUser(custObj);
      try {
        sessionStorage.setItem('marketsphere_admin_session', JSON.stringify(custObj));
      } catch (e) {
        console.error(e);
      }
      return custObj;
    }

    // 3. Fallback to Melaku Girmachew
    const defaultUser = {
      id: 'EMP-0412',
      name: 'Melaku Girmachew',
      position: 'Senior Marketplace Administrator',
      department: 'Marketplace Operations',
      displayEmail: email || 'melakugir12@gmail.com',
      role: 'Administrator',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    };

    setAdminUser(defaultUser);
    try {
      sessionStorage.setItem('marketsphere_admin_session', JSON.stringify(defaultUser));
    } catch (e) {
      console.error(e);
    }
    return defaultUser;
  };

  const logout = () => {
    setAdminUser(null);
    try {
      sessionStorage.removeItem('marketsphere_admin_session');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AdminAuthContext.Provider value={{ adminUser, setAdminUser, login, logout, isAuthenticated: !!adminUser }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
