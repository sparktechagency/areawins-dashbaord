
import React, { useState } from 'react';
import { Team } from '../../types';

const initialTeams: Team[] = [
  { id: '1', name: 'Arsenal', sport: 'Soccer', country: 'England', logo: 'https://api.dicebear.com/7.x/initials/svg?seed=AR' },
  { id: '2', name: 'Real Madrid', sport: 'Soccer', country: 'Spain', logo: 'https://api.dicebear.com/7.x/initials/svg?seed=RM' },
  { id: '3', name: 'LA Lakers', sport: 'Basketball', country: 'USA', logo: 'https://api.dicebear.com/7.x/initials/svg?seed=LAL' },
  { id: '4', name: 'Golden State Warriors', sport: 'Basketball', country: 'USA', logo: 'https://api.dicebear.com/7.x/initials/svg?seed=GSW' },
];

const TeamManagement: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTeam, setCurrentTeam] = useState<Partial<Team>>({});

  const handleSave = () => {
    if (currentTeam.id) {
      setTeams(prev => prev.map(t => t.id === currentTeam.id ? (currentTeam as Team) : t));
    } else {
      setTeams(prev => [...prev, { ...currentTeam, id: Date.now().toString() } as Team]);
    }
    setIsEditing(false);
  };

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Team Management</h1>
          <p className="text-gray-500 font-medium">Manage sports teams, logos, and metadata.</p>
        </div>
        <button 
          onClick={() => { setCurrentTeam({}); setIsEditing(true); }}
          className="flex items-center gap-2 bg-secondary text-primary rounded-lg px-6 py-2.5 text-sm font-black hover:brightness-110 transition-all shadow-lg shadow-green-500/10"
        >
          <span className="material-symbols-outlined">add_circle</span> Add Team
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl">
            <h3 className="text-2xl font-bold mb-6">{currentTeam.id ? 'Edit Team' : 'Add New Team'}</h3>
            <div className="space-y-4 mb-8">
              <div>
                <label className="text-xs font-bold uppercase text-gray-400 block mb-1">Team Name</label>
                <input 
                  className="w-full bg-slate-50 border-none rounded-lg p-3 text-sm focus:ring-1 ring-primary"
                  value={currentTeam.name || ''}
                  onChange={e => setCurrentTeam({...currentTeam, name: e.target.value})}
                  placeholder="e.g. Manchester City"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase text-gray-400 block mb-1">Sport</label>
                  <select 
                    className="w-full bg-slate-50 border-none rounded-lg p-3 text-sm focus:ring-1 ring-primary"
                    value={currentTeam.sport || ''}
                    onChange={e => setCurrentTeam({...currentTeam, sport: e.target.value})}
                  >
                    <option value="">Select Sport</option>
                    <option value="Soccer">Soccer</option>
                    <option value="Basketball">Basketball</option>
                    <option value="Tennis">Tennis</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-gray-400 block mb-1">Country</label>
                  <input 
                    className="w-full bg-slate-50 border-none rounded-lg p-3 text-sm focus:ring-1 ring-primary"
                    value={currentTeam.country || ''}
                    onChange={e => setCurrentTeam({...currentTeam, country: e.target.value})}
                    placeholder="e.g. UK"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setIsEditing(false)} className="flex-1 py-3 text-sm font-bold text-gray-500 hover:bg-gray-50 rounded-xl">Cancel</button>
              <button onClick={handleSave} className="flex-1 py-3 text-sm font-bold bg-primary text-accent rounded-xl">Save Team</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {teams.map(team => (
          <div key={team.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden group hover:border-accent transition-all hover:shadow-lg hover:shadow-slate-200/50">
            <div className="p-8 flex flex-col items-center text-center">
              <div className="size-24 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 overflow-hidden shadow-inner group-hover:scale-105 transition-transform">
                <img src={team.logo} className="w-16 h-16 object-contain" alt={team.name} />
              </div>
              <h3 className="text-xl font-black text-primary mb-1">{team.name}</h3>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[10px] font-black uppercase bg-primary/5 text-primary/60 px-2 py-0.5 rounded">{team.sport}</span>
                <span className="text-[10px] font-bold text-gray-400">{team.country}</span>
              </div>
              <div className="flex w-full gap-2">
                <button 
                  onClick={() => { setCurrentTeam(team); setIsEditing(true); }}
                  className="flex-1 py-2 bg-slate-50 text-gray-600 rounded-lg text-xs font-bold hover:bg-primary hover:text-white transition-all"
                >
                  Edit
                </button>
                <button className="p-2 bg-slate-50 text-gray-400 rounded-lg hover:text-red-500 transition-all">
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamManagement;
