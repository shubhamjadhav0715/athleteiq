import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import { toast } from 'react-toastify';

const CoachDashboard = () => {
  const { user, logout } = useAuth();
  const [plans, setPlans] = useState([]);
  const [athletes, setAthletes] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans();
    fetchAthletes();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await api.get('/coach/plans');
      setPlans(response.data.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch training plans');
      setLoading(false);
    }
  };

  const fetchAthletes = async () => {
    try {
      const response = await api.get('/coach/athletes');
      setAthletes(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch athletes');
    }
  };

  const handleDeletePlan = async (planId) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      try {
        await api.delete(`/coach/plans/${planId}`);
        toast.success('Plan deleted successfully');
        fetchPlans();
      } catch (error) {
        toast.error('Failed to delete plan');
      }
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Coach Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, Coach {user?.name}</span>
              <button onClick={logout} className="btn-secondary">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-700">My Athletes</h3>
            <p className="text-3xl font-bold text-blue-600">{athletes.length}</p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-700">Training Plans</h3>
            <p className="text-3xl font-bold text-green-600">{plans.length}</p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-700">Active Plans</h3>
            <p className="text-3xl font-bold text-purple-600">
              {plans.filter(p => p.status === 'active').length}
            </p>
          </div>
        </div>

        {/* Training Plans Section */}
        <div className="card mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Training Plans</h2>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary"
            >
              Create New Plan
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <div key={plan._id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-lg mb-2">{plan.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{plan.description}</p>
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    plan.status === 'active' ? 'bg-green-100 text-green-800' :
                    plan.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {plan.status}
                  </span>
                  <span className="text-sm text-gray-500">{plan.category}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Athletes: {plan.athleteIds?.length || 0}
                </p>
                <div className="flex space-x-2">
                  <button className="btn-secondary text-sm flex-1">
                    View
                  </button>
                  <button
                    onClick={() => handleDeletePlan(plan._id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {plans.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No training plans yet. Create your first plan!
            </p>
          )}
        </div>

        {/* Athletes Section */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">My Athletes</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sports</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {athletes.map((athlete) => (
                  <tr key={athlete._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{athlete.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{athlete.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{athlete.sportsCategory || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-blue-600 hover:text-blue-900">
                        View Progress
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {athletes.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No athletes assigned yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoachDashboard;
