'use client'

import { useState, useRef, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ArrowLeft, Plus, Save, Trash2, Circle, Square, RectangleHorizontal, Settings, Check } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type TableShape = 'round' | 'square' | 'rectangle'

interface FloorTable {
  id: string
  name: string
  capacity: number
  zone: string
  x: number
  y: number
  shape: TableShape
  isNew?: boolean
}

const ZONES = ['Salle principale', 'Terrasse', 'Bar', 'Mezzanine', 'Salon privé']
const GRID = 20 // px per grid cell
const TABLE_W = 80
const TABLE_H = 60

function TableShape({ shape, capacity }: { shape: TableShape; capacity: number }) {
  const base = 'w-full h-full flex items-center justify-center text-white text-xs font-bold select-none'
  if (shape === 'round')
    return <div className={cn(base, 'rounded-full')} />
  if (shape === 'square')
    return <div className={cn(base, 'rounded-xl')} />
  return <div className={cn(base, 'rounded-lg')} />
}

let idCounter = 0
function newId() { return `new-${++idCounter}` }
function snap(v: number) { return Math.round(v / GRID) * GRID }

export function FloorPlanEditor({
  restaurantId, restaurantName, initialTables,
}: {
  restaurantId: string
  restaurantName: string
  initialTables: FloorTable[]
}) {
  const [tables, setTables]         = useState<FloorTable[]>(initialTables)
  const [selected, setSelected]     = useState<string | null>(null)
  const [saving, setSaving]         = useState(false)
  const [saved, setSaved]           = useState(false)
  const [addShape, setAddShape]     = useState<TableShape>('round')
  const canvasRef                   = useRef<HTMLDivElement>(null)
  const dragging                    = useRef<{ id: string; ox: number; oy: number } | null>(null)

  const selectedTable = tables.find(t => t.id === selected)

  // ── Add a new table ──────────────────────────────────────────────────────
  function addTable() {
    const newTable: FloorTable = {
      id: newId(),
      name: `T${tables.length + 1}`,
      capacity: 4,
      zone: ZONES[0],
      x: snap(60 + Math.random() * 200),
      y: snap(60 + Math.random() * 200),
      shape: addShape,
      isNew: true,
    }
    setTables(prev => [...prev, newTable])
    setSelected(newTable.id)
  }

  // ── Delete selected ──────────────────────────────────────────────────────
  function deleteSelected() {
    if (!selected) return
    setTables(prev => prev.filter(t => t.id !== selected))
    setSelected(null)
  }

  // ── Drag ─────────────────────────────────────────────────────────────────
  const onMouseDown = useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    setSelected(id)
    const t = tables.find(t => t.id === id)!
    dragging.current = { id, ox: e.clientX - t.x, oy: e.clientY - t.y }

    const onMove = (e: MouseEvent) => {
      const d = dragging.current
      if (!d || !canvasRef.current) return
      const rect = canvasRef.current.getBoundingClientRect()
      const x = snap(Math.max(0, Math.min(e.clientX - d.ox, rect.width - TABLE_W)))
      const y = snap(Math.max(0, Math.min(e.clientY - d.oy, rect.height - TABLE_H)))
      setTables(prev => prev.map(t => t.id === d.id ? { ...t, x, y } : t))
    }
    const onUp = () => {
      dragging.current = null
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [tables])

  // ── Update property ───────────────────────────────────────────────────────
  function update(id: string, patch: Partial<FloorTable>) {
    setTables(prev => prev.map(t => t.id === id ? { ...t, ...patch } : t))
  }

  // ── Save to Supabase ──────────────────────────────────────────────────────
  async function save() {
    setSaving(true)
    const supabase = createClient()

    for (const t of tables) {
      const row = {
        restaurant_id: restaurantId,
        name: t.name,
        capacity: t.capacity,
        zone: t.zone,
        x: t.x,
        y: t.y,
        shape: t.shape,
      }
      if (t.isNew) {
        const { data } = await supabase.from('tables').insert(row).select('id').single()
        if (data) setTables(prev => prev.map(tb => tb.id === t.id ? { ...tb, id: data.id, isNew: false } : tb))
      } else {
        await supabase.from('tables').update(row).eq('id', t.id)
      }
    }

    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] -m-6">

      {/* ── Toolbar ──────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 px-5 py-3 bg-white border-b border-nature-200 shrink-0">
        <Link href="/dashboard/floor-plan"
          className="flex items-center gap-1.5 text-forest-600 hover:text-forest-900 text-sm font-medium transition-colors">
          <ArrowLeft className="w-4 h-4" /> Retour
        </Link>
        <div className="w-px h-5 bg-nature-200" />
        <span className="text-sm font-semibold text-forest-900">{restaurantName} — Éditeur de plan</span>

        <div className="ml-auto flex items-center gap-2">
          {/* Shape selector */}
          <div className="flex items-center gap-1 bg-nature-100 rounded-xl p-1">
            {(['round', 'square', 'rectangle'] as TableShape[]).map(s => (
              <button key={s} onClick={() => setAddShape(s)}
                className={cn('p-2 rounded-lg transition-all', addShape === s ? 'bg-white shadow-sm text-forest-700' : 'text-forest-500 hover:text-forest-700')}>
                {s === 'round'     && <Circle className="w-4 h-4" />}
                {s === 'square'    && <Square className="w-4 h-4" />}
                {s === 'rectangle' && <RectangleHorizontal className="w-4 h-4" />}
              </button>
            ))}
          </div>

          <button onClick={addTable}
            className="flex items-center gap-1.5 bg-forest-600 hover:bg-forest-700 text-white text-sm font-semibold px-3.5 py-2 rounded-xl transition-colors">
            <Plus className="w-4 h-4" /> Ajouter table
          </button>

          {selected && (
            <button onClick={deleteSelected}
              className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-semibold px-3.5 py-2 rounded-xl transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          <button onClick={save} disabled={saving}
            className={cn(
              'flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-xl transition-all',
              saved
                ? 'bg-forest-100 text-forest-700'
                : 'bg-forest-800 hover:bg-forest-900 text-white'
            )}>
            {saved ? <><Check className="w-4 h-4" /> Sauvegardé</> : saving ? 'Sauvegarde…' : <><Save className="w-4 h-4" /> Sauvegarder</>}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">

        {/* ── Canvas ─────────────────────────────────────────────────────── */}
        <div className="flex-1 overflow-auto bg-nature-50 relative"
          onClick={() => setSelected(null)}>

          {/* Grid background */}
          <div ref={canvasRef}
            className="relative"
            style={{
              width: 1200, height: 800, minWidth: '100%', minHeight: '100%',
              backgroundImage: `
                linear-gradient(rgba(22,101,52,0.06) 1px, transparent 1px),
                linear-gradient(90deg, rgba(22,101,52,0.06) 1px, transparent 1px)`,
              backgroundSize: `${GRID}px ${GRID}px`,
            }}>

            {/* Zone labels */}
            {ZONES.slice(0, 3).map((zone, i) => (
              <div key={zone} className="absolute text-xs text-forest-400/50 font-semibold uppercase tracking-wider pointer-events-none select-none"
                style={{ left: 20 + i * 380, top: 12 }}>
                {zone}
              </div>
            ))}

            {/* Zone dividers */}
            {[380, 760].map(x => (
              <div key={x} className="absolute top-0 bottom-0 w-px bg-nature-200/60 pointer-events-none"
                style={{ left: x }} />
            ))}

            {tables.map(t => (
              <div key={t.id}
                onMouseDown={e => onMouseDown(e, t.id)}
                className={cn(
                  'absolute cursor-grab active:cursor-grabbing transition-shadow',
                  selected === t.id ? 'ring-2 ring-forest-500 ring-offset-2 rounded-xl z-10' : 'hover:ring-2 hover:ring-forest-300 hover:ring-offset-1 rounded-xl'
                )}
                style={{ left: t.x, top: t.y, width: t.shape === 'rectangle' ? 100 : TABLE_W, height: TABLE_H }}>

                <div className={cn(
                  'w-full h-full flex flex-col items-center justify-center text-white text-[11px] font-bold select-none shadow-md',
                  t.shape === 'round'     ? 'rounded-full' : '',
                  t.shape === 'square'    ? 'rounded-xl'   : '',
                  t.shape === 'rectangle' ? 'rounded-lg'   : '',
                  selected === t.id ? 'bg-forest-600' : 'bg-forest-700 hover:bg-forest-600',
                )}>
                  <span>{t.name}</span>
                  <span className="text-forest-200 text-[10px] font-medium">{t.capacity} pers.</span>
                </div>
              </div>
            ))}

            {tables.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <p className="text-forest-400/60 text-sm font-medium">Cliquez sur "Ajouter table" pour commencer</p>
                  <p className="text-forest-400/40 text-xs mt-1">Glissez les tables pour les positionner</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Properties panel ─────────────────────────────────────────────── */}
        <div className={cn(
          'w-64 shrink-0 bg-white border-l border-nature-200 flex flex-col transition-all duration-300',
          selectedTable ? 'translate-x-0' : 'translate-x-full hidden'
        )}>
          {selectedTable && (
            <>
              <div className="px-4 py-3 border-b border-nature-100 flex items-center gap-2">
                <Settings className="w-4 h-4 text-forest-600" />
                <span className="text-sm font-semibold text-forest-900">Propriétés</span>
              </div>
              <div className="p-4 space-y-4 overflow-y-auto flex-1">

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-forest-700 uppercase tracking-wide">Nom</label>
                  <input type="text" value={selectedTable.name}
                    onChange={e => update(selectedTable.id, { name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-nature-200 bg-white text-forest-900 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-forest-700 uppercase tracking-wide">Capacité</label>
                  <div className="flex items-center gap-2">
                    <button onClick={() => update(selectedTable.id, { capacity: Math.max(1, selectedTable.capacity - 1) })}
                      className="w-8 h-8 rounded-lg bg-nature-100 hover:bg-nature-200 flex items-center justify-center text-forest-700 font-bold transition-colors">−</button>
                    <span className="flex-1 text-center font-bold text-forest-900">{selectedTable.capacity}</span>
                    <button onClick={() => update(selectedTable.id, { capacity: Math.min(20, selectedTable.capacity + 1) })}
                      className="w-8 h-8 rounded-lg bg-nature-100 hover:bg-nature-200 flex items-center justify-center text-forest-700 font-bold transition-colors">+</button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-forest-700 uppercase tracking-wide">Forme</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['round', 'square', 'rectangle'] as TableShape[]).map(s => (
                      <button key={s} onClick={() => update(selectedTable.id, { shape: s })}
                        className={cn('py-2 rounded-lg border text-xs font-medium transition-all flex flex-col items-center gap-1',
                          selectedTable.shape === s ? 'border-forest-500 bg-forest-50 text-forest-700' : 'border-nature-200 text-forest-500 hover:border-nature-300')}>
                        {s === 'round'     && <Circle className="w-4 h-4" />}
                        {s === 'square'    && <Square className="w-4 h-4" />}
                        {s === 'rectangle' && <RectangleHorizontal className="w-3 h-3" />}
                        <span className="text-[10px]">{s === 'round' ? 'Rond' : s === 'square' ? 'Carré' : 'Rect.'}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-forest-700 uppercase tracking-wide">Zone</label>
                  <select value={selectedTable.zone}
                    onChange={e => update(selectedTable.id, { zone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-nature-200 bg-white text-forest-900 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400">
                    {ZONES.map(z => <option key={z} value={z}>{z}</option>)}
                  </select>
                </div>

                <div className="pt-2 border-t border-nature-100">
                  <div className="grid grid-cols-2 gap-2 text-xs text-forest-500">
                    <div>X: <span className="font-mono text-forest-700">{selectedTable.x}px</span></div>
                    <div>Y: <span className="font-mono text-forest-700">{selectedTable.y}px</span></div>
                  </div>
                </div>

                <button onClick={deleteSelected}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-sm font-medium transition-colors">
                  <Trash2 className="w-4 h-4" /> Supprimer la table
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Status bar ─────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-4 px-5 py-2 bg-forest-900 text-forest-400 text-xs shrink-0">
        <span>{tables.length} table{tables.length > 1 ? 's' : ''}</span>
        <span>·</span>
        <span>{tables.reduce((s, t) => s + t.capacity, 0)} couverts au total</span>
        {selected && (
          <>
            <span>·</span>
            <span className="text-forest-300">Table sélectionnée : {selectedTable?.name}</span>
          </>
        )}
        <span className="ml-auto">Grille {GRID}px · Glisser pour déplacer</span>
      </div>
    </div>
  )
}
