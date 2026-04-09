import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount)
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat('fr-FR').format(Math.round(n))
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}

export function formatDateShort(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'short',
  })
}

export function formatTime(time: string): string {
  return time.slice(0, 5)
}

export function slugify(str: string): string {
  return str.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function initials(name: string): string {
  return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
}

export function generateSessionToken(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export function addMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(':').map(Number)
  const total  = h * 60 + m + minutes
  return `${Math.floor(total / 60).toString().padStart(2, '0')}:${(total % 60).toString().padStart(2, '0')}`
}

export function generateTimeSlots(startTime: string, endTime: string, slotMinutes: number): string[] {
  const slots: string[] = []
  const [sh, sm] = startTime.split(':').map(Number)
  const [eh, em] = endTime.split(':').map(Number)
  let mins     = sh * 60 + sm
  const endMin = eh * 60 + em - 90
  while (mins <= endMin) {
    slots.push(`${Math.floor(mins/60).toString().padStart(2,'0')}:${(mins%60).toString().padStart(2,'0')}`)
    mins += slotMinutes
  }
  return slots
}

// ROI Calculator
export interface ROIInput {
  tables:         number  // nombre de tables
  coversPerDay:   number  // couverts/jour
  avgSpend:       number  // panier moyen €
  noshowPercent:  number  // % no-show actuel
  workDaysMonth:  number  // jours d'ouverture/mois
}

export interface ROIResult {
  currentMonthlyRevenue: number
  noshowLossMonthly:     number
  savedFromNoshows:      number
  gainFromVisibility:    number
  totalMonthlyGain:      number
  timeSavedHoursWeek:    number
  noshowReduction:       number  // %
  roiMonths:             number
  planCost:              number
}

export function calculateROI(input: ROIInput): ROIResult {
  const { tables, coversPerDay, avgSpend, noshowPercent, workDaysMonth } = input
  const planCost = 89 // Pro plan

  const currentMonthlyRevenue = coversPerDay * avgSpend * workDaysMonth
  const noshowLossMonthly     = currentMonthlyRevenue * (noshowPercent / 100)

  // TableVista reduces no-shows by 75% via SMS/email + online payment deposit
  const savedFromNoshows  = noshowLossMonthly * 0.75

  // +40% visibility online → +12% more covers
  const gainFromVisibility = currentMonthlyRevenue * 0.12

  const totalMonthlyGain = savedFromNoshows + gainFromVisibility

  // Time saved: 15min/reservation admin × covers/slots, ~30min/day per 10 tables
  const timeSavedHoursWeek = Math.round(tables * 0.3 * 7) / 7

  const noshowReduction = 75

  const roiMonths = planCost > 0 ? Math.max(1, Math.round(planCost / totalMonthlyGain * 10) / 10) : 0

  return {
    currentMonthlyRevenue,
    noshowLossMonthly,
    savedFromNoshows,
    gainFromVisibility,
    totalMonthlyGain,
    timeSavedHoursWeek,
    noshowReduction,
    roiMonths,
    planCost,
  }
}
