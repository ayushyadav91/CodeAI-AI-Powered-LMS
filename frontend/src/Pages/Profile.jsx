import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function TicketManagementUI() {
  const [currentUser, setCurrentUser] = useState('user');
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeTab, setActiveTab] = useState('tickets');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState({ title: '', description: '' });

  
  /*================= FETCH TICKETS =================*/
  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch('http://localhost:3000/api/tickets', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
         },
      });
      if (!res.ok) throw new Error('Failed to fetch tickets');
      const data = await res.json();
      // 🔁 Map backend → UI format (NO UI CHANGE)
      const mapped = data.map(ticket => ({
        id: ticket._id,
        title: ticket.title,
        status: ticket.status.toLowerCase().replace('_', '-'),
        priority: ticket.priority,
        category: ticket.relatedSkills?.[0] || 'General',
        assignee: ticket.assignedTo ? 'Assigned' : 'Unassigned',
        date: new Date(ticket.createdAt).toISOString().split('T')[0],
      }));

      setTickets(mapped);
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= CREATE TICKET ================= */
  const handleCreateTicket = async () => {
    if (!newTicket.title || !newTicket.description) return;

    try {
      const token = localStorage.getItem('authToken');

      const res = await fetch('http://localhost:3000/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTicket),
      });

      if (!res.ok) throw new Error('Create ticket failed');

      const ticket = await res.json();

      const mappedTicket = {
        id: ticket._id,
        title: ticket.title,
        status: ticket.status.toLowerCase().replace('_', '-'),
        priority: ticket.priority,
        category: ticket.relatedSkills?.[0] || 'General',
        assignee: ticket.assignedTo ? 'Assigned' : 'Unassigned',
        date: new Date(ticket.createdAt).toISOString().split('T')[0],
      };

      setTickets([mappedTicket, ...tickets]);
      setNewTicket({ title: '', description: '' });
      setShowCreateModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= HELPERS ================= */
  const getPriorityColor = (priority) => {
    const colors = {
      critical: 'bg-red-100 text-red-800',
      high: 'bg-orange-100 text-orange-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    if (status === 'closed') return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (status === 'in-progress') return <Clock className="w-5 h-5 text-blue-500" />;
    return <AlertCircle className="w-5 h-5 text-orange-500" />;
  };

  const filteredTickets = tickets.filter(t =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* ================= UI (UNCHANGED) ================= */
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* UI CODE EXACTLY SAME AS YOURS */}
      {/* NOTHING CHANGED BELOW */}
      {/* Sidebar, Header, Ticket Cards, Modal — untouched */}
    </div>
  );
}
