// Enhanced Dashboard Component
// Shows how to integrate GlassUI components with animation and dark green theme

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GlassCard,
  GlassButton,
  GlassGrid,
  GlassAlert,
} from './ui/GlassUI';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, Settings, Droplets } from 'lucide-react';

export function EnhancedDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');

  // Mock data
  const plantGrowthData = [
    { name: 'Week 1', health: 60 },
    { name: 'Week 2', health: 75 },
    { name: 'Week 3', health: 82 },
    { name: 'Week 4', health: 90 },
  ];

  const gardenStats = [
    { icon: '🌿', label: 'Plants Growing', value: '12', trend: '+2' },
    { icon: '💧', label: 'Watering Due', value: '3', trend: '-1' },
    { icon: '☀️', label: 'Avg Sunlight', value: '6h', trend: '+1h' },
    { icon: '🏆', label: 'Current Level', value: '8', trend: '+1' },
  ];

  const recentPlants = [
    { name: 'Basil', health: 92, watering: '2 days ago', icon: '🌿' },
    { name: 'Tomato', health: 78, watering: '1 day ago', icon: '🍅' },
    { name: 'Mint', health: 85, watering: 'Today', icon: '🍃' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 pt-24 pb-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 mb-12"
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">Your Garden Dashboard</h1>
          <p className="text-gray-400">Welcome back! Here's your garden status.</p>
        </div>
      </motion.div>

      {/* Alerts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-6 mb-8"
      >
        <div className="max-w-7xl mx-auto">
          <GlassAlert
            type="warning"
            title="Watering Reminder"
            message="Your tomato plant needs water in 2 hours. Check your care schedule."
            action={{ label: 'View Schedule', onClick: () => console.log('View schedule') }}
          />
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="px-6 mb-12"
      >
        <div className="max-w-7xl mx-auto">
          <GlassGrid cols={4} gap="gap-4">
            {gardenStats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <GlassCard variant="subtle" className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-2xl">{stat.icon}</span>
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-500/20 text-green-300">
                      {stat.trend}
                    </span>
                  </div>
                  <h3 className="text-gray-400 text-sm mb-1">{stat.label}</h3>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </GlassCard>
              </motion.div>
            ))}
          </GlassGrid>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="px-6 mb-8"
      >
        <div className="max-w-7xl mx-auto flex gap-4 border-b border-white/10">
          {['overview', 'plants', 'analytics', 'care'].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`py-4 px-6 font-semibold transition-all relative ${
                selectedTab === tab ? 'text-green-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {selectedTab === tab && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500"
                />
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Content Sections */}
      <div className="px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {selectedTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Charts Grid */}
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Health Chart */}
                  <GlassCard variant="standard" className="p-6">
                    <h3 className="text-lg font-bold text-white mb-6">Garden Health Trend</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={plantGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                        <XAxis stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(2, 6, 23, 0.9)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '8px',
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="health"
                          stroke="#10b981"
                          strokeWidth={3}
                          dot={{ fill: '#10b981', r: 5 }}
                          animationDuration={1000}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </GlassCard>

                  {/* Level Progress */}
                  <GlassCard variant="green" className="p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-4">Current Level</h3>
                      <div className="relative h-32 flex items-center justify-center">
                        <div className="relative w-24 h-24 flex items-center justify-center">
                          {/* Circular Progress */}
                          <svg className="transform -rotate-90 w-24 h-24" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="#ffffff20" strokeWidth="2" />
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              fill="none"
                              stroke="#10b981"
                              strokeWidth="2"
                              strokeDasharray="141.3 282.6"
                              strokeLinecap="round"
                            />
                          </svg>
                          <span className="absolute text-3xl font-bold text-white">8</span>
                        </div>
                      </div>
                      <p className="text-center text-gray-300 mt-4">80 XP to Level 9</p>
                    </div>
                    <GlassButton variant="secondary" size="sm" className="w-full">
                      View Achievements
                    </GlassButton>
                  </GlassCard>
                </div>

                {/* Recent Plants */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-white">Your Plants</h3>
                    <GlassButton variant="ghost" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Plant
                    </GlassButton>
                  </div>

                  <div className="space-y-4">
                    {recentPlants.map((plant, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <GlassCard variant="standard" className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <span className="text-3xl">{plant.icon}</span>
                              <div>
                                <h4 className="font-bold text-white">{plant.name}</h4>
                                <p className="text-sm text-gray-400">Last watered: {plant.watering}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="font-bold text-white">{plant.health}%</p>
                                <p className="text-xs text-gray-400">Health</p>
                              </div>
                              <div className="flex gap-2">
                                <GlassButton variant="ghost" size="sm">
                                  <Droplets className="w-4 h-4" />
                                </GlassButton>
                                <GlassButton variant="ghost" size="sm">
                                  <Settings className="w-4 h-4" />
                                </GlassButton>
                              </div>
                            </div>
                          </div>
                          {/* Health Bar */}
                          <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${plant.health}%` }}
                              transition={{ duration: 0.8 }}
                              className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                            />
                          </div>
                        </GlassCard>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {selectedTab === 'plants' && (
              <motion.div
                key="plants"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <GlassCard variant="standard" className="p-8 text-center">
                  <p className="text-gray-400">Plants section coming soon</p>
                </GlassCard>
              </motion.div>
            )}

            {selectedTab === 'analytics' && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <GlassCard variant="standard" className="p-8 text-center">
                  <p className="text-gray-400">Analytics section coming soon</p>
                </GlassCard>
              </motion.div>
            )}

            {selectedTab === 'care' && (
              <motion.div
                key="care"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <GlassCard variant="standard" className="p-8 text-center">
                  <p className="text-gray-400">Care schedule section coming soon</p>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default EnhancedDashboard;
