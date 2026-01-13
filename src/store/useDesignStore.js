import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

// Furniture catalog data
const furnitureCatalog = [
  // Seating
  { id: 'sofa-modern', name: 'Modern Sofa', category: 'seating', style: 'modern', price: 1299, dimensions: { w: 2.2, h: 0.85, d: 0.95 }, color: '#4a5568' },
  { id: 'sofa-sectional', name: 'L-Shaped Sectional', category: 'seating', style: 'modern', price: 2499, dimensions: { w: 3.0, h: 0.85, d: 2.2 }, color: '#2d3748' },
  { id: 'armchair-accent', name: 'Accent Armchair', category: 'seating', style: 'modern', price: 599, dimensions: { w: 0.8, h: 0.9, d: 0.85 }, color: '#667eea' },
  { id: 'chair-dining', name: 'Dining Chair', category: 'seating', style: 'scandinavian', price: 199, dimensions: { w: 0.5, h: 0.9, d: 0.55 }, color: '#d69e2e' },
  { id: 'stool-bar', name: 'Bar Stool', category: 'seating', style: 'industrial', price: 149, dimensions: { w: 0.4, h: 0.75, d: 0.4 }, color: '#1a202c' },
  
  // Tables
  { id: 'table-coffee', name: 'Coffee Table', category: 'tables', style: 'modern', price: 449, dimensions: { w: 1.2, h: 0.45, d: 0.6 }, color: '#2d3748' },
  { id: 'table-dining', name: 'Dining Table', category: 'tables', style: 'scandinavian', price: 899, dimensions: { w: 1.8, h: 0.76, d: 0.9 }, color: '#c4a35a' },
  { id: 'table-side', name: 'Side Table', category: 'tables', style: 'modern', price: 199, dimensions: { w: 0.5, h: 0.55, d: 0.5 }, color: '#e2e8f0' },
  { id: 'desk-office', name: 'Office Desk', category: 'tables', style: 'modern', price: 699, dimensions: { w: 1.5, h: 0.75, d: 0.7 }, color: '#2d3748' },
  { id: 'console-entry', name: 'Console Table', category: 'tables', style: 'modern', price: 349, dimensions: { w: 1.2, h: 0.8, d: 0.35 }, color: '#4a5568' },
  
  // Lighting
  { id: 'lamp-floor', name: 'Floor Lamp', category: 'lighting', style: 'modern', price: 249, dimensions: { w: 0.4, h: 1.6, d: 0.4 }, color: '#f6e05e' },
  { id: 'lamp-table', name: 'Table Lamp', category: 'lighting', style: 'modern', price: 129, dimensions: { w: 0.3, h: 0.5, d: 0.3 }, color: '#fbd38d' },
  { id: 'pendant-cluster', name: 'Pendant Cluster', category: 'lighting', style: 'modern', price: 399, dimensions: { w: 0.6, h: 0.8, d: 0.6 }, color: '#ed8936' },
  { id: 'chandelier', name: 'Modern Chandelier', category: 'lighting', style: 'luxe', price: 899, dimensions: { w: 0.8, h: 0.6, d: 0.8 }, color: '#faf089' },
  
  // Storage
  { id: 'shelf-bookcase', name: 'Bookcase', category: 'storage', style: 'modern', price: 449, dimensions: { w: 0.9, h: 2.0, d: 0.35 }, color: '#2d3748' },
  { id: 'cabinet-tv', name: 'TV Console', category: 'storage', style: 'modern', price: 599, dimensions: { w: 1.8, h: 0.5, d: 0.45 }, color: '#1a202c' },
  { id: 'dresser', name: 'Bedroom Dresser', category: 'storage', style: 'modern', price: 799, dimensions: { w: 1.4, h: 0.85, d: 0.5 }, color: '#4a5568' },
  { id: 'wardrobe', name: 'Wardrobe', category: 'storage', style: 'scandinavian', price: 1299, dimensions: { w: 1.8, h: 2.2, d: 0.6 }, color: '#c4a35a' },
  
  // Decor
  { id: 'plant-fiddle', name: 'Fiddle Leaf Fig', category: 'decor', style: 'any', price: 89, dimensions: { w: 0.5, h: 1.2, d: 0.5 }, color: '#48bb78' },
  { id: 'plant-monstera', name: 'Monstera Plant', category: 'decor', style: 'any', price: 69, dimensions: { w: 0.6, h: 0.9, d: 0.6 }, color: '#38a169' },
  { id: 'rug-area', name: 'Area Rug', category: 'decor', style: 'modern', price: 349, dimensions: { w: 2.5, h: 0.02, d: 1.8 }, color: '#4a5568' },
  { id: 'mirror-wall', name: 'Wall Mirror', category: 'decor', style: 'modern', price: 199, dimensions: { w: 0.8, h: 1.2, d: 0.05 }, color: '#e2e8f0' },
  { id: 'art-canvas', name: 'Canvas Art', category: 'decor', style: 'modern', price: 149, dimensions: { w: 1.0, h: 0.7, d: 0.05 }, color: '#667eea' },
  
  // Beds
  { id: 'bed-king', name: 'King Bed Frame', category: 'bedroom', style: 'modern', price: 1499, dimensions: { w: 2.0, h: 1.1, d: 2.2 }, color: '#4a5568' },
  { id: 'bed-queen', name: 'Queen Bed Frame', category: 'bedroom', style: 'scandinavian', price: 1199, dimensions: { w: 1.6, h: 1.0, d: 2.1 }, color: '#c4a35a' },
  { id: 'nightstand', name: 'Nightstand', category: 'bedroom', style: 'modern', price: 249, dimensions: { w: 0.5, h: 0.55, d: 0.4 }, color: '#2d3748' },
];

// Room presets
const roomPresets = {
  'living-modern': {
    name: 'Modern Living Room',
    style: 'modern',
    dimensions: { width: 6, depth: 5, height: 3 },
    suggestedFurniture: ['sofa-modern', 'table-coffee', 'lamp-floor', 'cabinet-tv', 'plant-fiddle', 'rug-area'],
  },
  'living-scandinavian': {
    name: 'Scandinavian Living',
    style: 'scandinavian',
    dimensions: { width: 5, depth: 4.5, height: 2.8 },
    suggestedFurniture: ['sofa-modern', 'table-coffee', 'armchair-accent', 'shelf-bookcase', 'plant-monstera'],
  },
  'bedroom-master': {
    name: 'Master Bedroom',
    style: 'modern',
    dimensions: { width: 5, depth: 4.5, height: 3 },
    suggestedFurniture: ['bed-king', 'nightstand', 'nightstand', 'dresser', 'lamp-table', 'plant-fiddle'],
  },
  'office-home': {
    name: 'Home Office',
    style: 'modern',
    dimensions: { width: 4, depth: 3.5, height: 2.8 },
    suggestedFurniture: ['desk-office', 'chair-dining', 'shelf-bookcase', 'lamp-table', 'plant-monstera'],
  },
  'dining-room': {
    name: 'Dining Room',
    style: 'scandinavian',
    dimensions: { width: 4.5, depth: 4, height: 3 },
    suggestedFurniture: ['table-dining', 'chair-dining', 'chair-dining', 'chair-dining', 'chair-dining', 'pendant-cluster', 'console-entry'],
  },
};

// Design styles
const designStyles = [
  { id: 'modern', name: 'Modern', description: 'Clean lines, minimal ornamentation', colors: ['#2d3748', '#4a5568', '#667eea', '#e2e8f0'] },
  { id: 'scandinavian', name: 'Scandinavian', description: 'Light woods, cozy textiles, natural elements', colors: ['#c4a35a', '#e2e8f0', '#48bb78', '#faf5ff'] },
  { id: 'industrial', name: 'Industrial', description: 'Raw materials, exposed elements, urban edge', colors: ['#1a202c', '#4a5568', '#c05621', '#a0aec0'] },
  { id: 'luxe', name: 'Luxe', description: 'Rich textures, gold accents, sophisticated', colors: ['#2d3748', '#d69e2e', '#9f7aea', '#e2e8f0'] },
  { id: 'minimalist', name: 'Minimalist', description: 'Essential pieces only, maximum space', colors: ['#ffffff', '#e2e8f0', '#a0aec0', '#2d3748'] },
  { id: 'bohemian', name: 'Bohemian', description: 'Eclectic mix, layered textiles, global influence', colors: ['#d69e2e', '#9f7aea', '#ed8936', '#48bb78'] },
];

// AI responses for the stylist
const aiResponses = {
  greeting: "Hi! I'm your AI Interior Designer. Tell me about your dream space - what room are you designing, and what vibe are you going for?",
  suggestions: [
    "Based on your modern style preference, I'd suggest pairing the sleek sofa with a statement floor lamp and some greenery for balance.",
    "For a cozy Scandinavian feel, try lighter wood tones and add some textured throws and cushions.",
    "To maximize your budget, focus on one statement piece and complement with affordable accent items.",
    "Great choice! The sectional will anchor the space perfectly. Now let's add some personality with lighting.",
    "I notice your room has good natural light - let's use that by keeping window areas clear and using mirrors to bounce light around.",
  ],
  budgetAdvice: "With your budget, I'd recommend investing in key pieces like seating first, then adding accents gradually.",
  colorAdvice: "The colors you've chosen create a cohesive palette. Consider adding one accent color to make the space pop.",
};

// Main store
const useDesignStore = create((set, get) => ({
  // Room configuration
  room: {
    width: 6,
    depth: 5,
    height: 3,
    wallColor: '#1a1a25',
    floorColor: '#2d3748',
    floorTexture: 'wood',
  },
  
  // Furniture in the scene
  furniture: [],
  
  // Selected item
  selectedId: null,
  
  // View mode
  viewMode: 'edit', // 'edit' | 'preview' | 'ar' | '360'
  
  // Sidebar state
  sidebarTab: 'catalog', // 'catalog' | 'room' | 'ai'
  
  // AI Chat
  aiMessages: [
    { id: 'initial', role: 'assistant', content: aiResponses.greeting }
  ],
  isAITyping: false,
  
  // Camera position
  cameraPosition: [8, 6, 8],
  
  // History for undo/redo
  history: [],
  historyIndex: -1,
  
  // Loading state
  isLoading: false,
  
  // Design style
  currentStyle: 'modern',
  
  // Budget
  budget: 5000,
  
  // Catalog data
  catalog: furnitureCatalog,
  roomPresets,
  designStyles,
  
  // Actions
  setRoom: (roomConfig) => set((state) => ({
    room: { ...state.room, ...roomConfig }
  })),
  
  addFurniture: (catalogId) => {
    const item = furnitureCatalog.find(f => f.id === catalogId);
    if (!item) return;
    
    const newItem = {
      ...item,
      instanceId: uuidv4(),
      position: [0, item.dimensions.h / 2, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
    };
    
    set((state) => ({
      furniture: [...state.furniture, newItem],
      selectedId: newItem.instanceId,
    }));
    
    get().saveToHistory();
  },
  
  removeFurniture: (instanceId) => {
    set((state) => ({
      furniture: state.furniture.filter(f => f.instanceId !== instanceId),
      selectedId: state.selectedId === instanceId ? null : state.selectedId,
    }));
    get().saveToHistory();
  },
  
  updateFurniture: (instanceId, updates) => {
    set((state) => ({
      furniture: state.furniture.map(f => 
        f.instanceId === instanceId ? { ...f, ...updates } : f
      ),
    }));
  },
  
  selectFurniture: (instanceId) => {
    set({ selectedId: instanceId });
  },
  
  clearSelection: () => {
    set({ selectedId: null });
  },
  
  setViewMode: (mode) => {
    set({ viewMode: mode });
  },
  
  setSidebarTab: (tab) => {
    set({ sidebarTab: tab });
  },
  
  // Apply room preset
  applyPreset: (presetId) => {
    const preset = roomPresets[presetId];
    if (!preset) return;
    
    set((state) => ({
      room: {
        ...state.room,
        width: preset.dimensions.width,
        depth: preset.dimensions.depth,
        height: preset.dimensions.height,
      },
      furniture: [],
      currentStyle: preset.style,
    }));
    
    // Add suggested furniture
    const state = get();
    preset.suggestedFurniture.forEach((catalogId, index) => {
      const item = furnitureCatalog.find(f => f.id === catalogId);
      if (!item) return;
      
      // Simple grid placement
      const row = Math.floor(index / 3);
      const col = index % 3;
      const x = (col - 1) * 1.5;
      const z = (row - 1) * 1.5;
      
      const newItem = {
        ...item,
        instanceId: uuidv4(),
        position: [x, item.dimensions.h / 2, z],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
      };
      
      set((state) => ({
        furniture: [...state.furniture, newItem],
      }));
    });
    
    get().saveToHistory();
  },
  
  // AI Chat
  sendMessage: async (message) => {
    const userMessage = {
      id: uuidv4(),
      role: 'user',
      content: message,
    };
    
    set((state) => ({
      aiMessages: [...state.aiMessages, userMessage],
      isAITyping: true,
    }));
    
    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    // Generate contextual response
    let response = aiResponses.suggestions[Math.floor(Math.random() * aiResponses.suggestions.length)];
    
    if (message.toLowerCase().includes('budget')) {
      response = aiResponses.budgetAdvice;
    } else if (message.toLowerCase().includes('color')) {
      response = aiResponses.colorAdvice;
    }
    
    const aiMessage = {
      id: uuidv4(),
      role: 'assistant',
      content: response,
    };
    
    set((state) => ({
      aiMessages: [...state.aiMessages, aiMessage],
      isAITyping: false,
    }));
  },
  
  // Generate room from prompt
  generateFromPrompt: async (prompt) => {
    set({ isLoading: true });
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Parse prompt for keywords
    const promptLower = prompt.toLowerCase();
    let selectedPreset = 'living-modern';
    
    if (promptLower.includes('bedroom')) {
      selectedPreset = 'bedroom-master';
    } else if (promptLower.includes('office')) {
      selectedPreset = 'office-home';
    } else if (promptLower.includes('dining')) {
      selectedPreset = 'dining-room';
    } else if (promptLower.includes('scandinavian')) {
      selectedPreset = 'living-scandinavian';
    }
    
    get().applyPreset(selectedPreset);
    
    set({ isLoading: false });
  },
  
  // History management
  saveToHistory: () => {
    const state = get();
    const snapshot = {
      furniture: [...state.furniture],
      room: { ...state.room },
    };
    
    set((state) => ({
      history: [...state.history.slice(0, state.historyIndex + 1), snapshot],
      historyIndex: state.historyIndex + 1,
    }));
  },
  
  undo: () => {
    const state = get();
    if (state.historyIndex <= 0) return;
    
    const prevSnapshot = state.history[state.historyIndex - 1];
    set({
      furniture: prevSnapshot.furniture,
      room: prevSnapshot.room,
      historyIndex: state.historyIndex - 1,
    });
  },
  
  redo: () => {
    const state = get();
    if (state.historyIndex >= state.history.length - 1) return;
    
    const nextSnapshot = state.history[state.historyIndex + 1];
    set({
      furniture: nextSnapshot.furniture,
      room: nextSnapshot.room,
      historyIndex: state.historyIndex + 1,
    });
  },
  
  // Calculate total cost
  getTotalCost: () => {
    const state = get();
    return state.furniture.reduce((sum, item) => sum + item.price, 0);
  },
  
  // Clear all furniture
  clearAll: () => {
    set({ furniture: [], selectedId: null });
    get().saveToHistory();
  },
  
  // Set design style
  setStyle: (styleId) => {
    set({ currentStyle: styleId });
  },
  
  // Update budget
  setBudget: (amount) => {
    set({ budget: amount });
  },
}));

export default useDesignStore;
