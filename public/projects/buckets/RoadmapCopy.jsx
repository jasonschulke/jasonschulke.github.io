import { useState, useEffect, useCallback, useMemo } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { Heading } from '../components/heading'
import { Text } from '../components/text'
import { Badge } from '../components/badge'
import { Button } from '../components/button'
import { Avatar } from '../components/avatar'
import { getCurrentUser, getUsers, isAdmin } from '../lib/users'

const API_URL = '/.netlify/functions/roadmap'

const TYPE_OPTIONS = [
  { value: 'feature', label: 'Feature Request', color: 'violet', icon: 'lightbulb', iconColor: 'amber' },
  { value: 'bug', label: 'Bug', color: 'rose', icon: 'bug_report', iconColor: 'rose' },
]

const PRIORITY_OPTIONS = [
  { value: 'high', label: 'High', color: 'red', icon: 'flag' },
  { value: 'medium', label: 'Medium', color: 'amber', icon: 'flag' },
  { value: 'low', label: 'Low', color: 'green', icon: 'flag' },
]

const COMPLEXITY_OPTIONS = [
  { value: 'high', label: 'High', color: 'purple', icon: 'speed' },
  { value: 'medium', label: 'Medium', color: 'blue', icon: 'speed' },
  { value: 'low', label: 'Low', color: 'cyan', icon: 'speed' },
]

const STATUS_OPTIONS = [
  { value: 'backlog', label: 'Backlog', color: 'zinc', icon: 'snooze', iconColor: 'zinc' },
  { value: 'idea', label: 'Idea', color: 'purple', icon: 'lightbulb', iconColor: 'purple' },
  { value: 'planned', label: 'Planned', color: 'orange', icon: 'event', iconColor: 'orange' },
  { value: 'developing', label: 'Developing', color: 'blue', icon: 'electric_bolt', iconColor: 'blue' },
  { value: 'shipped', label: 'Shipped', color: 'green', icon: 'check_circle', iconColor: 'green' },
]

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Format date for display
function formatDate(timestamp) {
  if (!timestamp) return null
  const date = new Date(timestamp)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// Default avatar component for users without photos
function DefaultAvatar({ className = 'size-6' }) {
  return (
    <div className={`${className} rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center shrink-0`}>
      <MaterialIcon name="person" size={parseInt(className.match(/size-(\d+)/)?.[1] || '6') * 2.5} className="text-zinc-400 dark:text-zinc-500" />
    </div>
  )
}

// User avatar with fallback to default
function UserAvatar({ user, className = 'size-6' }) {
  if (user?.photo) {
    return <Avatar src={user.photo} className={className} alt={user?.name || 'User'} />
  }
  return <DefaultAvatar className={className} />
}

// Color mapping for dynamic styles (Tailwind needs static class names)
const dropZoneStyles = {
  zinc: {
    border: 'border-zinc-400',
    bg: 'bg-zinc-50 dark:bg-zinc-900/20',
    text: 'text-zinc-600 dark:text-zinc-400',
    icon: 'text-zinc-500',
  },
  blue: {
    border: 'border-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    text: 'text-blue-600 dark:text-blue-400',
    icon: 'text-blue-500',
  },
  amber: {
    border: 'border-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    text: 'text-amber-600 dark:text-amber-400',
    icon: 'text-amber-500',
  },
  green: {
    border: 'border-green-400',
    bg: 'bg-green-50 dark:bg-green-900/20',
    text: 'text-green-600 dark:text-green-400',
    icon: 'text-green-500',
  },
  red: {
    border: 'border-red-400',
    bg: 'bg-red-50 dark:bg-red-900/20',
    text: 'text-red-600 dark:text-red-400',
    icon: 'text-red-500',
  },
  purple: {
    border: 'border-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    text: 'text-purple-600 dark:text-purple-400',
    icon: 'text-purple-500',
  },
  cyan: {
    border: 'border-cyan-400',
    bg: 'bg-cyan-50 dark:bg-cyan-900/20',
    text: 'text-cyan-600 dark:text-cyan-400',
    icon: 'text-cyan-500',
  },
  violet: {
    border: 'border-violet-400',
    bg: 'bg-violet-50 dark:bg-violet-900/20',
    text: 'text-violet-600 dark:text-violet-400',
    icon: 'text-violet-500',
  },
  rose: {
    border: 'border-rose-400',
    bg: 'bg-rose-50 dark:bg-rose-900/20',
    text: 'text-rose-600 dark:text-rose-400',
    icon: 'text-rose-500',
  },
  orange: {
    border: 'border-orange-400',
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    text: 'text-orange-600 dark:text-orange-400',
    icon: 'text-orange-500',
  },
}

async function fetchIdeas() {
  const res = await fetch(API_URL)
  const data = await res.json()
  return data.ideas || []
}

async function createIdea(idea) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(idea),
  })
  return res.json()
}

async function updateIdea(idea) {
  const res = await fetch(API_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(idea),
  })
  return res.json()
}

async function updateAllIdeas(ideas) {
  const res = await fetch(API_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ideas),
  })
  return res.json()
}

async function deleteIdea(id) {
  const res = await fetch(API_URL, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  })
  return res.json()
}

function MaterialIcon({ name, className = '', size = 24 }) {
  return (
    <span
      className={`material-symbols-outlined shrink-0 ${className}`}
      style={{
        fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
        fontSize: `${size}px`,
        lineHeight: 1,
      }}
    >
      {name}
    </span>
  )
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border-0 ring-1 ring-inset ring-zinc-200 bg-white px-2.5 py-1.5 text-xs text-zinc-900 focus:ring-2 focus:ring-blue-500 dark:ring-zinc-700 dark:bg-zinc-800/50 dark:text-white cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

function UserSelectField({ label, value, onChange, users }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">{label}</label>
      <select
        value={value?.id || ''}
        onChange={(e) => {
          const selectedUser = users.find((u) => u.id === e.target.value)
          if (selectedUser) {
            onChange({ id: selectedUser.id, name: selectedUser.name, photo: selectedUser.photo })
          }
        }}
        className="rounded-md border-0 ring-1 ring-inset ring-zinc-200 bg-white px-2.5 py-1.5 text-xs text-zinc-900 focus:ring-2 focus:ring-blue-500 dark:ring-zinc-700 dark:bg-zinc-800/50 dark:text-white cursor-pointer"
      >
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  )
}

// Activity timeline component - shows field change history
function ActivityTimeline({ idea }) {
  // Use activityLog if available, otherwise empty
  const activities = idea.activityLog || []

  // Sort by date descending (newest first)
  const sortedActivities = [...activities].sort((a, b) => b.date - a.date)

  if (sortedActivities.length === 0) {
    return (
      <div className="text-[11px] text-zinc-400 dark:text-zinc-500 italic py-2">
        No activity yet
      </div>
    )
  }

  return (
    <ul role="list" className="space-y-3">
      {sortedActivities.map((activity, idx) => (
        <li key={activity.id || idx} className="relative flex gap-x-2.5">
          {/* Vertical line */}
          <div
            className={`absolute top-0 left-[7px] flex w-px justify-center ${
              idx === sortedActivities.length - 1 ? 'h-4' : '-bottom-3'
            }`}
          >
            <div className="w-px bg-zinc-200 dark:bg-zinc-700/50" />
          </div>

          {/* Icon */}
          <div className="relative flex size-4 flex-none items-center justify-center">
            {activity.type === 'shipped' ? (
              <MaterialIcon name="check_circle" size={14} className="text-green-500" />
            ) : activity.type === 'created' ? (
              <MaterialIcon name="add_circle" size={14} className="text-blue-400" />
            ) : (
              <div className="size-1.5 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            )}
          </div>

          {/* Content */}
          <div className="flex-auto min-w-0 pt-px">
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-4">
              <span className="font-medium text-zinc-600 dark:text-zinc-300">{activity.person}</span>{' '}
              {activity.action}
            </p>
            <time className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5 block">
              {formatDate(activity.date)}
            </time>
          </div>
        </li>
      ))}
    </ul>
  )
}

// Icon badge component for displaying field values with icons
function IconBadge({ icon, label, color, iconColor }) {
  const colorStyles = {
    zinc: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300',
    blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    amber: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    green: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
    red: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
    purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    cyan: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
    violet: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
    rose: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
    orange: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  }
  const iconColors = {
    zinc: 'text-zinc-500',
    blue: 'text-blue-500',
    amber: 'text-amber-500',
    green: 'text-green-500',
    red: 'text-red-500',
    purple: 'text-purple-500',
    cyan: 'text-cyan-500',
    violet: 'text-violet-500',
    rose: 'text-rose-500',
    orange: 'text-orange-500',
  }

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ${colorStyles[color] || colorStyles.zinc}`}>
      <MaterialIcon name={icon} size={12} className={iconColors[iconColor || color] || iconColors.zinc} />
      {label}
    </span>
  )
}

function IdeaCard({ idea, onUpdate, onDelete, onDragStart, onDragOver, onDrop, onDragEnd, isDragging, users, isSelected, onToggleSelect, groupBy, isExpanded, onToggleExpand, canManage }) {
  const [localTitle, setLocalTitle] = useState(idea.title)
  const [localDescription, setLocalDescription] = useState(idea.description)
  const [isEditingTitle, setIsEditingTitle] = useState(false)

  // Sync local state when idea changes externally
  useEffect(() => {
    setLocalTitle(idea.title)
    setLocalDescription(idea.description)
  }, [idea.title, idea.description])

  const typeOption = TYPE_OPTIONS.find((t) => t.value === idea.type) || TYPE_OPTIONS[0]
  const priorityOption = PRIORITY_OPTIONS.find((p) => p.value === idea.priority) || PRIORITY_OPTIONS[2]
  const complexityOption = COMPLEXITY_OPTIONS.find((c) => c.value === idea.complexity) || COMPLEXITY_OPTIONS[2]
  const statusOption = STATUS_OPTIONS.find((s) => s.value === idea.status) || STATUS_OPTIONS[0]

  const handleTitleBlur = () => {
    setIsEditingTitle(false)
    if (localTitle.trim() && localTitle !== idea.title) {
      onUpdate({ ...idea, title: localTitle.trim() })
    } else {
      setLocalTitle(idea.title) // Reset if empty
    }
  }

  const handleTitleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur()
    } else if (e.key === 'Escape') {
      setLocalTitle(idea.title)
      setIsEditingTitle(false)
    }
  }

  const handleDescriptionBlur = () => {
    if (localDescription !== idea.description) {
      onUpdate({ ...idea, description: localDescription })
    }
  }

  return (
    <div
      draggable={canManage && !isEditingTitle}
      onDragStart={canManage ? (e) => onDragStart(e, idea.id) : undefined}
      onDragOver={canManage ? onDragOver : undefined}
      onDrop={canManage ? (e) => onDrop(e, idea.id) : undefined}
      onDragEnd={canManage ? onDragEnd : undefined}
      className={`rounded-xl border bg-white dark:bg-zinc-800 transition-all ${canManage && !isEditingTitle ? 'cursor-grab active:cursor-grabbing' : ''} ${
        isDragging
          ? 'border-blue-400 shadow-lg scale-[1.02] opacity-90'
          : isSelected
          ? 'border-blue-400 ring-2 ring-blue-400/20'
          : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 hover:shadow-sm'
      }`}
    >
      {/* Header - always visible */}
      <div
        className="flex items-center gap-3 p-4 cursor-pointer"
        onClick={() => !isEditingTitle && onToggleExpand(idea.id)}
      >
        {/* Checkbox for bulk selection - admin only */}
        {canManage && (
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => {
              e.stopPropagation()
              onToggleSelect(idea.id)
            }}
            onClick={(e) => e.stopPropagation()}
            className="rounded border-zinc-300 text-blue-600 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-700 shrink-0"
          />
        )}
        {canManage && (
          <div className="flex items-center text-zinc-300 dark:text-zinc-600 hover:text-zinc-400 dark:hover:text-zinc-500 transition-colors">
            <MaterialIcon name="drag_indicator" size={20} />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <UserAvatar user={idea.createdBy} className="size-7" />
            {canManage && isEditingTitle ? (
              <input
                type="text"
                value={localTitle}
                onChange={(e) => setLocalTitle(e.target.value)}
                onBlur={handleTitleBlur}
                onKeyDown={handleTitleKeyDown}
                onClick={(e) => e.stopPropagation()}
                className="flex-1 min-w-0 rounded-md border-0 ring-1 ring-inset ring-zinc-300 bg-white px-2 py-1 text-sm font-medium text-zinc-900 focus:ring-2 focus:ring-blue-500 dark:ring-zinc-600 dark:bg-zinc-800 dark:text-white"
                autoFocus
              />
            ) : (
              <h3
                className={`font-medium text-zinc-900 dark:text-white truncate ${canManage && isExpanded ? 'hover:text-blue-600 dark:hover:text-blue-400 cursor-text' : ''}`}
                onClick={(e) => {
                  if (canManage && isExpanded) {
                    e.stopPropagation()
                    setIsEditingTitle(true)
                  }
                }}
                title={canManage ? 'Click to edit' : undefined}
              >
                {idea.title}
              </h3>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {groupBy !== 'type' && (
            <IconBadge icon={typeOption.icon} label={typeOption.value === 'bug' ? 'Bug' : 'Feature'} color={typeOption.color} iconColor={typeOption.iconColor} />
          )}
          {groupBy !== 'status' && (
            <IconBadge icon={statusOption.icon} label={statusOption.label} color={statusOption.color} iconColor={statusOption.iconColor} />
          )}
          {groupBy !== 'priority' && (
            <IconBadge icon="flag" label={priorityOption.label} color={priorityOption.color} />
          )}
          {groupBy !== 'complexity' && (
            <IconBadge icon="speed" label={complexityOption.label} color={complexityOption.color} />
          )}
          <MaterialIcon
            name={isExpanded ? 'expand_less' : 'expand_more'}
            size={18}
            className="text-zinc-400 dark:text-zinc-500 ml-1"
          />
        </div>
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div className="border-t border-zinc-100 dark:border-zinc-700/50 bg-zinc-50/50 dark:bg-zinc-900/30 p-4 space-y-4">
          <div className="space-y-4">
              {/* Layout: 2/5 select fields | 2/5 description | 1/5 activity */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                {/* 2/5 - Select fields */}
                <div className="lg:col-span-2 grid grid-cols-2 gap-2 content-start">
                  {canManage ? (
                    <>
                      <SelectField
                        label="Type"
                        value={idea.type || 'feature'}
                        onChange={(value) => onUpdate({ ...idea, type: value })}
                        options={TYPE_OPTIONS}
                      />
                      <SelectField
                        label="Status"
                        value={idea.status || 'backlog'}
                        onChange={(value) => onUpdate({ ...idea, status: value })}
                        options={STATUS_OPTIONS}
                      />
                      <SelectField
                        label="Priority"
                        value={idea.priority || 'low'}
                        onChange={(value) => onUpdate({ ...idea, priority: value })}
                        options={PRIORITY_OPTIONS}
                      />
                      <SelectField
                        label="Complexity"
                        value={idea.complexity || 'low'}
                        onChange={(value) => onUpdate({ ...idea, complexity: value })}
                        options={COMPLEXITY_OPTIONS}
                      />
                      <UserSelectField
                        label="Submitted By"
                        value={idea.createdBy}
                        onChange={(value) => onUpdate({ ...idea, createdBy: value })}
                        users={users}
                      />
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">Target Date</label>
                        <input
                          type="date"
                          value={idea.targetDate ? new Date(idea.targetDate).toISOString().split('T')[0] : ''}
                          onChange={(e) => onUpdate({ ...idea, targetDate: e.target.value ? new Date(e.target.value).getTime() : null })}
                          className="rounded-md border-0 ring-1 ring-inset ring-zinc-200 bg-white px-2 py-1.5 text-xs text-zinc-900 focus:ring-2 focus:ring-blue-500 dark:ring-zinc-700 dark:bg-zinc-800/50 dark:text-white cursor-pointer"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">Ship Date</label>
                        <input
                          type="date"
                          value={idea.shipDate ? new Date(idea.shipDate).toISOString().split('T')[0] : ''}
                          onChange={(e) => onUpdate({ ...idea, shipDate: e.target.value ? new Date(e.target.value).getTime() : null })}
                          className="rounded-md border-0 ring-1 ring-inset ring-zinc-200 bg-white px-2 py-1.5 text-xs text-zinc-900 focus:ring-2 focus:ring-blue-500 dark:ring-zinc-700 dark:bg-zinc-800/50 dark:text-white cursor-pointer"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">Type</label>
                        <IconBadge icon={typeOption.icon} label={typeOption.label} color={typeOption.color} iconColor={typeOption.iconColor} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">Status</label>
                        <IconBadge icon={statusOption.icon} label={statusOption.label} color={statusOption.color} iconColor={statusOption.iconColor} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">Priority</label>
                        <IconBadge icon="flag" label={priorityOption.label} color={priorityOption.color} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">Complexity</label>
                        <IconBadge icon="speed" label={complexityOption.label} color={complexityOption.color} />
                      </div>
                      {idea.createdBy && (
                        <div className="flex flex-col gap-1">
                          <label className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">Submitted By</label>
                          <div className="flex items-center gap-1.5">
                            <UserAvatar user={idea.createdBy} className="size-5" />
                            <span className="text-xs text-zinc-700 dark:text-zinc-300">{idea.createdBy?.name || 'Unknown'}</span>
                          </div>
                        </div>
                      )}
                      {idea.targetDate && (
                        <div className="flex flex-col gap-1">
                          <label className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">Target Date</label>
                          <span className="text-xs text-zinc-700 dark:text-zinc-300">{formatDate(idea.targetDate)}</span>
                        </div>
                      )}
                      {idea.shipDate && (
                        <div className="flex flex-col gap-1">
                          <label className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">Ship Date</label>
                          <span className="text-xs text-zinc-700 dark:text-zinc-300">{formatDate(idea.shipDate)}</span>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* 2/5 - Description */}
                <div className="lg:col-span-2 flex flex-col gap-1">
                  <label className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">Description</label>
                  {canManage ? (
                    <textarea
                      value={localDescription}
                      onChange={(e) => setLocalDescription(e.target.value)}
                      onBlur={handleDescriptionBlur}
                      placeholder="Add a description..."
                      className="flex-1 min-h-[100px] bg-white dark:bg-zinc-800 rounded-lg p-3 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex-1 bg-white dark:bg-zinc-800 rounded-lg p-3 border border-zinc-200 dark:border-zinc-700">
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {idea.description || <span className="italic text-zinc-400">No description provided</span>}
                      </p>
                    </div>
                  )}
                </div>

                {/* 1/5 - Activity */}
                <div className="lg:col-span-1 flex flex-col">
                  {/* Timestamps */}
                  <div className="space-y-1.5 mb-3 pb-3 border-b border-zinc-100 dark:border-zinc-700/50">
                    <div className="flex items-center gap-1.5 text-[11px]">
                      <MaterialIcon name="add_circle" size={12} className="text-zinc-400" />
                      <span className="text-zinc-500 dark:text-zinc-400">Created</span>
                      <span className="ml-auto font-medium text-zinc-600 dark:text-zinc-300">
                        {idea.createdAt ? formatDate(idea.createdAt) : '—'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px]">
                      <MaterialIcon name="edit_note" size={12} className="text-zinc-400" />
                      <span className="text-zinc-500 dark:text-zinc-400">Modified</span>
                      <span className="ml-auto font-medium text-zinc-600 dark:text-zinc-300">
                        {idea.lastModified ? formatDate(idea.lastModified) : '—'}
                      </span>
                    </div>
                    {idea.shippedAt && (
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <MaterialIcon name="rocket_launch" size={12} className="text-green-500" />
                        <span className="text-green-600 dark:text-green-400">Shipped</span>
                        <span className="ml-auto font-medium text-green-600 dark:text-green-400">
                          {formatDate(idea.shippedAt)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Activity Timeline */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <MaterialIcon name="history" size={12} className="text-zinc-400" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Activity</span>
                  </div>
                  <div className="flex-1 overflow-y-auto max-h-32" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <ActivityTimeline idea={idea} />
                  </div>
                </div>
              </div>

              {/* Actions - admin only */}
              {canManage && (
                <div className="flex items-center justify-end pt-3 border-t border-zinc-100 dark:border-zinc-700/50">
                  <button
                    onClick={() => onDelete(idea.id)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <MaterialIcon name="delete" size={14} />
                    Delete
                  </button>
                </div>
              )}
            </div>
        </div>
      )}
    </div>
  )
}

function CalendarView({ ideas, dateField, onDateFieldChange, onUpdate, onDelete, users, expandedId, onToggleExpand, canManage }) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [showUndatedSidebar, setShowUndatedSidebar] = useState(true)
  const [draggedId, setDraggedId] = useState(null)
  const [dragOverDate, setDragOverDate] = useState(null)
  const [dragOverSidebar, setDragOverSidebar] = useState(false)

  // Find the expanded idea for the detail panel
  const expandedIdea = expandedId ? ideas.find(i => i.id === expandedId) : null

  // Get ideas without the selected date field
  const undatedIdeas = ideas.filter(idea => !idea[dateField])

  // Drag handlers
  const handleDragStart = (e, ideaId) => {
    setDraggedId(ideaId)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', ideaId)
  }

  const handleDragEnd = () => {
    setDraggedId(null)
    setDragOverDate(null)
    setDragOverSidebar(false)
  }

  const handleDateDragOver = (e, date) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    if (date) {
      setDragOverDate(date.toISOString())
    }
  }

  const handleDateDragLeave = () => {
    setDragOverDate(null)
  }

  const handleDateDrop = (e, date) => {
    e.preventDefault()
    if (!draggedId || !date) return

    const idea = ideas.find(i => i.id === draggedId)
    if (idea) {
      // Set the date to noon to avoid timezone issues
      const newDate = new Date(date)
      newDate.setHours(12, 0, 0, 0)
      onUpdate({ ...idea, [dateField]: newDate.getTime() })
    }

    setDraggedId(null)
    setDragOverDate(null)
  }

  const handleSidebarDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverSidebar(true)
  }

  const handleSidebarDragLeave = () => {
    setDragOverSidebar(false)
  }

  const handleSidebarDrop = (e) => {
    e.preventDefault()
    if (!draggedId) return

    const idea = ideas.find(i => i.id === draggedId)
    if (idea) {
      // Remove the date
      onUpdate({ ...idea, [dateField]: null })
    }

    setDraggedId(null)
    setDragOverSidebar(false)
  }

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startDayOfWeek = firstDay.getDay()

    const days = []
    // Add empty cells for days before the first of the month
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null)
    }
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    return days
  }

  const getIdeasForDate = (date) => {
    if (!date) return []
    const dateStr = date.toISOString().split('T')[0]
    return ideas.filter(idea => {
      const ideaDate = idea[dateField]
      if (!ideaDate) return false
      // Handle both string dates (from Airtable) and timestamp numbers
      const ideaDateStr = typeof ideaDate === 'number'
        ? new Date(ideaDate).toISOString().split('T')[0]
        : ideaDate.split('T')[0]
      return ideaDateStr === dateStr
    })
  }

  const formatMonth = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const goToToday = () => {
    setCurrentMonth(new Date())
  }

  const days = getDaysInMonth(currentMonth)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const getTypeColor = (type) => {
    return type === 'feature' ? 'bg-green-100 border-green-300 text-green-800 dark:bg-green-900/30 dark:border-green-700 dark:text-green-300' :
           'bg-rose-100 border-rose-300 text-rose-800 dark:bg-rose-900/30 dark:border-rose-700 dark:text-rose-300'
  }

  return (
    <div className="flex gap-4">
      {/* Main Calendar */}
      <div className={`rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800 ${showUndatedSidebar ? 'flex-1' : 'w-full'}`}>
        {/* Calendar Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-700">
          <div className="flex items-center gap-3">
            <button
              onClick={prevMonth}
              className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400"
            >
              <MaterialIcon name="chevron_left" size={20} />
            </button>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white min-w-[180px] text-center">
              {formatMonth(currentMonth)}
            </h2>
            <button
              onClick={nextMonth}
              className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400"
            >
              <MaterialIcon name="chevron_right" size={20} />
            </button>
            <button
              onClick={goToToday}
              className="ml-2 px-3 py-1.5 text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-700"
            >
              Today
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-500 dark:text-zinc-400">Show by:</span>
              <select
                value={dateField}
                onChange={(e) => onDateFieldChange(e.target.value)}
                className="text-sm rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-zinc-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-300"
              >
                <option value="shipDate">Ship Date</option>
                <option value="targetDate">Target Date</option>
              </select>
            </div>
            {!showUndatedSidebar && undatedIdeas.length > 0 && (
              <button
                onClick={() => setShowUndatedSidebar(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg dark:text-amber-400 dark:hover:text-amber-300 dark:hover:bg-amber-900/20"
              >
                <MaterialIcon name="event_busy" size={16} />
                <span>{undatedIdeas.length} without dates</span>
              </button>
            )}
          </div>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 border-b border-zinc-200 dark:border-zinc-700">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-center text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {days.map((date, index) => {
            const dayIdeas = getIdeasForDate(date)
            const isToday = date && date.getTime() === today.getTime()
            const isCurrentMonth = date !== null
            const isDropTarget = date && draggedId && dragOverDate === date.toISOString()

            return (
              <div
                key={index}
                className={`min-h-[120px] border-b border-r border-zinc-100 dark:border-zinc-700/50 p-1.5 transition-colors ${
                  !isCurrentMonth ? 'bg-zinc-50 dark:bg-zinc-800/50' : ''
                } ${isToday ? 'bg-blue-50 dark:bg-blue-900/20' : ''} ${
                  isDropTarget ? 'bg-blue-100 dark:bg-blue-900/40 ring-2 ring-inset ring-blue-400' : ''
                }`}
                onDragOver={canManage ? (e) => handleDateDragOver(e, date) : undefined}
                onDragLeave={canManage ? handleDateDragLeave : undefined}
                onDrop={canManage ? (e) => handleDateDrop(e, date) : undefined}
              >
                {date && (
                  <>
                    <div className={`text-sm font-medium mb-1 ${
                      isToday
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-zinc-700 dark:text-zinc-300'
                    }`}>
                      {date.getDate()}
                    </div>
                    <div className="space-y-1">
                      {dayIdeas.slice(0, 3).map(idea => (
                        <div
                          key={idea.id}
                          draggable={canManage}
                          onDragStart={canManage ? (e) => handleDragStart(e, idea.id) : undefined}
                          onDragEnd={canManage ? handleDragEnd : undefined}
                          className={`text-[10px] px-1.5 py-0.5 rounded border truncate cursor-pointer hover:ring-2 hover:ring-blue-400 ${getTypeColor(idea.type)} ${
                            draggedId === idea.id ? 'opacity-50' : ''
                          }`}
                          title={idea.title}
                          onClick={(e) => {
                            e.stopPropagation()
                            if (!draggedId) onToggleExpand(idea.id)
                          }}
                        >
                          {idea.title}
                        </div>
                      ))}
                      {dayIdeas.length > 3 && (
                        <div className="text-[10px] text-zinc-500 dark:text-zinc-400 px-1">
                          +{dayIdeas.length - 3} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Undated Items Sidebar */}
      {showUndatedSidebar && (
        <div
          className={`w-72 flex-shrink-0 rounded-xl border bg-white dark:bg-zinc-800 flex flex-col transition-colors ${
            dragOverSidebar
              ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20'
              : 'border-zinc-200 dark:border-zinc-700'
          }`}
          onDragOver={canManage ? handleSidebarDragOver : undefined}
          onDragLeave={canManage ? handleSidebarDragLeave : undefined}
          onDrop={canManage ? handleSidebarDrop : undefined}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-700">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-zinc-900 dark:text-white">Without dates</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">({undatedIdeas.length})</span>
            </div>
            <button
              onClick={() => setShowUndatedSidebar(false)}
              className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
            >
              <MaterialIcon name="close" size={18} />
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto p-3">
            {dragOverSidebar && draggedId && (
              <div className="mb-3 p-3 rounded-lg border-2 border-dashed border-amber-400 bg-amber-100/50 dark:bg-amber-900/30 text-center">
                <MaterialIcon name="event_busy" size={20} className="text-amber-500 mx-auto mb-1" />
                <p className="text-xs font-medium text-amber-700 dark:text-amber-300">Drop to remove date</p>
              </div>
            )}
            {undatedIdeas.length === 0 && !dragOverSidebar ? (
              <div className="text-center py-8">
                <MaterialIcon name="event_available" size={32} className="text-zinc-300 dark:text-zinc-600 mx-auto mb-2" />
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  All items have dates
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {undatedIdeas.map(idea => (
                  <div
                    key={idea.id}
                    draggable={canManage}
                    onDragStart={canManage ? (e) => handleDragStart(e, idea.id) : undefined}
                    onDragEnd={canManage ? handleDragEnd : undefined}
                    className={`bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden cursor-pointer hover:border-zinc-300 dark:hover:border-zinc-600 hover:ring-2 hover:ring-blue-400 transition-colors ${
                      draggedId === idea.id ? 'opacity-50' : ''
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      if (!draggedId) onToggleExpand(idea.id)
                    }}
                  >
                    <div className="flex">
                      <div className="w-1 bg-amber-400 flex-shrink-0" />
                      <div className="p-3 flex-1 min-w-0">
                        <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">
                          {idea.title}
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                          No {dateField === 'shipDate' ? 'ship date' : 'target date'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Expanded Idea Panel */}
      {expandedIdea && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30" onClick={() => onToggleExpand(null)}>
          <div
            className="w-full max-w-lg bg-white dark:bg-zinc-800 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center gap-3">
                <UserAvatar user={expandedIdea.createdBy} className="size-8" />
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white">{expandedIdea.title}</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {expandedIdea.createdBy?.name || 'Unknown'} · {new Date(expandedIdea.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onToggleExpand(null)}
                className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
              >
                <MaterialIcon name="close" size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
              {/* Description */}
              <div>
                <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Description</label>
                {canManage ? (
                  <textarea
                    value={expandedIdea.description || ''}
                    onChange={(e) => onUpdate({ ...expandedIdea, description: e.target.value })}
                    placeholder="Add a description..."
                    className="mt-1 w-full min-h-[80px] bg-white dark:bg-zinc-900 rounded-lg p-3 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-700 dark:text-zinc-300 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
                    {expandedIdea.description || <span className="italic text-zinc-400">No description</span>}
                  </p>
                )}
              </div>

              {/* Fields Grid */}
              {canManage ? (
                <div className="grid grid-cols-2 gap-3">
                  <SelectField
                    label="Type"
                    value={expandedIdea.type || 'feature'}
                    onChange={(value) => onUpdate({ ...expandedIdea, type: value })}
                    options={TYPE_OPTIONS}
                  />
                  <SelectField
                    label="Status"
                    value={expandedIdea.status || 'backlog'}
                    onChange={(value) => onUpdate({ ...expandedIdea, status: value })}
                    options={STATUS_OPTIONS}
                  />
                  <SelectField
                    label="Priority"
                    value={expandedIdea.priority || 'low'}
                    onChange={(value) => onUpdate({ ...expandedIdea, priority: value })}
                    options={PRIORITY_OPTIONS}
                  />
                  <SelectField
                    label="Complexity"
                    value={expandedIdea.complexity || 'low'}
                    onChange={(value) => onUpdate({ ...expandedIdea, complexity: value })}
                    options={COMPLEXITY_OPTIONS}
                  />
                  <UserSelectField
                    label="Submitted By"
                    value={expandedIdea.createdBy}
                    onChange={(value) => onUpdate({ ...expandedIdea, createdBy: value })}
                    users={users}
                  />
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Target Date</label>
                    <input
                      type="date"
                      value={expandedIdea.targetDate ? new Date(expandedIdea.targetDate).toISOString().split('T')[0] : ''}
                      onChange={(e) => onUpdate({ ...expandedIdea, targetDate: e.target.value ? new Date(e.target.value).getTime() : null })}
                      className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Ship Date</label>
                    <input
                      type="date"
                      value={expandedIdea.shipDate ? new Date(expandedIdea.shipDate).toISOString().split('T')[0] : ''}
                      onChange={(e) => onUpdate({ ...expandedIdea, shipDate: e.target.value ? new Date(e.target.value).getTime() : null })}
                      className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Type</label>
                    <p className="text-sm text-zinc-900 dark:text-white mt-0.5">{TYPE_OPTIONS.find(t => t.value === expandedIdea.type)?.label || 'Feature'}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Status</label>
                    <p className="text-sm text-zinc-900 dark:text-white mt-0.5">{STATUS_OPTIONS.find(s => s.value === expandedIdea.status)?.label || 'Idea'}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Priority</label>
                    <p className="text-sm text-zinc-900 dark:text-white mt-0.5">{PRIORITY_OPTIONS.find(p => p.value === expandedIdea.priority)?.label || 'Low'}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Complexity</label>
                    <p className="text-sm text-zinc-900 dark:text-white mt-0.5">{COMPLEXITY_OPTIONS.find(c => c.value === expandedIdea.complexity)?.label || 'Low'}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {canManage && (
              <div className="flex items-center justify-end gap-2 p-4 border-t border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50">
                <button
                  onClick={() => {
                    onDelete(expandedIdea.id)
                    onToggleExpand(null)
                  }}
                  className="px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  Delete
                </button>
                <button
                  onClick={() => onToggleExpand(null)}
                  className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// Priority Matrix quadrant definitions - maps to status
const MATRIX_QUADRANTS = [
  { id: 'developing', label: 'Do Now', subtitle: 'Actively working on', color: 'blue', icon: 'electric_bolt', row: 0, col: 0 },
  { id: 'planned', label: 'Do Next', subtitle: 'Scheduled, coming soon', color: 'orange', icon: 'event', row: 0, col: 1 },
  { id: 'idea', label: 'Do Later', subtitle: 'Captured, not yet scheduled', color: 'purple', icon: 'lightbulb', row: 1, col: 0 },
  { id: 'backlog', label: 'Backlog', subtitle: 'Low priority, someday', color: 'zinc', icon: 'snooze', row: 1, col: 1 },
]

const matrixQuadrantStyles = {
  'developing': { bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800', header: 'bg-blue-100 dark:bg-blue-900/40', text: 'text-blue-700 dark:text-blue-300', icon: 'text-blue-500' },
  'planned': { bg: 'bg-orange-50 dark:bg-orange-900/20', border: 'border-orange-200 dark:border-orange-800', header: 'bg-orange-100 dark:bg-orange-900/40', text: 'text-orange-700 dark:text-orange-300', icon: 'text-orange-500' },
  'idea': { bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-200 dark:border-purple-800', header: 'bg-purple-100 dark:bg-purple-900/40', text: 'text-purple-700 dark:text-purple-300', icon: 'text-purple-500' },
  'backlog': { bg: 'bg-zinc-100 dark:bg-zinc-800/50', border: 'border-zinc-300 dark:border-zinc-700', header: 'bg-zinc-200 dark:bg-zinc-700/50', text: 'text-zinc-600 dark:text-zinc-400', icon: 'text-zinc-500' },
}

function EisenhowerView({ ideas, onUpdate, onDelete, users, expandedId, onToggleExpand, canManage }) {
  const [draggedId, setDraggedId] = useState(null)
  const [dragOverQuadrant, setDragOverQuadrant] = useState(null)

  // Find the expanded idea for the detail panel
  const expandedIdea = expandedId ? ideas.find(i => i.id === expandedId) : null

  // Filter out shipped items - they auto-leave the matrix
  const activeIdeas = ideas.filter(idea => idea.status !== 'shipped')

  // Get ideas for a specific quadrant (by status)
  const getQuadrantIdeas = (statusValue) => activeIdeas.filter(idea => idea.status === statusValue)

  // Drag handlers
  const handleDragStart = (e, ideaId) => {
    setDraggedId(ideaId)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', ideaId)
  }

  const handleDragEnd = () => {
    setDraggedId(null)
    setDragOverQuadrant(null)
  }

  const handleQuadrantDragOver = (e, quadrantId) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverQuadrant(quadrantId)
  }

  const handleQuadrantDragLeave = () => {
    setDragOverQuadrant(null)
  }

  const handleQuadrantDrop = (e, statusValue) => {
    e.preventDefault()
    if (!draggedId) return

    const idea = ideas.find(i => i.id === draggedId)
    if (idea && idea.status !== statusValue) {
      onUpdate({ ...idea, status: statusValue })
    }

    setDraggedId(null)
    setDragOverQuadrant(null)
  }

  return (
    <>
    <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-700">
        <div className="flex items-center gap-2">
          <MaterialIcon name="grid_view" size={20} className="text-zinc-500" />
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Priority Matrix</h2>
        </div>
        <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span>Shipped items auto-leave</span>
          </div>
        </div>
      </div>

        {/* Axis Labels + Grid */}
        <div className="p-4">
          {/* Top axis label */}
          <div className="flex mb-2">
            <div className="w-8" />
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="text-center text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Higher Importance</div>
              <div className="text-center text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Lower Importance</div>
            </div>
          </div>

          <div className="flex">
            {/* Left axis labels */}
            <div className="w-8 flex flex-col justify-around py-4 mr-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 [writing-mode:vertical-lr] rotate-180 text-center">Higher Urgency</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 [writing-mode:vertical-lr] rotate-180 text-center">Lower Urgency</div>
            </div>

            {/* 2x2 Grid */}
            <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-4">
              {MATRIX_QUADRANTS.map(quadrant => {
                const quadrantIdeas = getQuadrantIdeas(quadrant.id)
                const styles = matrixQuadrantStyles[quadrant.id]
                const isDropTarget = dragOverQuadrant === quadrant.id

                return (
                  <div
                    key={quadrant.id}
                    className={`min-h-[400px] rounded-xl border-2 transition-all ${styles.bg} ${
                      isDropTarget ? 'ring-2 ring-blue-400 border-blue-400' : styles.border
                    }`}
                    onDragOver={canManage ? (e) => handleQuadrantDragOver(e, quadrant.id) : undefined}
                    onDragLeave={canManage ? handleQuadrantDragLeave : undefined}
                    onDrop={canManage ? (e) => handleQuadrantDrop(e, quadrant.id) : undefined}
                  >
                    {/* Quadrant Header */}
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-t-lg ${styles.header}`}>
                      <MaterialIcon name={quadrant.icon} size={16} className={styles.icon} />
                      <div>
                        <h3 className={`text-sm font-semibold ${styles.text}`}>{quadrant.label}</h3>
                        <p className="text-[10px] text-zinc-500 dark:text-zinc-400">{quadrant.subtitle}</p>
                      </div>
                      <span className={`ml-auto text-xs font-medium ${styles.text}`}>{quadrantIdeas.length}</span>
                    </div>

                    {/* Quadrant Content */}
                    <div className="p-2 space-y-1.5 max-h-[300px] overflow-y-auto">
                      {quadrantIdeas.map(idea => {
                        const typeOpt = TYPE_OPTIONS.find(t => t.value === idea.type) || TYPE_OPTIONS[0]
                        const priorityOpt = PRIORITY_OPTIONS.find(p => p.value === idea.priority) || PRIORITY_OPTIONS[2]
                        const complexityOpt = COMPLEXITY_OPTIONS.find(c => c.value === idea.complexity) || COMPLEXITY_OPTIONS[2]
                        return (
                          <div
                            key={idea.id}
                            draggable={canManage}
                            onDragStart={canManage ? (e) => handleDragStart(e, idea.id) : undefined}
                            onDragEnd={canManage ? handleDragEnd : undefined}
                            className={`text-xs px-2 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all ${
                              draggedId === idea.id ? 'opacity-50' : ''
                            }`}
                            onClick={(e) => {
                              e.stopPropagation()
                              if (!draggedId) onToggleExpand(idea.id)
                            }}
                          >
                            <div className="flex items-center gap-1.5">
                              <UserAvatar user={idea.createdBy} className="size-4 shrink-0" />
                              <span className="font-medium line-clamp-1 flex-1 min-w-0">{idea.title}</span>
                              <div className="flex items-center gap-1 shrink-0">
                                <IconBadge icon={typeOpt.icon} label={typeOpt.value === 'bug' ? 'Bug' : 'Feature'} color={typeOpt.color} iconColor={typeOpt.iconColor} />
                                <IconBadge icon={priorityOpt.icon} label={priorityOpt.label} color={priorityOpt.color} iconColor={priorityOpt.color} />
                                <IconBadge icon={complexityOpt.icon} label={complexityOpt.label} color={complexityOpt.color} iconColor={complexityOpt.color} />
                              </div>
                            </div>
                          </div>
                        )
                      })}
                      {quadrantIdeas.length === 0 && (
                        <div className="text-center py-6 text-xs text-zinc-400 dark:text-zinc-500">
                          {canManage ? 'Drop items here' : 'No items'}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Idea Panel */}
      {expandedIdea && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30" onClick={() => onToggleExpand(null)}>
          <div
            className="w-full max-w-lg bg-white dark:bg-zinc-800 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center gap-3">
                <UserAvatar user={expandedIdea.createdBy} className="size-8" />
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white">{expandedIdea.title}</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {expandedIdea.createdBy?.name || 'Unknown'} · {new Date(expandedIdea.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onToggleExpand(null)}
                className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
              >
                <MaterialIcon name="close" size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
              {/* Description */}
              <div>
                <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Description</label>
                {canManage ? (
                  <textarea
                    value={expandedIdea.description || ''}
                    onChange={(e) => onUpdate({ ...expandedIdea, description: e.target.value })}
                    placeholder="Add a description..."
                    className="mt-1 w-full min-h-[80px] bg-white dark:bg-zinc-900 rounded-lg p-3 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-700 dark:text-zinc-300 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
                    {expandedIdea.description || <span className="italic text-zinc-400">No description</span>}
                  </p>
                )}
              </div>

              {/* Fields Grid */}
              {canManage ? (
                <div className="grid grid-cols-2 gap-3">
                  <SelectField
                    label="Type"
                    value={expandedIdea.type || 'feature'}
                    onChange={(value) => onUpdate({ ...expandedIdea, type: value })}
                    options={TYPE_OPTIONS}
                  />
                  <SelectField
                    label="Status"
                    value={expandedIdea.status || 'idea'}
                    onChange={(value) => onUpdate({ ...expandedIdea, status: value })}
                    options={STATUS_OPTIONS}
                  />
                  <SelectField
                    label="Priority"
                    value={expandedIdea.priority || 'low'}
                    onChange={(value) => onUpdate({ ...expandedIdea, priority: value })}
                    options={PRIORITY_OPTIONS}
                  />
                  <SelectField
                    label="Complexity"
                    value={expandedIdea.complexity || 'low'}
                    onChange={(value) => onUpdate({ ...expandedIdea, complexity: value })}
                    options={COMPLEXITY_OPTIONS}
                  />
                  <UserSelectField
                    label="Submitted By"
                    value={expandedIdea.createdBy}
                    onChange={(value) => onUpdate({ ...expandedIdea, createdBy: value })}
                    users={users}
                  />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">Target Date</label>
                    <input
                      type="date"
                      value={expandedIdea.targetDate ? new Date(expandedIdea.targetDate).toISOString().split('T')[0] : ''}
                      onChange={(e) => onUpdate({ ...expandedIdea, targetDate: e.target.value ? new Date(e.target.value).getTime() : null })}
                      className="rounded-md border-0 ring-1 ring-inset ring-zinc-200 bg-white px-2.5 py-1.5 text-xs text-zinc-900 focus:ring-2 focus:ring-blue-500 dark:ring-zinc-700 dark:bg-zinc-800/50 dark:text-white cursor-pointer"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">Ship Date</label>
                    <input
                      type="date"
                      value={expandedIdea.shipDate ? new Date(expandedIdea.shipDate).toISOString().split('T')[0] : ''}
                      onChange={(e) => onUpdate({ ...expandedIdea, shipDate: e.target.value ? new Date(e.target.value).getTime() : null })}
                      className="rounded-md border-0 ring-1 ring-inset ring-zinc-200 bg-white px-2.5 py-1.5 text-xs text-zinc-900 focus:ring-2 focus:ring-blue-500 dark:ring-zinc-700 dark:bg-zinc-800/50 dark:text-white cursor-pointer"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Type</label>
                    <p className="text-sm text-zinc-900 dark:text-white mt-0.5">{TYPE_OPTIONS.find(t => t.value === expandedIdea.type)?.label || 'Feature'}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Status</label>
                    <p className="text-sm text-zinc-900 dark:text-white mt-0.5">{STATUS_OPTIONS.find(s => s.value === expandedIdea.status)?.label || 'Idea'}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Priority</label>
                    <p className="text-sm text-zinc-900 dark:text-white mt-0.5">{PRIORITY_OPTIONS.find(p => p.value === expandedIdea.priority)?.label || 'Low'}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Complexity</label>
                    <p className="text-sm text-zinc-900 dark:text-white mt-0.5">{COMPLEXITY_OPTIONS.find(c => c.value === expandedIdea.complexity)?.label || 'Low'}</p>
                  </div>
                  {expandedIdea.createdBy && (
                    <div>
                      <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Submitted By</label>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <UserAvatar user={expandedIdea.createdBy} className="size-5" />
                        <span className="text-sm text-zinc-900 dark:text-white">{expandedIdea.createdBy?.name || 'Unknown'}</span>
                      </div>
                    </div>
                  )}
                  {expandedIdea.targetDate && (
                    <div>
                      <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Target Date</label>
                      <p className="text-sm text-zinc-900 dark:text-white mt-0.5">{formatDate(expandedIdea.targetDate)}</p>
                    </div>
                  )}
                  {expandedIdea.shipDate && (
                    <div>
                      <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Ship Date</label>
                      <p className="text-sm text-zinc-900 dark:text-white mt-0.5">{formatDate(expandedIdea.shipDate)}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            {canManage && (
              <div className="flex items-center justify-end gap-2 p-4 border-t border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50">
                <button
                  onClick={() => {
                    onDelete(expandedIdea.id)
                    onToggleExpand(null)
                  }}
                  className="px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  Delete
                </button>
                <button
                  onClick={() => onToggleExpand(null)}
                  className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

function KanbanColumn({ title, statusValue, ideas, color, iconColor, icon, onUpdate, onDelete, onDragStart, onDragOver, onDrop, onDragEnd, draggedId, dragOverGroup, onGroupDragEnter, onGroupDragLeave, groupBy, users, selectedIds, onToggleSelect, expandedId, onToggleExpand, onQuickAdd, canManage, isCollapsed, onToggleCollapse }) {
  const isDraggedFromDifferentColumn = draggedId && !ideas.find((i) => i.id === draggedId)
  const isDropTarget = dragOverGroup === statusValue && isDraggedFromDifferentColumn
  const colorStyle = dropZoneStyles[color] || dropZoneStyles.zinc
  const iconStyle = dropZoneStyles[iconColor] || colorStyle

  return (
    <div className={`flex flex-col transition-all ${isCollapsed ? 'w-12 min-w-[48px]' : 'flex-1 min-w-[280px]'}`}>
      {isCollapsed ? (
        // Collapsed state - vertical header
        <button
          onClick={() => onToggleCollapse(statusValue)}
          className="flex-1 flex flex-col items-center gap-2 py-3 px-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 hover:bg-zinc-200 dark:hover:bg-zinc-700/50 transition-colors group"
          title={`Expand ${title}`}
        >
          <MaterialIcon name="chevron_right" size={18} className="text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300" />
          <MaterialIcon name={icon} size={18} className={iconStyle.icon} />
          <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 [writing-mode:vertical-lr] rotate-180">{title}</span>
          <span className="text-xs text-zinc-400 dark:text-zinc-500 mt-auto">{ideas.length}</span>
        </button>
      ) : (
        // Expanded state
        <>
          <div className="flex items-center gap-2 mb-3 px-2">
            <button
              onClick={() => onToggleCollapse(statusValue)}
              className="flex items-center gap-2 group"
            >
              <MaterialIcon
                name="expand_more"
                size={18}
                className="text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors"
              />
              <MaterialIcon name={icon} size={18} className={iconStyle.icon} />
              <h3 className="font-semibold text-zinc-900 dark:text-white">{title}</h3>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">({ideas.length})</span>
            </button>
            <button
              onClick={() => onQuickAdd({ [groupBy]: statusValue })}
              className="ml-auto p-1 rounded-md text-zinc-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:bg-blue-900/30 transition-colors"
              title={`Add to ${title}`}
            >
              <MaterialIcon name="add" size={18} />
            </button>
          </div>
          <div
            className={`flex-1 space-y-3 p-3 rounded-xl min-h-[200px] transition-all ${
              isDropTarget
                ? `${colorStyle.bg} border-2 border-dashed ${colorStyle.border}`
                : 'bg-zinc-100 dark:bg-zinc-800/50'
            }`}
            onDragEnter={() => onGroupDragEnter(statusValue)}
            onDragLeave={(e) => onGroupDragLeave(e, statusValue)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault()
              if (draggedId) {
                onDrop(e, null, statusValue, groupBy)
              }
            }}
          >
            {/* Drop zone indicator at top */}
            {isDropTarget && (
              <div className={`rounded-lg border-2 border-dashed ${colorStyle.border} p-3 text-center mb-3`}>
                <div className="flex items-center justify-center gap-2">
                  <MaterialIcon name="add_circle" size={16} className={colorStyle.icon} />
                  <span className={`text-xs font-medium ${colorStyle.text}`}>
                    Drop to move to {title}
                  </span>
                </div>
              </div>
            )}

            {ideas.map((idea) => (
              <KanbanCard
                key={idea.id}
                idea={idea}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDrop={onDrop}
                onDragEnd={onDragEnd}
                isDragging={draggedId === idea.id}
                columnValue={statusValue}
                groupBy={groupBy}
                users={users}
                isSelected={selectedIds?.includes(idea.id)}
                onToggleSelect={onToggleSelect}
                isExpanded={expandedId === idea.id}
                onToggleExpand={onToggleExpand}
                canManage={canManage}
              />
            ))}
            {ideas.length === 0 && !isDropTarget && (
              <div className="flex items-center justify-center h-24 text-sm text-zinc-400 dark:text-zinc-500">
                Drop ideas here
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

function KanbanCard({ idea, onUpdate, onDelete, onDragStart, onDragOver, onDrop, onDragEnd, isDragging, columnValue, groupBy, users, isSelected, onToggleSelect, isExpanded, onToggleExpand, canManage }) {
  const [localTitle, setLocalTitle] = useState(idea.title)
  const [localDescription, setLocalDescription] = useState(idea.description)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

  // Sync local state when idea changes externally
  useEffect(() => {
    setLocalTitle(idea.title)
    setLocalDescription(idea.description)
  }, [idea.title, idea.description])

  const typeOption = TYPE_OPTIONS.find((t) => t.value === idea.type) || TYPE_OPTIONS[0]
  const priorityOption = PRIORITY_OPTIONS.find((p) => p.value === idea.priority) || PRIORITY_OPTIONS[2]
  const complexityOption = COMPLEXITY_OPTIONS.find((c) => c.value === idea.complexity) || COMPLEXITY_OPTIONS[2]
  const statusOption = STATUS_OPTIONS.find((s) => s.value === idea.status) || STATUS_OPTIONS[0]

  const handleTitleBlur = () => {
    setIsEditingTitle(false)
    if (localTitle.trim() && localTitle !== idea.title) {
      onUpdate({ ...idea, title: localTitle.trim() })
    } else {
      setLocalTitle(idea.title)
    }
  }

  const handleTitleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur()
    } else if (e.key === 'Escape') {
      setLocalTitle(idea.title)
      setIsEditingTitle(false)
    }
  }

  const handleDescriptionBlur = () => {
    if (localDescription !== idea.description) {
      onUpdate({ ...idea, description: localDescription })
    }
  }

  return (
    <div
      draggable={canManage && !isEditingTitle}
      onDragStart={canManage ? (e) => onDragStart(e, idea.id) : undefined}
      onDragOver={canManage ? onDragOver : undefined}
      onDrop={canManage ? (e) => {
        e.stopPropagation()
        onDrop(e, idea.id, columnValue, groupBy)
      } : undefined}
      onDragEnd={canManage ? onDragEnd : undefined}
      className={`rounded-lg border bg-white dark:bg-zinc-800 ${canManage && !isEditingTitle ? 'cursor-grab active:cursor-grabbing' : ''} transition-all ${
        isDragging
          ? 'border-blue-400 shadow-lg scale-[1.02] opacity-90'
          : isSelected
          ? 'border-blue-400 ring-2 ring-blue-400/20'
          : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 hover:shadow-sm'
      }`}
    >
      {/* Header - always visible, clickable to expand */}
      <div
        className="p-3 cursor-pointer"
        onClick={() => !isEditingTitle && onToggleExpand(idea.id)}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2 min-w-0">
            {canManage && (
              <input
                type="checkbox"
                checked={isSelected}
                onChange={(e) => {
                  e.stopPropagation()
                  onToggleSelect(idea.id)
                }}
                onClick={(e) => e.stopPropagation()}
                className="rounded border-zinc-300 text-blue-600 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-700 shrink-0 mt-0.5"
              />
            )}
            <UserAvatar user={idea.createdBy} className="size-6 shrink-0" />
            {canManage && isEditingTitle ? (
              <input
                type="text"
                value={localTitle}
                onChange={(e) => setLocalTitle(e.target.value)}
                onBlur={handleTitleBlur}
                onKeyDown={handleTitleKeyDown}
                onClick={(e) => e.stopPropagation()}
                className="flex-1 min-w-0 rounded-md border-0 ring-1 ring-inset ring-zinc-300 bg-white px-2 py-0.5 text-sm font-medium text-zinc-900 focus:ring-2 focus:ring-blue-500 dark:ring-zinc-600 dark:bg-zinc-800 dark:text-white"
                autoFocus
              />
            ) : (
              <h4
                className={`font-medium text-sm text-zinc-900 dark:text-white leading-tight ${canManage && isExpanded ? 'hover:text-blue-600 dark:hover:text-blue-400 cursor-text' : ''}`}
                onClick={(e) => {
                  if (canManage && isExpanded) {
                    e.stopPropagation()
                    setIsEditingTitle(true)
                  }
                }}
                title={canManage && isExpanded ? 'Click to edit' : undefined}
              >
                {idea.title}
              </h4>
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <MaterialIcon
              name={isExpanded ? 'expand_less' : 'expand_more'}
              size={16}
              className="text-zinc-400 dark:text-zinc-500"
            />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-1 flex-wrap ml-8">
          {groupBy !== 'type' && (
            <IconBadge icon={typeOption.icon} label={typeOption.value === 'bug' ? 'Bug' : 'Feature'} color={typeOption.color} iconColor={typeOption.iconColor} />
          )}
          {groupBy !== 'status' && (
            <IconBadge icon={statusOption.icon} label={statusOption.label} color={statusOption.color} iconColor={statusOption.iconColor} />
          )}
          {groupBy !== 'priority' && (
            <IconBadge icon="flag" label={priorityOption.label} color={priorityOption.color} />
          )}
          {groupBy !== 'complexity' && (
            <IconBadge icon="speed" label={complexityOption.label} color={complexityOption.color} />
          )}
        </div>
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div className="border-t border-zinc-100 dark:border-zinc-700/50 bg-zinc-50/50 dark:bg-zinc-900/30 p-3 space-y-3">
          {canManage ? (
            <div className="relative">
              <textarea
                value={localDescription}
                onChange={(e) => setLocalDescription(e.target.value)}
                onBlur={handleDescriptionBlur}
                placeholder="Add a description..."
                className={`w-full bg-white dark:bg-zinc-800 rounded p-2 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-600 dark:text-zinc-400 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isDescriptionExpanded ? 'min-h-[200px]' : 'min-h-[72px] max-h-[72px] overflow-hidden'}`}
              />
              {localDescription && localDescription.length > 100 && (
                <button
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="mt-1 text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-0.5"
                >
                  <MaterialIcon name={isDescriptionExpanded ? 'expand_less' : 'expand_more'} size={14} />
                  {isDescriptionExpanded ? 'Show less' : 'Show more'}
                </button>
              )}
            </div>
          ) : (
            <div className="bg-white dark:bg-zinc-800 rounded p-2 border border-zinc-200 dark:border-zinc-700">
              <p className={`text-sm text-zinc-600 dark:text-zinc-400 ${!isDescriptionExpanded ? 'line-clamp-3' : ''}`}>
                {idea.description || <span className="italic text-zinc-400">No description</span>}
              </p>
              {idea.description && idea.description.length > 100 && (
                <button
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="mt-1 text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-0.5"
                >
                  <MaterialIcon name={isDescriptionExpanded ? 'expand_less' : 'expand_more'} size={14} />
                  {isDescriptionExpanded ? 'Show less' : 'Show more'}
                </button>
              )}
            </div>
          )}
          {canManage ? (
            <div className="grid grid-cols-2 gap-2">
              <SelectField
                label="Type"
                value={idea.type || 'feature'}
                onChange={(value) => onUpdate({ ...idea, type: value })}
                options={TYPE_OPTIONS}
              />
              <SelectField
                label="Status"
                value={idea.status || 'backlog'}
                onChange={(value) => onUpdate({ ...idea, status: value })}
                options={STATUS_OPTIONS}
              />
              <SelectField
                label="Priority"
                value={idea.priority || 'low'}
                onChange={(value) => onUpdate({ ...idea, priority: value })}
                options={PRIORITY_OPTIONS}
              />
              <SelectField
                label="Complexity"
                value={idea.complexity || 'low'}
                onChange={(value) => onUpdate({ ...idea, complexity: value })}
                options={COMPLEXITY_OPTIONS}
              />
              <UserSelectField
                label="Submitted By"
                value={idea.createdBy}
                onChange={(value) => onUpdate({ ...idea, createdBy: value })}
                users={users}
              />
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Target Date</label>
                <input
                  type="date"
                  value={idea.targetDate ? new Date(idea.targetDate).toISOString().split('T')[0] : ''}
                  onChange={(e) => onUpdate({ ...idea, targetDate: e.target.value ? new Date(e.target.value).getTime() : null })}
                  className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Ship Date</label>
                <input
                  type="date"
                  value={idea.shipDate ? new Date(idea.shipDate).toISOString().split('T')[0] : ''}
                  onChange={(e) => onUpdate({ ...idea, shipDate: e.target.value ? new Date(e.target.value).getTime() : null })}
                  className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Type</label>
                <IconBadge icon={typeOption.icon} label={typeOption.label} color={typeOption.color} iconColor={typeOption.iconColor} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Status</label>
                <IconBadge icon={statusOption.icon} label={statusOption.label} color={statusOption.color} iconColor={statusOption.iconColor} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Priority</label>
                <IconBadge icon="flag" label={priorityOption.label} color={priorityOption.color} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Complexity</label>
                <IconBadge icon="speed" label={complexityOption.label} color={complexityOption.color} />
              </div>
            </div>
          )}

          {/* Date fields and actions */}
          <div className="flex items-center justify-between pt-2 border-t border-zinc-200 dark:border-zinc-700">
            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              {idea.createdAt && (
                <div className="flex items-center gap-1">
                  <MaterialIcon name="schedule" size={12} />
                  <span>{formatDate(idea.createdAt)}</span>
                </div>
              )}
              {idea.shippedAt && (
                <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                  <MaterialIcon name="check_circle" size={12} />
                  <span>{formatDate(idea.shippedAt)}</span>
                </div>
              )}
            </div>
            {canManage && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(idea.id)
                }}
                className="flex items-center gap-1 px-1.5 py-0.5 text-xs text-red-600 hover:text-red-700 dark:text-red-400 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <MaterialIcon name="delete" size={12} />
                Delete
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// Individual filter dropdown component
function SingleFilterDropdown({ label, icon, options, selectedValues, onToggle, renderOption, isOpen, onToggleOpen }) {
  const isActive = selectedValues?.length > 0

  return (
    <div className="relative">
      <button
        onClick={onToggleOpen}
        className={`flex items-center gap-1.5 px-2 py-1 rounded-md border text-xs font-medium transition-colors ${
          isActive
            ? 'border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
            : 'border-zinc-200 bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-600'
        }`}
      >
        <MaterialIcon name={icon} size={14} />
        {label}
        {isActive && (
          <span className="flex items-center justify-center size-4 text-[10px] font-bold rounded-full bg-blue-600 text-white">
            {selectedValues.length}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={onToggleOpen} />
          <div className="absolute left-0 top-full mt-1 z-20 min-w-[160px] rounded-lg border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
            <div className="p-1.5 space-y-0.5 max-h-56 overflow-y-auto">
              {options.map((opt) => (
                <label key={opt.value || opt.id} className="flex items-center gap-2 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-700/50 rounded px-2 py-1">
                  <input
                    type="checkbox"
                    checked={selectedValues?.includes(opt.value || opt.id)}
                    onChange={() => onToggle(opt.value || opt.id)}
                    className="rounded border-zinc-300 text-blue-600 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-700 size-3.5"
                  />
                  {renderOption(opt)}
                </label>
              ))}
            </div>
            {isActive && (
              <div className="border-t border-zinc-200 dark:border-zinc-700 p-1.5">
                <button
                  onClick={() => {
                    options.forEach(opt => {
                      if (selectedValues?.includes(opt.value || opt.id)) {
                        onToggle(opt.value || opt.id)
                      }
                    })
                  }}
                  className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 w-full text-center"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

function GroupBySelector({ groupBy, onGroupByChange, isOpen, onToggleOpen }) {
  const groupByOptions = [
    { value: 'status', label: 'Status', icon: 'label' },
    { value: 'type', label: 'Type', icon: 'category' },
    { value: 'priority', label: 'Priority', icon: 'flag' },
    { value: 'complexity', label: 'Complexity', icon: 'speed' },
  ]

  const current = groupByOptions.find(opt => opt.value === groupBy) || groupByOptions[0]

  return (
    <div className="relative">
      <button
        onClick={onToggleOpen}
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-sm font-medium transition-colors text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/50 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-700/50"
        title={`Grouped by ${current.label}`}
      >
        <MaterialIcon name="workspaces" size={16} />
        <span className="text-xs">{current.label}</span>
        <MaterialIcon name="expand_more" size={14} className="opacity-60" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={onToggleOpen} />
          <div className="absolute right-0 top-full mt-1 z-20 min-w-[120px] rounded-lg border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
            <div className="p-1.5 space-y-0.5">
              <div className="px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-zinc-400">Group by</div>
              {groupByOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    onGroupByChange(opt.value)
                    onToggleOpen()
                  }}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors ${
                    groupBy === opt.value
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                      : 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-700/50'
                  }`}
                >
                  <MaterialIcon name={opt.icon} size={14} />
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// Add Idea Modal
function AddIdeaModal({ isOpen, onClose, onAdd, initialValues }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState(initialValues?.type || 'feature')
  const [status, setStatus] = useState(initialValues?.status || 'backlog')
  const [priority, setPriority] = useState(initialValues?.priority || 'medium')
  const [complexity, setComplexity] = useState(initialValues?.complexity || 'medium')
  const currentUser = getCurrentUser()

  // Reset form when modal opens (e.g., quick add from different section)
  useEffect(() => {
    if (isOpen) {
      setTitle('')
      setDescription('')
      setType(initialValues?.type || 'feature')
      setStatus(initialValues?.status || 'backlog')
      setPriority(initialValues?.priority || 'medium')
      setComplexity(initialValues?.complexity || 'medium')
    }
  }, [isOpen, initialValues])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return

    const now = Date.now()
    onAdd({
      id: generateId(),
      title: title.trim(),
      description: description.trim(),
      type,
      status,
      priority,
      complexity,
      createdAt: now,
      createdBy: {
        id: currentUser?.id,
        name: currentUser?.name,
        photo: currentUser?.photo,
      },
      activityLog: [{
        id: `created-${now}`,
        type: 'created',
        person: currentUser?.name || 'Someone',
        action: 'created this idea',
        date: now,
      }],
    })

    setTitle('')
    setDescription('')
    setType('feature')
    setStatus('backlog')
    setPriority('medium')
    setComplexity('medium')
    onClose()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-zinc-900/50 dark:bg-zinc-900/80 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className="relative w-full max-w-lg rounded-xl bg-white shadow-xl dark:bg-zinc-800 ring-1 ring-zinc-200/50 dark:ring-zinc-700/50"
          onKeyDown={handleKeyDown}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-700">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Add New Idea</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 dark:hover:text-zinc-300 dark:hover:bg-zinc-700 transition-colors"
            >
              <MaterialIcon name="close" size={20} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="px-6 py-5 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What's your idea?"
                  className="w-full rounded-lg border-0 px-3 py-2.5 text-sm font-normal text-zinc-900 dark:text-white bg-zinc-50 dark:bg-zinc-700/50 ring-1 ring-inset ring-zinc-200 dark:ring-zinc-600 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-none"
                  autoFocus
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Description <span className="text-zinc-400 font-normal">(optional)</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add more details..."
                  rows={3}
                  className="w-full rounded-lg border-0 px-3 py-2.5 text-sm font-normal text-zinc-900 dark:text-white bg-zinc-50 dark:bg-zinc-700/50 ring-1 ring-inset ring-zinc-200 dark:ring-zinc-600 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-none resize-none"
                />
              </div>

              {/* Type & Status */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Type
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {TYPE_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setType(opt.value)}
                        className={`inline-flex items-center justify-center gap-1 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                          type === opt.value
                            ? 'ring-2 ring-blue-500 ring-offset-1'
                            : 'opacity-40 hover:opacity-70'
                        } ${opt.color === 'violet' ? 'bg-violet-100 text-violet-700' : 'bg-rose-100 text-rose-700'}`}
                      >
                        <MaterialIcon name={opt.icon} size={12} className={opt.iconColor === 'amber' ? 'text-amber-500' : 'text-rose-500'} />
                        {opt.value === 'bug' ? 'Bug' : 'Feature'}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Status
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {STATUS_OPTIONS.map((opt) => {
                      const colorMap = {
                        purple: 'bg-purple-100 text-purple-700',
                        orange: 'bg-orange-100 text-orange-700',
                        blue: 'bg-blue-100 text-blue-700',
                        green: 'bg-green-100 text-green-700',
                      }
                      const iconColorMap = {
                        purple: 'text-purple-500',
                        orange: 'text-orange-500',
                        blue: 'text-blue-500',
                        green: 'text-green-500',
                      }
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setStatus(opt.value)}
                          className={`inline-flex items-center justify-center gap-1 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                            status === opt.value
                              ? 'ring-2 ring-blue-500 ring-offset-1'
                              : 'opacity-40 hover:opacity-70'
                          } ${colorMap[opt.color] || colorMap.purple}`}
                        >
                          <MaterialIcon name={opt.icon} size={12} className={iconColorMap[opt.iconColor] || 'text-zinc-500'} />
                          {opt.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Priority & Complexity */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Priority
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {PRIORITY_OPTIONS.map((opt) => {
                      const colorMap = {
                        red: 'bg-red-100 text-red-700',
                        amber: 'bg-amber-100 text-amber-700',
                        green: 'bg-green-100 text-green-700',
                      }
                      const iconColorMap = {
                        red: 'text-red-500',
                        amber: 'text-amber-500',
                        green: 'text-green-500',
                      }
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setPriority(opt.value)}
                          className={`inline-flex items-center justify-center gap-1 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                            priority === opt.value
                              ? 'ring-2 ring-blue-500 ring-offset-1'
                              : 'opacity-40 hover:opacity-70'
                          } ${colorMap[opt.color] || colorMap.amber}`}
                        >
                          <MaterialIcon name="flag" size={12} className={iconColorMap[opt.color] || 'text-amber-500'} />
                          {opt.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Complexity
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {COMPLEXITY_OPTIONS.map((opt) => {
                      const colorMap = {
                        purple: 'bg-purple-100 text-purple-700',
                        blue: 'bg-blue-100 text-blue-700',
                        cyan: 'bg-cyan-100 text-cyan-700',
                      }
                      const iconColorMap = {
                        purple: 'text-purple-500',
                        blue: 'text-blue-500',
                        cyan: 'text-cyan-500',
                      }
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setComplexity(opt.value)}
                          className={`inline-flex items-center justify-center gap-1 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                            complexity === opt.value
                              ? 'ring-2 ring-blue-500 ring-offset-1'
                              : 'opacity-40 hover:opacity-70'
                          } ${colorMap[opt.color] || colorMap.blue}`}
                        >
                          <MaterialIcon name="speed" size={12} className={iconColorMap[opt.color] || 'text-blue-500'} />
                          {opt.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 bg-zinc-50 dark:bg-zinc-900/30 border-t border-zinc-200 dark:border-zinc-700">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!title.trim()}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                Add Idea
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

function ViewBar({ view, onViewChange, groupBy, onGroupByChange, filters, onFiltersChange, users, ideas, searchQuery, onSearchChange }) {
  // Track which dropdown is open (only one at a time)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [showSearch, setShowSearch] = useState(false)

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name)
  }

  const toggleFilter = (category, value) => {
    const current = filters[category] || []
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    onFiltersChange({ ...filters, [category]: updated })
  }

  // Calculate counts for each filter option
  const getCount = (field, value) => {
    return ideas.filter((idea) => {
      const ideaValue = field === 'status' ? (idea.status || 'backlog') :
                        field === 'type' ? (idea.type || 'feature') :
                        field === 'createdBy' ? idea.createdBy?.id : idea[field]
      return ideaValue === value
    }).length
  }

  const totalActiveFilters = Object.values(filters).reduce((sum, arr) => sum + (arr?.length || 0), 0)

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 mb-4">
      {/* Left side - Search and filters */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Search - icon only by default, expands on click */}
        {showSearch || searchQuery ? (
          <div className="flex items-center gap-2 px-3 py-2">
            <MaterialIcon name="search" size={18} className="text-zinc-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onBlur={() => !searchQuery && setShowSearch(false)}
              placeholder="Search ideas..."
              className="w-40 bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:w-60 transition-all dark:text-white"
              autoFocus
            />
            <button
              onClick={() => {
                onSearchChange('')
                setShowSearch(false)
              }}
              className="text-zinc-400 hover:text-zinc-600 shrink-0"
            >
              <MaterialIcon name="close" size={16} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowSearch(true)}
            className="flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 dark:hover:text-zinc-300 dark:hover:bg-zinc-700/50 transition-colors"
            title="Search ideas"
          >
            <MaterialIcon name="search" size={18} />
          </button>
        )}

        <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-600" />

        {/* All filters */}
        <SingleFilterDropdown
          label="Type"
          icon="category"
          options={TYPE_OPTIONS.map(opt => ({ ...opt, count: getCount('type', opt.value) }))}
          selectedValues={filters.type}
          onToggle={(value) => toggleFilter('type', value)}
          isOpen={openDropdown === 'type'}
          onToggleOpen={() => toggleDropdown('type')}
          renderOption={(opt) => (
            <div className="flex items-center justify-between gap-2 w-full">
              <Badge color={opt.color} className="text-xs">{opt.label}</Badge>
              <span className="text-xs text-zinc-400">{opt.count}</span>
            </div>
          )}
        />
        <SingleFilterDropdown
          label="Status"
          icon="label"
          options={STATUS_OPTIONS.map(opt => ({ ...opt, count: getCount('status', opt.value) }))}
          selectedValues={filters.status}
          onToggle={(value) => toggleFilter('status', value)}
          isOpen={openDropdown === 'status'}
          onToggleOpen={() => toggleDropdown('status')}
          renderOption={(opt) => (
            <div className="flex items-center justify-between gap-2 w-full">
              <Badge color={opt.color} className="text-xs">{opt.label}</Badge>
              <span className="text-xs text-zinc-400">{opt.count}</span>
            </div>
          )}
        />
        <SingleFilterDropdown
          label="Priority"
          icon="flag"
          options={PRIORITY_OPTIONS.map(opt => ({ ...opt, count: getCount('priority', opt.value) }))}
          selectedValues={filters.priority}
          onToggle={(value) => toggleFilter('priority', value)}
          isOpen={openDropdown === 'priority'}
          onToggleOpen={() => toggleDropdown('priority')}
          renderOption={(opt) => (
            <div className="flex items-center justify-between gap-2 w-full">
              <Badge color={opt.color} className="text-xs">{opt.label}</Badge>
              <span className="text-xs text-zinc-400">{opt.count}</span>
            </div>
          )}
        />
        <SingleFilterDropdown
          label="Complexity"
          icon="speed"
          options={COMPLEXITY_OPTIONS.map(opt => ({ ...opt, count: getCount('complexity', opt.value) }))}
          selectedValues={filters.complexity}
          onToggle={(value) => toggleFilter('complexity', value)}
          isOpen={openDropdown === 'complexity'}
          onToggleOpen={() => toggleDropdown('complexity')}
          renderOption={(opt) => (
            <div className="flex items-center justify-between gap-2 w-full">
              <Badge color={opt.color} className="text-xs">{opt.label}</Badge>
              <span className="text-xs text-zinc-400">{opt.count}</span>
            </div>
          )}
        />
        <SingleFilterDropdown
          label="Created By"
          icon="person"
          options={users.map(u => ({ ...u, value: u.id, count: getCount('createdBy', u.id) }))}
          selectedValues={filters.createdBy}
          onToggle={(value) => toggleFilter('createdBy', value)}
          isOpen={openDropdown === 'createdBy'}
          onToggleOpen={() => toggleDropdown('createdBy')}
          renderOption={(user) => (
            <div className="flex items-center justify-between gap-2 w-full">
              <div className="flex items-center gap-2">
                <UserAvatar user={user} className="size-5" />
                <span className="text-sm text-zinc-700 dark:text-zinc-300">{user.name}</span>
              </div>
              <span className="text-xs text-zinc-400">{user.count}</span>
            </div>
          )}
        />

        {/* Clear all filters */}
        {totalActiveFilters > 0 && (
          <button
            onClick={() => onFiltersChange({ type: [], status: [], priority: [], complexity: [], createdBy: [] })}
            className="flex items-center gap-1.5 px-2 py-1.5 text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            title="Clear all filters"
          >
            <MaterialIcon name="close" size={14} />
            Clear
          </button>
        )}
      </div>

      {/* Right side - View options */}
      <div className="flex items-center gap-2">
        <GroupBySelector
          groupBy={groupBy}
          onGroupByChange={onGroupByChange}
          isOpen={openDropdown === 'groupBy'}
          onToggleOpen={() => toggleDropdown('groupBy')}
        />
        <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-600" />
        <div className="flex rounded-md bg-zinc-100 p-0.5 dark:bg-zinc-700/80">
          <button
            onClick={() => onViewChange('kanban')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded text-sm font-medium transition-colors ${
              view === 'kanban'
                ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-600 dark:text-white'
                : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-white'
            }`}
            title="Kanban view"
          >
            <MaterialIcon name="view_kanban" size={16} />
          </button>
          <button
            onClick={() => onViewChange('list')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded text-sm font-medium transition-colors ${
              view === 'list'
                ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-600 dark:text-white'
                : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-white'
            }`}
            title="List view"
          >
            <MaterialIcon name="view_list" size={16} />
          </button>
          <button
            onClick={() => onViewChange('calendar')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded text-sm font-medium transition-colors ${
              view === 'calendar'
                ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-600 dark:text-white'
                : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-white'
            }`}
            title="Calendar view"
          >
            <MaterialIcon name="calendar_month" size={16} />
          </button>
          <button
            onClick={() => onViewChange('matrix')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded text-sm font-medium transition-colors ${
              view === 'matrix'
                ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-600 dark:text-white'
                : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-white'
            }`}
            title="Eisenhower Matrix"
          >
            <MaterialIcon name="grid_view" size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

// Bulk actions bar
function BulkActionsBar({ selectedCount, onSelectAll, onClearSelection, onBulkUpdate, onBulkDelete }) {
  const [showStatusMenu, setShowStatusMenu] = useState(false)
  const [showPriorityMenu, setShowPriorityMenu] = useState(false)

  if (selectedCount === 0) return null

  return (
    <div className="flex items-center gap-3 p-3 mb-3 rounded-xl bg-blue-50 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
      <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
        {selectedCount} selected
      </span>
      <div className="w-px h-5 bg-blue-300 dark:bg-blue-700" />

      {/* Status dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowStatusMenu(!showStatusMenu)}
          className="flex items-center gap-1 px-2 py-1 text-sm text-blue-700 hover:bg-blue-100 rounded dark:text-blue-300 dark:hover:bg-blue-900/40"
        >
          <MaterialIcon name="label" size={16} />
          Set Status
        </button>
        {showStatusMenu && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setShowStatusMenu(false)} />
            <div className="absolute left-0 top-full mt-1 z-20 min-w-[140px] rounded-lg border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    onBulkUpdate('status', opt.value)
                    setShowStatusMenu(false)
                  }}
                  className="w-full text-left px-3 py-1.5 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-700/50"
                >
                  <Badge color={opt.color}>{opt.label}</Badge>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Priority dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowPriorityMenu(!showPriorityMenu)}
          className="flex items-center gap-1 px-2 py-1 text-sm text-blue-700 hover:bg-blue-100 rounded dark:text-blue-300 dark:hover:bg-blue-900/40"
        >
          <MaterialIcon name="flag" size={16} />
          Set Priority
        </button>
        {showPriorityMenu && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setShowPriorityMenu(false)} />
            <div className="absolute left-0 top-full mt-1 z-20 min-w-[120px] rounded-lg border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
              {PRIORITY_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    onBulkUpdate('priority', opt.value)
                    setShowPriorityMenu(false)
                  }}
                  className="w-full text-left px-3 py-1.5 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-700/50"
                >
                  <Badge color={opt.color}>{opt.label}</Badge>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <button
        onClick={onBulkDelete}
        className="flex items-center gap-1 px-2 py-1 text-sm text-red-600 hover:bg-red-50 rounded dark:text-red-400 dark:hover:bg-red-900/20"
      >
        <MaterialIcon name="delete" size={16} />
        Delete
      </button>

      <div className="flex-1" />
      <button
        onClick={onClearSelection}
        className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
      >
        Clear selection
      </button>
    </div>
  )
}

// Simple pie chart using CSS conic-gradient
function MiniPieChart({ data, size = 80 }) {
  if (!data || data.length === 0) return null

  const total = data.reduce((acc, d) => acc + d.count, 0)
  if (total === 0) return null

  let currentAngle = 0
  const segments = data.map((d) => {
    const angle = (d.count / total) * 360
    const segment = { ...d, startAngle: currentAngle, angle }
    currentAngle += angle
    return segment
  })

  // Build conic-gradient
  const gradientStops = segments
    .map((s) => `${s.color} ${s.startAngle}deg ${s.startAngle + s.angle}deg`)
    .join(', ')

  return (
    <div
      className="rounded-full shrink-0"
      style={{
        width: size,
        height: size,
        background: `conic-gradient(${gradientStops})`,
      }}
    />
  )
}

// GitHub-style shipped features chart
function ShippedChart({ ideas }) {
  // Get shipped ideas with dates
  const shippedIdeas = ideas.filter((i) => i.status === 'shipped' && i.shippedAt)

  const cellSize = 11
  const cellGap = 2

  // Seeded random for consistent demo data
  const seededRandom = (seed) => {
    const x = Math.sin(seed) * 10000
    return x - Math.floor(x)
  }

  // Build a map of date -> shipped count for quick lookup
  const shippedByDate = useMemo(() => {
    const map = {}
    // Add real shipped ideas
    shippedIdeas.forEach((idea) => {
      const date = new Date(idea.shippedAt)
      const key = `${date.getFullYear()}-${String(date.getMonth()).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
      map[key] = (map[key] || 0) + 1
    })

    // Add demo data for 2026 to make chart more interesting
    const today = new Date()
    const currentYear = today.getFullYear()
    for (let month = 0; month < 12; month++) {
      const daysInMonth = new Date(currentYear, month + 1, 0).getDate()
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, month, day)
        if (date > today) continue // Skip future dates

        const key = `${currentYear}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
        if (!map[key]) {
          // Use seeded random based on date for consistency
          const seed = currentYear * 10000 + month * 100 + day
          const rand = seededRandom(seed)
          // ~30% chance of activity, with varying intensity
          if (rand < 0.3) {
            map[key] = Math.ceil(rand * 10) // 1-3 contributions
          }
        }
      }
    }
    return map
  }, [shippedIdeas])

  // Generate contribution grid for current year (Jan 1 - Dec 31)
  const { contributionGrid, monthLabels, currentWeekIndex, maxCount } = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const currentYear = today.getFullYear()
    const grid = []
    const months = []

    // Start from January 1st of current year
    const jan1 = new Date(currentYear, 0, 1)
    // Find the Monday of the week containing Jan 1 (but don't go to prev year)
    const jan1DayOfWeek = jan1.getDay() // 0=Sun, 1=Mon, etc
    // Convert to Mon=0, Tue=1, ..., Sun=6
    const jan1MondayIndex = jan1DayOfWeek === 0 ? 6 : jan1DayOfWeek - 1

    let currentWeek = -1
    let maxShipped = 0

    // Generate weeks for the year
    let currentDate = new Date(jan1)
    let weekNum = 0

    while (currentDate.getFullYear() === currentYear || weekNum === 0) {
      const weekData = []
      let weekContainsToday = false
      let hasCurrentYearDays = false

      for (let day = 0; day < 7; day++) {
        // For the first week, skip days before Jan 1
        if (weekNum === 0 && day < jan1MondayIndex) {
          weekData.push({ date: null, shippedCount: 0, isFuture: true, isPlaceholder: true })
          continue
        }

        const date = new Date(currentYear, 0, 1 + (weekNum * 7) + day - jan1MondayIndex)

        // Stop if we've gone past current year
        if (date.getFullYear() > currentYear) {
          weekData.push({ date: null, shippedCount: 0, isFuture: true, isPlaceholder: true })
          continue
        }

        hasCurrentYearDays = true
        const dateKey = `${date.getFullYear()}-${String(date.getMonth()).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
        const shippedCount = shippedByDate[dateKey] || 0
        if (shippedCount > maxShipped) maxShipped = shippedCount

        const isToday = date.getFullYear() === today.getFullYear() &&
                        date.getMonth() === today.getMonth() &&
                        date.getDate() === today.getDate()
        if (isToday) weekContainsToday = true

        weekData.push({
          date,
          shippedCount,
          isFuture: date > today,
          isPlaceholder: false,
        })
      }

      // Only add week if it has current year days
      if (hasCurrentYearDays) {
        if (weekContainsToday) currentWeek = weekNum
        grid.push(weekData)

        // Track month labels - use first non-placeholder day
        const firstDay = weekData.find(d => d.date && !d.isPlaceholder)
        if (firstDay) {
          const monthName = firstDay.date.toLocaleDateString('en-US', { month: 'short' })
          if (months.length === 0 || months[months.length - 1].name !== monthName) {
            months.push({ name: monthName, weekIndex: weekNum })
          }
        }
      }

      weekNum++
      currentDate = new Date(currentYear, 0, 1 + (weekNum * 7) - jan1MondayIndex)

      // Safety: max 54 weeks
      if (weekNum > 54) break
    }

    return { contributionGrid: grid, monthLabels: months, currentWeekIndex: currentWeek, maxCount: maxShipped || 1 }
  }, [shippedByDate])

  // Get intensity class based on shipped count
  const getIntensity = (day) => {
    if (day.isPlaceholder) return 'bg-transparent'
    if (day.isFuture) return 'bg-zinc-100/50 dark:bg-zinc-800/30'
    if (day.shippedCount === 0) return 'bg-zinc-200/70 dark:bg-zinc-700/50'
    const ratio = day.shippedCount / maxCount
    if (ratio <= 0.25) return 'bg-green-200 dark:bg-green-900/50'
    if (ratio <= 0.5) return 'bg-green-300 dark:bg-green-800/60'
    if (ratio <= 0.75) return 'bg-green-400 dark:bg-green-700'
    return 'bg-green-500 dark:bg-green-600'
  }

  return (
    <div className="rounded-xl bg-white dark:bg-zinc-800/80 p-4 ring-1 ring-inset ring-zinc-200/80 dark:ring-zinc-700/50 overflow-x-auto h-full flex flex-col">
      <div className="flex items-center gap-1.5 mb-3">
        <MaterialIcon name="rocket_launch" size={14} className="text-green-500" />
        <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Shipped This Year</span>
        <span className="ml-auto text-xs font-medium text-zinc-500">{shippedIdeas.length} shipped</span>
      </div>
      <div className="flex-1 flex items-center">
      <div className="inline-block">
        {/* Month labels */}
        <div className="relative h-4 mb-1">
          {monthLabels.map((month, idx) => (
            <span
              key={idx}
              className="absolute text-[10px] text-zinc-400 dark:text-zinc-500"
              style={{ left: month.weekIndex * (cellSize + cellGap) }}
            >
              {month.name}
            </span>
          ))}
        </div>

        {/* Contribution grid - columns (weeks) x 7 rows (Mon-Sun) */}
        <div className="flex gap-[2px]">
          {contributionGrid.map((week, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-[2px]">
              {week.map((day, dayIdx) => (
                <div
                  key={dayIdx}
                  className={`rounded-[2px] transition-colors ${getIntensity(day)}`}
                  style={{ width: cellSize, height: cellSize }}
                  title={day.date ? `${day.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}: ${day.shippedCount} shipped` : ''}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Timeline indicator - solid lines */}
        <div className="flex mt-2 gap-[1px]">
          {contributionGrid.map((_, weekIdx) => (
            <div
              key={weekIdx}
              className={`rounded-sm ${
                weekIdx < currentWeekIndex
                  ? 'h-[3px] bg-green-300 dark:bg-green-700'
                  : weekIdx === currentWeekIndex
                  ? 'h-[5px] bg-green-500 dark:bg-green-500 -mt-[1px]'
                  : 'h-[3px] bg-zinc-300 dark:bg-zinc-600'
              }`}
              style={{ width: cellSize + 1 }}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-4 mt-3 pt-3 border-t border-zinc-200/50 dark:border-zinc-700/30">
          <span className="text-[10px] text-zinc-400 dark:text-zinc-500">Features Shipped</span>
          <div className="flex items-center gap-1">
            <div className="w-[11px] h-[11px] rounded-[2px] bg-zinc-200/70 dark:bg-zinc-700/50" />
            <div className="w-[11px] h-[11px] rounded-[2px] bg-green-200 dark:bg-green-900/50" />
            <div className="w-[11px] h-[11px] rounded-[2px] bg-green-300 dark:bg-green-800/60" />
            <div className="w-[11px] h-[11px] rounded-[2px] bg-green-400 dark:bg-green-700" />
            <div className="w-[11px] h-[11px] rounded-[2px] bg-green-500 dark:bg-green-600" />
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

// Pie chart for bugs vs features
function TypePieChart({ ideas }) {
  const bugs = ideas.filter((i) => i.type === 'bug').length
  const features = ideas.filter((i) => i.type === 'feature').length
  const total = bugs + features

  if (total === 0) return null

  const bugPercent = (bugs / total) * 100
  const featurePercent = (features / total) * 100

  // SVG pie chart using stroke-dasharray
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const bugDash = (bugPercent / 100) * circumference
  const featureDash = (featurePercent / 100) * circumference

  return (
    <div className="rounded-xl bg-white dark:bg-zinc-800/50 p-4 border border-zinc-200/60 dark:border-zinc-700/40 h-full flex flex-col">
      <div className="flex items-center gap-1.5 mb-3">
        <MaterialIcon name="category" size={14} className="text-purple-500" />
        <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">By Type</span>
      </div>

      <div className="flex-1 flex items-center justify-center gap-8">
        {/* Pie chart */}
        <div className="relative">
          <svg width="100" height="100" viewBox="0 0 100 100" className="-rotate-90">
            {/* Features slice (green) */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="20"
              strokeDasharray={`${featureDash} ${circumference}`}
              className="text-green-500 dark:text-green-600"
            />
            {/* Bugs slice (rose) */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="20"
              strokeDasharray={`${bugDash} ${circumference}`}
              strokeDashoffset={-featureDash}
              className="text-rose-500 dark:text-rose-600"
            />
          </svg>
          {/* Center label */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-zinc-700 dark:text-zinc-200">{total}</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-green-500 dark:bg-green-600" />
            <span className="text-sm text-zinc-600 dark:text-zinc-300">Features</span>
            <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{features}</span>
            <span className="text-xs text-zinc-400">({featurePercent.toFixed(0)}%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-rose-500 dark:bg-rose-600" />
            <span className="text-sm text-zinc-600 dark:text-zinc-300">Bugs</span>
            <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{bugs}</span>
            <span className="text-xs text-zinc-400">({bugPercent.toFixed(0)}%)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Status bar chart component
function StatusBarChart({ ideas, typeFilter = null, tall = false }) {
  const filteredIdeas = typeFilter ? ideas.filter(i => i.type === typeFilter) : ideas
  const total = filteredIdeas.length
  const statusCounts = STATUS_OPTIONS.map(opt => ({
    ...opt,
    count: filteredIdeas.filter(i => (i.status || 'backlog') === opt.value).length,
  }))

  const colorMap = {
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
  }

  if (total === 0) {
    return (
      <div className="text-xs text-zinc-400 dark:text-zinc-500 italic">No items</div>
    )
  }

  return (
    <div className={tall ? 'space-y-4' : 'space-y-2'}>
      {statusCounts.map((status) => {
        const percentage = total > 0 ? (status.count / total) * 100 : 0
        return (
          <div key={status.value} className={`flex items-center ${tall ? 'gap-3' : 'gap-2'}`}>
            <div className={`${tall ? 'w-24' : 'w-20'} flex items-center gap-1.5`}>
              <MaterialIcon name={status.icon} size={tall ? 16 : 12} className={`text-${status.iconColor}-500`} />
              <span className={`${tall ? 'text-sm' : 'text-[11px]'} text-zinc-600 dark:text-zinc-400`}>{status.label}</span>
            </div>
            <div className={`flex-1 ${tall ? 'h-6' : 'h-4'} bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden`}>
              <div
                className={`h-full ${colorMap[status.iconColor] || 'bg-zinc-400'} transition-all duration-300`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className={`${tall ? 'w-10 text-sm' : 'w-8 text-xs'} text-right font-medium text-zinc-600 dark:text-zinc-400`}>{status.count}</span>
          </div>
        )
      })}
    </div>
  )
}

// All Ideas by Status card component
function AllIdeasStatusCard({ ideas }) {
  return (
    <div className="rounded-xl bg-white dark:bg-zinc-800/80 p-4 ring-1 ring-inset ring-zinc-200/80 dark:ring-zinc-700/50 flex flex-col h-full">
      <div className="flex items-center gap-1.5 mb-4">
        <MaterialIcon name="analytics" size={14} className="text-blue-500" />
        <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">All Ideas by Status</span>
        <span className="ml-auto text-xs font-medium text-zinc-500">{ideas.length} total</span>
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <StatusBarChart ideas={ideas} tall />
      </div>
    </div>
  )
}

// Stats section with separated bugs and features
function StatsSection({ ideas }) {
  const features = ideas.filter((i) => i.type === 'feature')
  const bugs = ideas.filter((i) => i.type === 'bug')
  const total = ideas.length

  // Feature stats
  const featureBacklog = features.filter((i) => (i.status || 'backlog') === 'backlog').length
  const featurePlanned = features.filter((i) => i.status === 'planned').length
  const featureDeveloping = features.filter((i) => i.status === 'developing').length
  const featureShipped = features.filter((i) => i.status === 'shipped').length
  const featureHighPriority = features.filter((i) => i.priority === 'high').length

  // Bug stats
  const bugBacklog = bugs.filter((i) => (i.status || 'backlog') === 'backlog').length
  const bugPlanned = bugs.filter((i) => i.status === 'planned').length
  const bugDeveloping = bugs.filter((i) => i.status === 'developing').length
  const bugShipped = bugs.filter((i) => i.status === 'shipped').length
  const bugHighPriority = bugs.filter((i) => i.priority === 'high').length

  // Type percentages
  const featurePercent = total > 0 ? Math.round((features.length / total) * 100) : 0
  const bugPercent = total > 0 ? Math.round((bugs.length / total) * 100) : 0

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* By Type - Horizontal Stacked Bar */}
      <div className="rounded-xl bg-white dark:bg-zinc-800/80 p-4 ring-1 ring-inset ring-zinc-200/80 dark:ring-zinc-700/50">
        <div className="flex items-center gap-1.5 mb-3">
          <MaterialIcon name="category" size={14} className="text-purple-500" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">By Type</span>
          <span className="ml-auto text-xs font-medium text-zinc-500">{total} total</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Stacked bar */}
          <div className="flex-1 h-6 bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden flex">
            {features.length > 0 && (
              <div
                className="h-full bg-green-500 dark:bg-green-600 transition-all duration-300"
                style={{ width: `${featurePercent}%` }}
              />
            )}
            {bugs.length > 0 && (
              <div
                className="h-full bg-rose-500 dark:bg-rose-600 transition-all duration-300"
                style={{ width: `${bugPercent}%` }}
              />
            )}
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <span className="text-xs text-zinc-600 dark:text-zinc-400">Features</span>
            <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{features.length}</span>
            <span className="text-[10px] text-zinc-400">({featurePercent}%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="text-xs text-zinc-600 dark:text-zinc-400">Bugs</span>
            <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{bugs.length}</span>
            <span className="text-[10px] text-zinc-400">({bugPercent}%)</span>
          </div>
        </div>
      </div>

      {/* Feature Requests */}
      <div className="flex-1 rounded-xl bg-white dark:bg-zinc-800/80 p-4 ring-1 ring-inset ring-zinc-200/80 dark:ring-zinc-700/50 flex flex-col">
        <div className="flex items-center gap-1.5 mb-3">
          <MaterialIcon name="lightbulb" size={14} className="text-amber-500" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Feature Requests</span>
          <div className="ml-auto flex items-center gap-2">
            {featureHighPriority > 0 && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                <MaterialIcon name="flag" size={10} className="text-red-500" />
                {featureHighPriority}
              </span>
            )}
            <span className="text-xs font-medium text-zinc-500">{features.length}</span>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-4 gap-2 content-center">
          <div className="text-center p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20">
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{featureBacklog}</div>
            <div className="text-[10px] text-zinc-500 dark:text-zinc-400">Idea</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20">
            <div className="text-lg font-bold text-orange-600 dark:text-orange-400">{featurePlanned}</div>
            <div className="text-[10px] text-zinc-500 dark:text-zinc-400">Planned</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{featureDeveloping}</div>
            <div className="text-[10px] text-zinc-500 dark:text-zinc-400">Developing</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
            <div className="text-lg font-bold text-green-600 dark:text-green-400">{featureShipped}</div>
            <div className="text-[10px] text-zinc-500 dark:text-zinc-400">Shipped</div>
          </div>
        </div>
      </div>

      {/* Bugs */}
      <div className="flex-1 rounded-xl bg-white dark:bg-zinc-800/80 p-4 ring-1 ring-inset ring-zinc-200/80 dark:ring-zinc-700/50 flex flex-col">
        <div className="flex items-center gap-1.5 mb-3">
          <MaterialIcon name="bug_report" size={14} className="text-rose-500" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Bugs</span>
          <div className="ml-auto flex items-center gap-2">
            {bugHighPriority > 0 && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                <MaterialIcon name="flag" size={10} className="text-red-500" />
                {bugHighPriority}
              </span>
            )}
            <span className="text-xs font-medium text-zinc-500">{bugs.length}</span>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-4 gap-2 content-center">
          <div className="text-center p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20">
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{bugBacklog}</div>
            <div className="text-[10px] text-zinc-500 dark:text-zinc-400">Idea</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20">
            <div className="text-lg font-bold text-orange-600 dark:text-orange-400">{bugPlanned}</div>
            <div className="text-[10px] text-zinc-500 dark:text-zinc-400">Planned</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{bugDeveloping}</div>
            <div className="text-[10px] text-zinc-500 dark:text-zinc-400">Developing</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
            <div className="text-lg font-bold text-green-600 dark:text-green-400">{bugShipped}</div>
            <div className="text-[10px] text-zinc-500 dark:text-zinc-400">Fixed</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Roadmap() {
  const [ideas, setIdeas] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [view, setView] = useState('kanban')
  const [calendarDateField, setCalendarDateField] = useState('shipDate')
  const [draggedId, setDraggedId] = useState(null)
  const [dragOverGroup, setDragOverGroup] = useState(null)
  const [groupBy, setGroupBy] = useState('status')
  const [filters, setFilters] = useState({ type: [], status: [], priority: [], complexity: [], createdBy: [] })
  const [searchQuery, setSearchQuery] = useState('')
  const [collapsedGroups, setCollapsedGroups] = useState({})
  const [selectedIds, setSelectedIds] = useState([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [addModalInitialValues, setAddModalInitialValues] = useState(null)
  const [expandedId, setExpandedId] = useState(null)
  const users = getUsers()
  const userIsAdmin = isAdmin()

  // Open modal with optional initial values for quick add
  const openAddModal = (initialValues = null) => {
    setAddModalInitialValues(initialValues)
    setIsAddModalOpen(true)
  }

  const loadIdeas = useCallback(async () => {
    try {
      setLoading(true)
      const data = await fetchIdeas()
      setIdeas(data)
    } catch (err) {
      console.error('Failed to load ideas:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadIdeas()
  }, [loadIdeas])

  const handleAddIdea = async (newIdea) => {
    setIdeas([newIdea, ...ideas])
    setSaving(true)
    try {
      await createIdea(newIdea)
    } catch (err) {
      console.error('Failed to add idea:', err)
      setIdeas(ideas) // Revert on error
    } finally {
      setSaving(false)
    }
  }

  const handleUpdateIdea = async (updatedIdea) => {
    const prevIdeas = ideas
    const originalIdea = ideas.find((i) => i.id === updatedIdea.id)
    const currentUser = getCurrentUser()
    const userName = currentUser?.name || 'Someone'

    // Track lastModified
    updatedIdea.lastModified = Date.now()

    // Initialize activityLog if needed
    if (!updatedIdea.activityLog) {
      updatedIdea.activityLog = []
    }

    // Track field changes
    if (originalIdea) {
      const fieldsToTrack = [
        { key: 'status', label: 'Status', format: (v) => STATUS_OPTIONS.find(o => o.value === v)?.label || v },
        { key: 'priority', label: 'Priority', format: (v) => PRIORITY_OPTIONS.find(o => o.value === v)?.label || v },
        { key: 'complexity', label: 'Complexity', format: (v) => COMPLEXITY_OPTIONS.find(o => o.value === v)?.label || v },
        { key: 'type', label: 'Type', format: (v) => TYPE_OPTIONS.find(o => o.value === v)?.label || v },
      ]

      for (const field of fieldsToTrack) {
        if (originalIdea[field.key] !== updatedIdea[field.key]) {
          const newValue = field.format(updatedIdea[field.key])
          updatedIdea.activityLog.push({
            id: `${field.key}-${Date.now()}`,
            type: field.key === 'status' && updatedIdea[field.key] === 'shipped' ? 'shipped' : 'change',
            person: userName,
            action: `changed ${field.label} to ${newValue}`,
            date: Date.now(),
          })
        }
      }

      // Track status change timestamp
      if (originalIdea.status !== updatedIdea.status) {
        updatedIdea.lastStatusChange = Date.now()

        // Auto-populate shippedAt when status becomes shipped
        if (updatedIdea.status === 'shipped' && !updatedIdea.shippedAt) {
          updatedIdea.shippedAt = Date.now()
        }
      }
    }

    setIdeas(ideas.map((idea) => (idea.id === updatedIdea.id ? updatedIdea : idea)))
    setSaving(true)
    try {
      await updateIdea(updatedIdea)
    } catch (err) {
      console.error('Failed to update idea:', err)
      setIdeas(prevIdeas) // Revert on error
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteIdea = async (id) => {
    const prevIdeas = ideas
    setIdeas(ideas.filter((idea) => idea.id !== id))
    setSaving(true)
    try {
      await deleteIdea(id)
    } catch (err) {
      console.error('Failed to delete idea:', err)
      setIdeas(prevIdeas) // Revert on error
    } finally {
      setSaving(false)
    }
  }

  const handleDragStart = (e, id) => {
    setDraggedId(id)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDragEnd = () => {
    setDraggedId(null)
    setDragOverGroup(null)
  }

  const handleGroupDragEnter = (groupValue) => {
    if (draggedId) {
      setDragOverGroup(groupValue)
    }
  }

  const handleGroupDragLeave = (e, groupValue) => {
    // Only clear if leaving the group container entirely
    const relatedTarget = e.relatedTarget
    if (!e.currentTarget.contains(relatedTarget)) {
      setDragOverGroup(null)
    }
  }

  const handleDrop = async (e, targetId, targetValue = null, targetGroupBy = null) => {
    e.preventDefault()
    setDragOverGroup(null)

    if (!draggedId || draggedId === targetId) {
      setDraggedId(null)
      return
    }

    const prevIdeas = ideas
    const newIdeas = [...ideas]
    const draggedIndex = newIdeas.findIndex((i) => i.id === draggedId)
    const draggedItem = newIdeas[draggedIndex]

    // Update the grouped field if dropping in a different column/group
    const fieldToUpdate = targetGroupBy || groupBy
    if (targetValue) {
      const currentValue = fieldToUpdate === 'status' ? (draggedItem.status || 'request') : draggedItem[fieldToUpdate]
      if (currentValue !== targetValue) {
        draggedItem[fieldToUpdate] = targetValue
      }
    }

    // Reorder if dropping on a specific card
    if (targetId) {
      const targetIndex = newIdeas.findIndex((i) => i.id === targetId)
      newIdeas.splice(draggedIndex, 1)
      newIdeas.splice(targetIndex, 0, draggedItem)
    }

    setIdeas(newIdeas)
    setDraggedId(null)

    // Save to API
    setSaving(true)
    try {
      await updateAllIdeas(newIdeas)
    } catch (err) {
      console.error('Failed to save reorder:', err)
      setIdeas(prevIdeas) // Revert on error
    } finally {
      setSaving(false)
    }
  }

  // Toggle group collapse
  const toggleGroupCollapse = (groupValue) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [groupValue]: !prev[groupValue],
    }))
  }

  // Bulk selection handlers
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const selectAll = () => {
    setSelectedIds(filteredIdeas.map((i) => i.id))
  }

  const clearSelection = () => {
    setSelectedIds([])
  }

  const handleBulkUpdate = async (field, value) => {
    const prevIdeas = ideas
    const now = Date.now()
    const updatedIdeas = ideas.map((idea) => {
      if (!selectedIds.includes(idea.id)) return idea
      const updated = { ...idea, [field]: value, lastModified: now }
      // Track status change
      if (field === 'status' && idea.status !== value) {
        updated.lastStatusChange = now
        if (value === 'shipped' && !updated.shippedAt) {
          updated.shippedAt = now
        }
      }
      return updated
    })

    setIdeas(updatedIdeas)
    setSelectedIds([])
    setSaving(true)
    try {
      await updateAllIdeas(updatedIdeas)
    } catch (err) {
      console.error('Failed to bulk update:', err)
      setIdeas(prevIdeas)
    } finally {
      setSaving(false)
    }
  }

  const handleBulkDelete = async () => {
    const prevIdeas = ideas
    const filteredList = ideas.filter((i) => !selectedIds.includes(i.id))
    setIdeas(filteredList)
    setSelectedIds([])
    setSaving(true)
    try {
      await updateAllIdeas(filteredList)
    } catch (err) {
      console.error('Failed to bulk delete:', err)
      setIdeas(prevIdeas)
    } finally {
      setSaving(false)
    }
  }

  // Filter ideas (multi-select + search)
  const filteredIdeas = ideas.filter((idea) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesTitle = idea.title?.toLowerCase().includes(query)
      const matchesDescription = idea.description?.toLowerCase().includes(query)
      if (!matchesTitle && !matchesDescription) return false
    }
    if (filters.type?.length > 0 && !filters.type.includes(idea.type || 'feature')) return false
    if (filters.status?.length > 0 && !filters.status.includes(idea.status || 'backlog')) return false
    if (filters.priority?.length > 0 && !filters.priority.includes(idea.priority)) return false
    if (filters.complexity?.length > 0 && !filters.complexity.includes(idea.complexity)) return false
    if (filters.createdBy?.length > 0 && !filters.createdBy.includes(idea.createdBy?.id)) return false
    return true
  })

  // Get grouping options based on groupBy selection
  const getGroupingOptions = () => {
    switch (groupBy) {
      case 'type':
        return TYPE_OPTIONS
      case 'priority':
        return PRIORITY_OPTIONS.map((opt) => ({ ...opt, icon: 'flag', iconColor: opt.color }))
      case 'complexity':
        return COMPLEXITY_OPTIONS.map((opt) => ({ ...opt, icon: 'speed', iconColor: opt.color }))
      default:
        return STATUS_OPTIONS
    }
  }

  const groupingOptions = getGroupingOptions()

  // Get grouped ideas
  const getGroupedIdeas = (groupValue) => {
    return filteredIdeas.filter((idea) => {
      const ideaValue = groupBy === 'status' ? (idea.status || 'backlog') :
                        groupBy === 'type' ? (idea.type || 'feature') : idea[groupBy]
      return ideaValue === groupValue
    })
  }

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <Heading>Roadmap</Heading>
          <Text className="mt-1">Track and prioritize feature ideas</Text>
        </div>
        <div className="flex items-center gap-3">
          {saving && (
            <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-blue-600" />
              Saving...
            </div>
          )}
          <button
            onClick={() => openAddModal()}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors"
          >
            <MaterialIcon name="add" size={18} />
            Add Idea
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {/* Left column: All Ideas by Status + Shipped Chart */}
        <div className="flex flex-col gap-4">
          <AllIdeasStatusCard ideas={ideas} />
          <ShippedChart ideas={ideas} />
        </div>
        {/* Right column: By Type + Feature Requests + Bugs */}
        <StatsSection ideas={ideas} />
      </div>

      {/* ViewBar and cards container */}
      <div className="mt-10">
        <ViewBar
          view={view}
          onViewChange={setView}
          groupBy={groupBy}
          onGroupByChange={setGroupBy}
          filters={filters}
          onFiltersChange={setFilters}
          users={users}
          ideas={ideas}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {userIsAdmin && (
          <BulkActionsBar
            selectedCount={selectedIds.length}
            onSelectAll={selectAll}
            onClearSelection={clearSelection}
            onBulkUpdate={handleBulkUpdate}
            onBulkDelete={handleBulkDelete}
          />
        )}

        {loading ? (
          <div className="rounded-xl border border-zinc-200 bg-white p-12 text-center dark:border-zinc-700 dark:bg-zinc-800">
          <div className="h-12 w-12 mx-auto animate-spin rounded-full border-4 border-zinc-200 border-t-blue-600" />
          <h3 className="mt-4 font-medium text-zinc-900 dark:text-white">Loading ideas...</h3>
        </div>
        ) : ideas.length === 0 ? (
          <div className="rounded-xl border border-zinc-200 bg-white p-12 text-center dark:border-zinc-700 dark:bg-zinc-800">
            <MaterialIcon name="lightbulb" size={48} className="text-zinc-300 dark:text-zinc-600 mx-auto" />
            <h3 className="mt-4 font-medium text-zinc-900 dark:text-white">No ideas yet</h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Add your first idea to start building your roadmap
            </p>
          </div>
        ) : filteredIdeas.length === 0 ? (
          <div className="rounded-xl border border-zinc-200 bg-white p-12 text-center dark:border-zinc-700 dark:bg-zinc-800">
            <MaterialIcon name="filter_list_off" size={48} className="text-zinc-300 dark:text-zinc-600 mx-auto" />
            <h3 className="mt-4 font-medium text-zinc-900 dark:text-white">No matching ideas</h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Try adjusting your filters
            </p>
          </div>
        ) : view === 'list' ? (
          <div className="space-y-6">
          {groupingOptions.map((group) => {
            const groupIdeas = getGroupedIdeas(group.value)
            const hasActiveFilters = searchQuery || filters.type?.length > 0 || filters.status?.length > 0 || filters.priority?.length > 0 || filters.complexity?.length > 0 || filters.createdBy?.length > 0

            // Hide empty groups when filtering
            if (groupIdeas.length === 0 && hasActiveFilters) return null

            const isDraggedFromDifferentGroup = draggedId && !groupIdeas.find((i) => i.id === draggedId)
            const isDropTarget = dragOverGroup === group.value && isDraggedFromDifferentGroup
            const colorStyle = dropZoneStyles[group.color] || dropZoneStyles.zinc
            const iconStyle = dropZoneStyles[group.iconColor] || colorStyle
            const isCollapsed = collapsedGroups[group.value]

            return (
              <div
                key={group.value}
                onDragEnter={userIsAdmin ? () => handleGroupDragEnter(group.value) : undefined}
                onDragLeave={userIsAdmin ? (e) => handleGroupDragLeave(e, group.value) : undefined}
                onDragOver={userIsAdmin ? handleDragOver : undefined}
                onDrop={userIsAdmin ? (e) => {
                  e.preventDefault()
                  if (isDraggedFromDifferentGroup) {
                    handleDrop(e, null, group.value, groupBy)
                  }
                } : undefined}
              >
                <div className="flex items-center gap-2 mb-3">
                  <button
                    onClick={() => toggleGroupCollapse(group.value)}
                    className="flex items-center gap-2 group"
                  >
                    <MaterialIcon
                      name={isCollapsed ? 'chevron_right' : 'expand_more'}
                      size={20}
                      className="text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors"
                    />
                    <MaterialIcon name={group.icon} size={20} className={iconStyle.icon} />
                    <h2 className="font-semibold text-zinc-900 dark:text-white">{group.label}</h2>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">({groupIdeas.length})</span>
                  </button>
                  <button
                    onClick={() => openAddModal({ [groupBy]: group.value })}
                    className="ml-auto p-1 rounded-md text-zinc-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:bg-blue-900/30 transition-colors"
                    title={`Add to ${group.label}`}
                  >
                    <MaterialIcon name="add" size={18} />
                  </button>
                </div>

                {!isCollapsed && (
                  <>
                    {/* Drop zone indicator */}
                    {isDropTarget && (
                      <div className={`mb-3 rounded-xl border-2 border-dashed ${colorStyle.border} ${colorStyle.bg} p-4 text-center transition-all`}>
                        <div className="flex items-center justify-center gap-2">
                          <MaterialIcon name="add_circle" size={20} className={colorStyle.icon} />
                          <span className={`text-sm font-medium ${colorStyle.text}`}>
                            Drop to move to {group.label}
                          </span>
                        </div>
                      </div>
                    )}

                    {groupIdeas.length > 0 ? (
                      <div className="space-y-3">
                        {groupIdeas.map((idea) => (
                          <IdeaCard
                            key={idea.id}
                            idea={idea}
                            onUpdate={handleUpdateIdea}
                            onDelete={handleDeleteIdea}
                            onDragStart={handleDragStart}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onDragEnd={handleDragEnd}
                            isDragging={draggedId === idea.id}
                            users={users}
                            isSelected={selectedIds.includes(idea.id)}
                            onToggleSelect={toggleSelect}
                            groupBy={groupBy}
                            isExpanded={expandedId === idea.id}
                            onToggleExpand={(id) => setExpandedId(expandedId === id ? null : id)}
                            canManage={userIsAdmin}
                          />
                        ))}
                      </div>
                    ) : (
                      <div
                        className={`rounded-xl border-2 border-dashed p-6 text-center transition-all ${
                          isDropTarget
                            ? `${colorStyle.border} ${colorStyle.bg}`
                            : 'border-zinc-200 dark:border-zinc-700'
                        }`}
                      >
                        <span className={`text-sm ${isDropTarget ? colorStyle.text : 'text-zinc-400 dark:text-zinc-500'}`}>
                          {isDropTarget ? `Drop to add to ${group.label}` : 'No items'}
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
            )
          })}
          </div>
        ) : view === 'kanban' ? (
          <div className="rounded-xl border border-zinc-200 bg-white p-4 flex gap-4 overflow-x-auto dark:border-zinc-700 dark:bg-zinc-800">
          {groupingOptions.map((group) => {
            const groupIdeas = getGroupedIdeas(group.value)
            const hasActiveFilters = searchQuery || filters.type?.length > 0 || filters.status?.length > 0 || filters.priority?.length > 0 || filters.complexity?.length > 0 || filters.createdBy?.length > 0

            // Hide empty columns when filtering
            if (groupIdeas.length === 0 && hasActiveFilters) return null

            return (
              <KanbanColumn
                key={group.value}
                title={group.label}
                statusValue={group.value}
                ideas={groupIdeas}
                color={group.color}
                iconColor={group.iconColor}
                icon={group.icon}
                onUpdate={handleUpdateIdea}
                onDelete={handleDeleteIdea}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragEnd={handleDragEnd}
                draggedId={draggedId}
                dragOverGroup={dragOverGroup}
                onGroupDragEnter={handleGroupDragEnter}
                onGroupDragLeave={handleGroupDragLeave}
                groupBy={groupBy}
                users={users}
                selectedIds={selectedIds}
                onToggleSelect={toggleSelect}
                expandedId={expandedId}
                onToggleExpand={(id) => setExpandedId(expandedId === id ? null : id)}
                onQuickAdd={openAddModal}
                canManage={userIsAdmin}
                isCollapsed={collapsedGroups[group.value]}
                onToggleCollapse={toggleGroupCollapse}
              />
            )
          })}
          </div>
        ) : view === 'calendar' ? (
          <CalendarView
            ideas={filteredIdeas}
            dateField={calendarDateField}
            onDateFieldChange={setCalendarDateField}
            onUpdate={handleUpdateIdea}
            onDelete={handleDeleteIdea}
            users={users}
            expandedId={expandedId}
            onToggleExpand={(id) => setExpandedId(expandedId === id ? null : id)}
            canManage={userIsAdmin}
          />
        ) : (
          <EisenhowerView
            ideas={filteredIdeas}
            onUpdate={handleUpdateIdea}
            onDelete={handleDeleteIdea}
            users={users}
            expandedId={expandedId}
            onToggleExpand={(id) => setExpandedId(expandedId === id ? null : id)}
            canManage={userIsAdmin}
          />
        )}
      </div>

      <AddIdeaModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false)
          setAddModalInitialValues(null)
        }}
        onAdd={handleAddIdea}
        initialValues={addModalInitialValues}
      />
    </DashboardLayout>
  )
}
