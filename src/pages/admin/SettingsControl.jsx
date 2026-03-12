import React, { useState, useContext, useEffect } from 'react';
import { SettingsContext } from '../../context/SettingsContext';
import { Save, Plus, Trash2, Edit2, Check, X, Image as ImageIcon } from 'lucide-react';

export default function SettingsControl() {
    const { settings, updateSettings, refreshSettings } = useContext(SettingsContext);
    const [activeTab, setActiveTab] = useState('hero');
    const [localSettings, setLocalSettings] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    // Initialize local state when settings loads
    useEffect(() => {
        if (settings) {
            setLocalSettings(JSON.parse(JSON.stringify(settings)));
        }
    }, [settings]);

    if (!localSettings) {
        return <div className="p-8 text-center text-gray-500">Loading settings data...</div>;
    }

    const showMessage = (text, type = 'success') => {
        setMessage({ text, type });
        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    };

    const handleSave = async () => {
        setIsSaving(true);
        const result = await updateSettings(localSettings);
        setIsSaving(false);
        if (result.success) {
            showMessage('Settings saved successfully!');
            refreshSettings();
        } else {
            showMessage(result.message || 'Failed to save settings.', 'error');
        }
    };

    // --- GENERIC ARRAY HANDLERS ---
    const updateArrayItem = (path, index, field, value) => {
        const pathParts = path.split('.');
        const newSettings = { ...localSettings };
        let current = newSettings;

        for (let i = 0; i < pathParts.length - 1; i++) {
            current = current[pathParts[i]];
        }

        const arrayRef = current[pathParts[pathParts.length - 1]];

        if (typeof arrayRef[index] === 'string' || typeof arrayRef[index] === 'number') {
            arrayRef[index] = value;
        } else {
            arrayRef[index][field] = value;
        }
        setLocalSettings(newSettings);
    };

    const addArrayItem = (path, newItem) => {
        const pathParts = path.split('.');
        const newSettings = { ...localSettings };
        let current = newSettings;

        for (let i = 0; i < pathParts.length - 1; i++) {
            if (!current[pathParts[i]]) current[pathParts[i]] = {};
            current = current[pathParts[i]];
        }

        const lastPart = pathParts[pathParts.length - 1];
        if (!current[lastPart]) current[lastPart] = [];

        current[lastPart].push(newItem);
        setLocalSettings(newSettings);
    };

    const removeArrayItem = (path, index) => {
        const pathParts = path.split('.');
        const newSettings = { ...localSettings };
        let current = newSettings;

        for (let i = 0; i < pathParts.length - 1; i++) {
            current = current[pathParts[i]];
        }

        current[pathParts[pathParts.length - 1]].splice(index, 1);
        setLocalSettings(newSettings);
    };

    // --- RENDER HELPERS ---
    const renderHeroSettings = () => (
        <div className="space-y-6">
            <h3 className="text-lg font-bold">Hero Images (Home Page)</h3>
            <div className="grid gap-4">
                {localSettings.heroImages.map((imgUrl, idx) => (
                    <div key={idx} className="flex gap-4 items-center bg-gray-50 p-4 rounded-lg border">
                        <img src={imgUrl} alt={`Hero ${idx}`} className="w-24 h-16 object-cover rounded bg-gray-200" />
                        <input
                            type="text"
                            className="flex-1 p-2 border rounded"
                            value={imgUrl || ''}
                            onChange={(e) => updateArrayItem('heroImages', idx, null, e.target.value)}
                        />
                        <button onClick={() => removeArrayItem('heroImages', idx)} className="p-2 text-red-500 hover:bg-red-50 rounded">
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))}
            </div>
            <button onClick={() => addArrayItem('heroImages', '')} className="flex items-center gap-2 text-brand-red font-bold py-2 px-4 border border-brand-red rounded hover:bg-red-50">
                <Plus size={16} /> Add Hero Image URL
            </button>
        </div>
    );

    const renderServiceSettings = () => (
        <div className="space-y-6">
            <h3 className="text-lg font-bold">Services Listing</h3>
            <div className="space-y-6">
                {localSettings.services.map((svc, idx) => (
                    <div key={idx} className="bg-gray-50 p-6 rounded-lg border space-y-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-gray-700">Service #{idx + 1}</span>
                            <button onClick={() => removeArrayItem('services', idx)} className="p-2 text-red-500 hover:bg-red-50 rounded">
                                <Trash2 size={20} />
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm mb-1">ID (must be unique)</label>
                                <input type="text" className="w-full p-2 border rounded" value={svc.id || ''} onChange={(e) => updateArrayItem('services', idx, 'id', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Title</label>
                                <input type="text" className="w-full p-2 border rounded" value={svc.title || ''} onChange={(e) => updateArrayItem('services', idx, 'title', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Display Price (e.g. From $15)</label>
                                <input type="text" className="w-full p-2 border rounded" value={svc.price || ''} onChange={(e) => updateArrayItem('services', idx, 'price', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Image URL</label>
                                <input type="text" className="w-full p-2 border rounded" value={svc.image || ''} onChange={(e) => updateArrayItem('services', idx, 'image', e.target.value)} />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm mb-1">Description</label>
                                <textarea className="w-full p-2 border rounded" rows="2" value={svc.description || ''} onChange={(e) => updateArrayItem('services', idx, 'description', e.target.value)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={() => addArrayItem('services', { id: `service-${Date.now()}`, title: 'New Service', price: 'From $10', description: '', image: '' })} className="flex items-center gap-2 text-brand-red font-bold py-2 px-4 border border-brand-red rounded hover:bg-red-50">
                <Plus size={16} /> Add Service
            </button>
        </div>
    );

    const renderCatalogSettings = () => (
        <div className="space-y-6">
            <h3 className="text-lg font-bold">Catalog Listing</h3>
            <div className="space-y-6">
                {localSettings.catalog.map((cat, idx) => (
                    <div key={idx} className="bg-gray-50 p-6 rounded-lg border space-y-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-gray-700">Catalog Item #{idx + 1}</span>
                            <button onClick={() => removeArrayItem('catalog', idx)} className="p-2 text-red-500 hover:bg-red-50 rounded">
                                <Trash2 size={20} />
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm mb-1">ID (must be unique)</label>
                                <input type="text" className="w-full p-2 border rounded" value={cat.id || ''} onChange={(e) => updateArrayItem('catalog', idx, 'id', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Name</label>
                                <input type="text" className="w-full p-2 border rounded" value={cat.name || ''} onChange={(e) => updateArrayItem('catalog', idx, 'name', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Display Price (e.g. From $15)</label>
                                <input type="text" className="w-full p-2 border rounded" value={cat.price || ''} onChange={(e) => updateArrayItem('catalog', idx, 'price', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Image URL</label>
                                <input type="text" className="w-full p-2 border rounded" value={cat.image || ''} onChange={(e) => updateArrayItem('catalog', idx, 'image', e.target.value)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={() => addArrayItem('catalog', { id: `cat-${Date.now()}`, name: 'New Item', price: 'From $10', image: '' })} className="flex items-center gap-2 text-brand-red font-bold py-2 px-4 border border-brand-red rounded hover:bg-red-50">
                <Plus size={16} /> Add Catalog Item
            </button>
        </div>
    );

    const renderBuilderSettings = () => {
        const b = localSettings.builder || { products: [], paperOptions: [], finishOptions: [], quantities: [] };

        return (
            <div className="space-y-10">
                {/* Builder Products */}
                <div>
                    <h3 className="text-lg font-bold mb-4 border-b pb-2">Builder Calculator: Base Products</h3>
                    <div className="grid gap-4">
                        {b.products.map((p, idx) => (
                            <div key={idx} className="flex gap-4 items-center bg-gray-50 p-4 rounded-lg border">
                                <input type="text" placeholder="ID" className="w-1/4 p-2 border rounded" value={p.id || ''} onChange={(e) => updateArrayItem('builder.products', idx, 'id', e.target.value)} />
                                <input type="text" placeholder="Name" className="flex-1 p-2 border rounded" value={p.name || ''} onChange={(e) => updateArrayItem('builder.products', idx, 'name', e.target.value)} />
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-500">$</span>
                                    <input type="number" placeholder="Base Price" className="w-24 p-2 border rounded" value={p.basePrice || 0} onChange={(e) => updateArrayItem('builder.products', idx, 'basePrice', parseFloat(e.target.value))} />
                                </div>
                                <button onClick={() => removeArrayItem('builder.products', idx)} className="p-2 text-red-500 hover:bg-red-50 rounded">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => addArrayItem('builder.products', { id: 'new', name: 'New Product', basePrice: 10 })} className="mt-4 flex items-center gap-2 text-brand-red font-bold py-2 px-4 border border-brand-red rounded hover:bg-red-50">
                        <Plus size={16} /> Add Product
                    </button>
                </div>

                {/* Paper Options */}
                <div>
                    <h3 className="text-lg font-bold mb-4 border-b pb-2">Builder Calculator: Paper Options</h3>
                    <p className="text-sm text-gray-500 mb-4">Multipliers compound against the base price (e.g. 1.0 = 100%, 1.5 = +50%)</p>
                    <div className="grid gap-4">
                        {b.paperOptions.map((po, idx) => (
                            <div key={idx} className="flex gap-4 items-center bg-gray-50 p-4 rounded-lg border">
                                <input type="text" placeholder="ID (e.g. premium)" className="w-1/4 p-2 border rounded" value={po.id || ''} onChange={(e) => updateArrayItem('builder.paperOptions', idx, 'id', e.target.value)} />
                                <input type="text" placeholder="Display Name" className="flex-1 p-2 border rounded" value={po.name || ''} onChange={(e) => updateArrayItem('builder.paperOptions', idx, 'name', e.target.value)} />
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-500">x</span>
                                    <input type="number" step="0.1" className="w-24 p-2 border rounded" value={po.multiplier || 1} onChange={(e) => updateArrayItem('builder.paperOptions', idx, 'multiplier', parseFloat(e.target.value))} />
                                </div>
                                <button onClick={() => removeArrayItem('builder.paperOptions', idx)} className="p-2 text-red-500 hover:bg-red-50 rounded">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => addArrayItem('builder.paperOptions', { id: 'new-paper', name: 'New Paper', multiplier: 1.0 })} className="mt-4 flex items-center gap-2 text-brand-red font-bold py-2 px-4 border border-brand-red rounded hover:bg-red-50">
                        <Plus size={16} /> Add Paper Option
                    </button>
                </div>

                {/* Finish Options */}
                <div>
                    <h3 className="text-lg font-bold mb-4 border-b pb-2">Builder Calculator: Finish Options</h3>
                    <div className="grid gap-4">
                        {b.finishOptions.map((fo, idx) => (
                            <div key={idx} className="flex gap-4 items-center bg-gray-50 p-4 rounded-lg border">
                                <input type="text" placeholder="ID" className="w-1/4 p-2 border rounded" value={fo.id || ''} onChange={(e) => updateArrayItem('builder.finishOptions', idx, 'id', e.target.value)} />
                                <input type="text" placeholder="Display Name" className="flex-1 p-2 border rounded" value={fo.name || ''} onChange={(e) => updateArrayItem('builder.finishOptions', idx, 'name', e.target.value)} />
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-500">x</span>
                                    <input type="number" step="0.1" className="w-24 p-2 border rounded" value={fo.multiplier || 1} onChange={(e) => updateArrayItem('builder.finishOptions', idx, 'multiplier', parseFloat(e.target.value))} />
                                </div>
                                <button onClick={() => removeArrayItem('builder.finishOptions', idx)} className="p-2 text-red-500 hover:bg-red-50 rounded">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => addArrayItem('builder.finishOptions', { id: 'new-finish', name: 'New Finish', multiplier: 1.0 })} className="mt-4 flex items-center gap-2 text-brand-red font-bold py-2 px-4 border border-brand-red rounded hover:bg-red-50">
                        <Plus size={16} /> Add Finish Option
                    </button>
                </div>

                {/* Quantities */}
                <div>
                    <h3 className="text-lg font-bold mb-4 border-b pb-2">Builder Calculator: Available Quantities</h3>
                    <div className="flex flex-wrap gap-4">
                        {b.quantities.map((q, idx) => (
                            <div key={idx} className="flex gap-2 items-center bg-gray-50 p-2 pr-4 rounded-full border">
                                <button onClick={() => removeArrayItem('builder.quantities', idx)} className="p-1 text-red-500 hover:bg-red-100 rounded-full">
                                    <X size={16} />
                                </button>
                                <input
                                    type="number"
                                    className="w-20 p-1 border-b bg-transparent outline-none text-center font-bold"
                                    value={q || 0}
                                    onChange={(e) => updateArrayItem('builder.quantities', idx, null, parseInt(e.target.value))}
                                />
                            </div>
                        ))}
                        <button onClick={() => addArrayItem('builder.quantities', 100)} className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-red text-white hover:bg-red-600 shadow">
                            <Plus size={20} />
                        </button>
                    </div>
                </div>

            </div>
        );
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="flex justify-between items-center mb-8 border-b pb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Website Controls</h2>
                    <p className="text-gray-500">Manage all dynamic content and calculator prices</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-brand-dark text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                    {isSaving ? 'Saving...' : <><Save size={20} /> Save Changes</>}
                </button>
            </div>

            {message.text && (
                <div className={`mb-6 p-4 rounded-lg font-bold ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {message.text}
                </div>
            )}

            <div className="flex flex-col md:flex-row gap-8">
                {/* Tabs Sidebar */}
                <div className="md:w-64 space-y-2">
                    {[
                        { id: 'hero', label: 'Hero Images' },
                        { id: 'services', label: 'Services Listing' },
                        { id: 'catalog', label: 'Catalog Listing' },
                        { id: 'builder', label: 'Calculator Pricing' },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === tab.id ? 'bg-brand-red text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 min-h-[500px]">
                    {activeTab === 'hero' && renderHeroSettings()}
                    {activeTab === 'services' && renderServiceSettings()}
                    {activeTab === 'catalog' && renderCatalogSettings()}
                    {activeTab === 'builder' && renderBuilderSettings()}
                </div>
            </div>
        </div>
    );
}
