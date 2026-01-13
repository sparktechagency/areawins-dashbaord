import React, { useState } from "react";
import { Tournament } from "../../../types";

const initialTournaments: Tournament[] = [
  {
    id: "1",
    name: "Champions League",
    sport: "Soccer",
    region: "Europe",
    status: "ACTIVE",
    season: "2023/24",
    logo: "🏆",
  },
  {
    id: "2",
    name: "Premier League",
    sport: "Soccer",
    region: "England",
    status: "ACTIVE",
    season: "2023/24",
    logo: "🏴",
  },
  {
    id: "3",
    name: "NBA Playoffs",
    sport: "Basketball",
    region: "USA",
    status: "ACTIVE",
    season: "2024",
    logo: "🏀",
  },
  {
    id: "4",
    name: "Wimbledon",
    sport: "Tennis",
    region: "Global",
    status: "UPCOMING",
    season: "2024",
    logo: "🎾",
  },
];

const TournamentManagement: React.FC = () => {
  const [tournaments, setTournaments] =
    useState<Tournament[]>(initialTournaments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTournament, setEditingTournament] =
    useState<Partial<Tournament> | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTournament?.id) {
      setTournaments((prev) =>
        prev.map((t) =>
          t.id === editingTournament.id ? (editingTournament as Tournament) : t
        )
      );
    } else {
      setTournaments((prev) => [
        ...prev,
        {
          ...editingTournament,
          id: Date.now().toString(),
          status: "UPCOMING",
        } as Tournament,
      ]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">
            Tournament Manager
          </h1>
          <p className="text-gray-500 font-medium">
            Categorize events and manage tournament lifecycle.
          </p>
        </div>
        <button
          onClick={() => {
            setEditingTournament({ logo: "🔥" });
            setIsModalOpen(true);
          }}
          className="bg-primary text-accent px-6 py-2.5 rounded-lg text-sm font-black flex items-center gap-2 shadow-lg shadow-primary/20 hover:brightness-110"
        >
          <span className="material-symbols-outlined">add_circle</span> Create
          Tournament
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {tournaments.map((tournament) => (
          <div
            key={tournament.id}
            className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center gap-6 group hover:border-primary transition-all"
          >
            <div className="size-20 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-4xl shadow-inner group-hover:bg-primary/5 transition-colors">
              {tournament.logo}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`size-2 rounded-full ${
                    tournament.status === "ACTIVE"
                      ? "bg-secondary"
                      : "bg-gray-300"
                  }`}
                ></span>
                <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                  {tournament.status}
                </span>
              </div>
              <h3 className="text-xl font-bold text-primary truncate">
                {tournament.name}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {tournament.sport} • {tournament.region} • Season{" "}
                {tournament.season}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setEditingTournament(tournament);
                  setIsModalOpen(true);
                }}
                className="p-2 text-gray-400 hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined">edit</span>
              </button>
              <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">visibility</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <form
            onSubmit={handleSave}
            className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl animate-in scale-in-95 duration-200"
          >
            <h3 className="text-2xl font-black mb-8">
              {editingTournament?.id ? "Update Tournament" : "New Tournament"}
            </h3>
            <div className="space-y-5 mb-8">
              <div>
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">
                  Tournament Name
                </label>
                <input
                  required
                  className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-1 ring-primary font-bold"
                  value={editingTournament?.name || ""}
                  onChange={(e) =>
                    setEditingTournament({
                      ...editingTournament,
                      name: e.target.value,
                    })
                  }
                  placeholder="e.g. World Cup 2026"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">
                    Sport
                  </label>
                  <select
                    required
                    className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-1 ring-primary font-bold"
                    value={editingTournament?.sport || ""}
                    onChange={(e) =>
                      setEditingTournament({
                        ...editingTournament,
                        sport: e.target.value,
                      })
                    }
                  >
                    <option value="Soccer">Soccer</option>
                    <option value="Cricket">Cricket</option>
                    <option value="Basketball">Basketball</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">
                    Season
                  </label>
                  <input
                    required
                    className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-1 ring-primary font-bold"
                    value={editingTournament?.season || ""}
                    onChange={(e) =>
                      setEditingTournament({
                        ...editingTournament,
                        season: e.target.value,
                      })
                    }
                    placeholder="e.g. 2024"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">
                  Region
                </label>
                <input
                  required
                  className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-1 ring-primary font-bold"
                  value={editingTournament?.region || ""}
                  onChange={(e) =>
                    setEditingTournament({
                      ...editingTournament,
                      region: e.target.value,
                    })
                  }
                  placeholder="e.g. South America"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-4 text-sm font-bold text-gray-500 hover:bg-slate-50 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-4 text-sm font-black bg-primary text-accent rounded-xl shadow-xl shadow-primary/20 hover:brightness-110 transition-all"
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TournamentManagement;
