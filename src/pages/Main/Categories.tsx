
import React, { useState } from 'react';
import { Category } from '../../../types';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, Checkbox, Dialog, Input, Label } from '../../components/ui';

const initialCategories: Category[] = [
  { id: '1', name: 'Football', icon: 'sports_soccer', matchCount: 124, isActive: true },
  { id: '2', name: 'Cricket', icon: 'sports_cricket', matchCount: 82, isActive: true },
  { id: '3', name: 'Basketball', icon: 'sports_basketball', matchCount: 45, isActive: true },
  { id: '4', name: 'Tennis', icon: 'sports_tennis', matchCount: 30, isActive: false },
  { id: '5', name: 'Horse Racing', imageUrl: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=100&h=100&fit=crop', matchCount: 12, isActive: true },
];

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory?.id) {
      setCategories(prev => prev.map(c => c.id === editingCategory.id ? (editingCategory as Category) : c));
    } else {
      setCategories(prev => [...prev, { ...editingCategory, id: Date.now().toString(), matchCount: 0, isActive: true } as Category]);
    }
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
        <div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2">Sports Categories</h1>
          <p className="text-slate-500 font-medium">Define and manage available sports markets on the platform.</p>
        </div>
        <Button 
          variant="accent"
          onClick={() => { setEditingCategory({ isActive: true }); setIsModalOpen(true); }}
          className="flex items-center gap-2 w-full md:w-auto px-8"
        >
          <span className="material-symbols-outlined text-lg">add_circle</span> New Category
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {categories.map(cat => (
          <Card key={cat.id} className={`group hover:border-accent transition-all duration-300 ${!cat.isActive ? 'opacity-60 grayscale' : 'hover:shadow-xl hover:shadow-accent/5'}`}>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div className="size-16 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-all duration-500 overflow-hidden border border-slate-100">
                {cat.imageUrl ? (
                  <img src={cat.imageUrl} alt={cat.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="material-symbols-outlined text-3xl">{cat.icon || 'sports'}</span>
                )}
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="size-8" onClick={() => { setEditingCategory(cat); setIsModalOpen(true); }}>
                  <span className="material-symbols-outlined text-lg">edit</span>
                </Button>
                <Button variant="ghost" size="icon" className="size-8 text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(cat.id)}>
                  <span className="material-symbols-outlined text-lg">delete</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="mb-1 text-2xl font-black">{cat.name}</CardTitle>
              <div className="flex items-center justify-between mt-6">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{cat.matchCount} Events</span>
                <Badge variant={cat.isActive ? 'success' : 'outline'}>
                  {cat.isActive ? 'Active' : 'Disabled'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingCategory?.id ? 'Edit Category' : 'Create New Category'}
      >
        <form onSubmit={handleSave} className="space-y-8 py-2">
          <div className="space-y-2">
            <Label>Sport Display Name</Label>
            <Input 
              required
              value={editingCategory?.name || ''}
              onChange={e => setEditingCategory({ ...editingCategory, name: e.target.value })}
              placeholder="e.g. Cricket, Soccer"
              className="text-base font-bold"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Material Icon</Label>
              <Input 
                value={editingCategory?.icon || ''}
                onChange={e => setEditingCategory({ ...editingCategory, icon: e.target.value, imageUrl: '' })}
                placeholder="sports_soccer"
                className="font-mono"
              />
            </div>
            <div className="space-y-2">
              <Label>Or Image URL</Label>
              <Input 
                value={editingCategory?.imageUrl || ''}
                onChange={e => setEditingCategory({ ...editingCategory, imageUrl: e.target.value, icon: '' })}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <Checkbox 
              id="isActive"
              checked={editingCategory?.isActive !== false}
              onChange={e => setEditingCategory({ ...editingCategory, isActive: e.target.checked })}
            />
            <div className="grid gap-0.5">
              <label htmlFor="isActive" className="text-sm font-bold text-primary cursor-pointer leading-none">Category Visibility</label>
              <p className="text-[10px] text-slate-400 font-medium">When disabled, this sport will be hidden from the user panel.</p>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>Discard</Button>
            <Button type="submit" variant="accent" className="flex-1">Save Changes</Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default Categories;
