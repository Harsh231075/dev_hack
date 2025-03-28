import React, { useState } from 'react';
import { Plus, Eye, Share2, Calendar, Users, Activity } from 'lucide-react';

const DashboardSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({ name: '', date: '' });

  // Sample data - replace with your API data
  const [events, setEvents] = useState([
    { id: 1, name: 'Product Launch', date: '2024-02-01', feedbacks: 24 },
    { id: 2, name: 'Customer Survey', date: '2024-02-15', feedbacks: 45 },
  ]);

  const handleCreateEvent = (e) => {
    e.preventDefault();
    // Add API call here
    setEvents([...events, { ...newEvent, id: events.length + 1, feedbacks: 0 }]);
    setIsCreateModalOpen(false);
    setNewEvent({ name: '', date: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center">
              <Calendar className="h-12 w-12 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Events</p>
                <h3 className="text-2xl font-bold text-gray-900">{events.length}</h3>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center">
              <Users className="h-12 w-12 text-green-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Feedbacks</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {events.reduce((acc, event) => acc + event.feedbacks, 0)}
                </h3>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center">
              <Activity className="h-12 w-12 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Active Events</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {events.filter(e => new Date(e.date) >= new Date()).length}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Events Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Events</h2>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Event
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Feedbacks
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {events.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {event.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(event.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {event.feedbacks}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => {
                          setSelectedEvent(event);
                          setIsModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 mr-4"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="text-green-600 hover:text-green-800">
                        <Share2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Event Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Create New Event</h3>
            <form onSubmit={handleCreateEvent}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Event Name
                  </label>
                  <input
                    type="text"
                    value={newEvent.name}
                    onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View/Share Modal */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">{selectedEvent.name}</h3>
            <div className="space-y-4">
              <button
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
                onClick={() => {/* Add view logic */ }}
              >
                <Eye className="h-5 w-5 mr-2" />
                View Feedbacks
              </button>
              <button
                className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center"
                onClick={() => {/* Add share logic */ }}
              >
                <Share2 className="h-5 w-5 mr-2" />
                Share Event
              </button>
            </div>
            <button
              className="mt-4 w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardSection;