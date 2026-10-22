import React, { useState } from 'react';
import { Search, UserCheck, Shield, Eye, Mail, Building, Key, AlertTriangle, X } from 'lucide-react';
import { initialEmployees } from '../data/employees';

export const EmployeeManagement = () => {
  const [employees] = useState(initialEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const filteredEmployees = employees.filter((emp) => {
    return (
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.displayEmail.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Enterprise Staff & Access Directory</h1>
          <p className="text-xs text-slate-500 mt-1">
            Internal MarketSphere personnel, role assignments, and privileged administrative access tiers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-sky-50 text-sky-700 border border-sky-200 text-xs font-bold">
            Total Staff: {employees.length}
          </span>
        </div>
      </div>

      {/* Safety Notice regarding Melaku Girmachew */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Demonstration Identity Context:</span> Employee record <strong>Melaku Girmachew</strong> (Senior Marketplace Administrator, display identifier <code>melakugir12@gmail.com</code>) is a key fictional figure used in the security awareness simulation. No external emails are sent or accessed.
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center justify-between text-xs">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search staff by name, department, role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Employee ID</th>
                <th className="py-3 px-4">Name & Title</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Work / Display Email</th>
                <th className="py-3 px-4">Security Role</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEmployees.map((emp) => {
                const isTarget = emp.name === 'Melaku Girmachew';
                return (
                  <tr
                    key={emp.id}
                    className={`transition-colors ${
                      isTarget ? 'bg-sky-50/50 hover:bg-sky-100/60' : 'hover:bg-slate-50/70'
                    }`}
                  >
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      {emp.id}
                      {isTarget && (
                        <span className="ml-1.5 text-[9px] bg-rose-500 text-white font-extrabold px-1.5 py-0.5 rounded">
                          DEMO TARGET
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <img src={emp.avatar} alt={emp.name} className="w-8 h-8 rounded-full object-cover border" />
                        <div>
                          <div className="font-bold text-slate-900">{emp.name}</div>
                          <div className="text-[11px] text-slate-500">{emp.position}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-700">{emp.department}</td>
                    <td className="py-3 px-4 font-mono text-slate-700">{emp.displayEmail}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          emp.role.includes('Admin')
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        <Key className="w-3 h-3" />
                        {emp.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {emp.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedEmployee(emp)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Employee Details Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-base">Employee Record: {selectedEmployee.name}</h3>
              <button
                onClick={() => setSelectedEmployee(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <img src={selectedEmployee.avatar} alt={selectedEmployee.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-sky-500 shadow-md" />
              <div>
                <h4 className="font-bold text-slate-900 text-base">{selectedEmployee.name}</h4>
                <div className="text-xs text-sky-600 font-bold">{selectedEmployee.position}</div>
                <div className="text-xs text-slate-400 font-mono">{selectedEmployee.id} • {selectedEmployee.department}</div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Display Email:</span>
                <span className="font-mono font-bold text-slate-800">{selectedEmployee.displayEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Phone Contact:</span>
                <span className="font-bold text-slate-800">{selectedEmployee.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Office Location:</span>
                <span className="font-bold text-slate-800">{selectedEmployee.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Security Clearance:</span>
                <span className="font-bold text-purple-700">{selectedEmployee.accessLevel}</span>
              </div>
            </div>

            {selectedEmployee.bio && (
              <div className="text-xs text-slate-600 space-y-1">
                <span className="font-bold text-slate-800 block">Professional Profile:</span>
                <p>{selectedEmployee.bio}</p>
              </div>
            )}

            <button
              onClick={() => setSelectedEmployee(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
