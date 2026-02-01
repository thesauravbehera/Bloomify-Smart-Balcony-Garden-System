// Modal Refactoring Template
// Use this as a reference to update all existing modal components

import React, { useState } from 'react';
import { GlassCard, GlassButton, GlassInput, GlassAlert } from './ui/GlassUI';
import { X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * TEMPLATE: How to refactor existing modals to use the new design system
 *
 * Steps:
 * 1. Replace white/light backgrounds with GlassCard variant="green"
 * 2. Replace button styling with GlassButton components
 * 3. Replace input fields with GlassInput
 * 4. Add motion animations for enter/exit
 * 5. Use emerald/green accent colors (#10b981, #059669)
 * 6. Test on dark background
 */

// ============================================================================
// BEFORE: Old Modal (with white background - bad for dark theme)
// ============================================================================

/*
export function OldPlantOfDayModal({ isOpen, onClose }) {
  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">  {/* WHITE BG - BAD */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Plant of the Day</h2>  {/* DARK TEXT - BAD */}
              <button onClick={onClose} className="text-gray-500">×</button>
            </div>
            
            <div className="mb-6">
              <img src={plantImage} alt="Plant" className="w-full rounded-lg" />
              <h3 className="text-lg font-bold text-gray-900 mt-4">{plantName}</h3>
              <p className="text-gray-600">{plantDescription}</p>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-gray-200 text-gray-900 rounded-lg py-2">Cancel</button>
              <button className="flex-1 bg-blue-500 text-white rounded-lg py-2">Add Plant</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
*/

// ============================================================================
// AFTER: Refactored Modal (with glassmorphism - good for dark theme)
// ============================================================================

interface RefactoredModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  plantImage?: string;
  plantName: string;
  plantDescription: string;
  onAddPlant: () => void;
}

export function RefactoredPlantOfDayModal({
  isOpen,
  onClose,
  title,
  plantImage,
  plantName,
  plantDescription,
  onAddPlant,
}: RefactoredModalProps) {
  const [loading, setLoading] = useState(false);

  const handleAddPlant = async () => {
    setLoading(true);
    try {
      await onAddPlant();
      // Success handling
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard variant="green" className="max-w-md w-full overflow-hidden">
                {/* Header with Close Button */}
                <div className="flex justify-between items-center p-6 border-b border-white/10">
                  <h2 className="text-xl font-bold text-white">{title}</h2>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Plant Image */}
                  {plantImage && (
                    <img
                      src={plantImage}
                      alt={plantName}
                      className="w-full h-48 object-cover rounded-lg mb-6"
                    />
                  )}

                  {/* Plant Info */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{plantName}</h3>
                    <p className="text-gray-300 leading-relaxed">{plantDescription}</p>
                  </div>

                  {/* Benefits List */}
                  <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
                    <h4 className="text-sm font-semibold text-green-400 mb-3">Care Tips</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="text-green-400 mt-0.5">✓</span>
                        <span>Place in bright, indirect light</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="text-green-400 mt-0.5">✓</span>
                        <span>Water when soil is dry to touch</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="text-green-400 mt-0.5">✓</span>
                        <span>Feed monthly during growing season</span>
                      </li>
                    </ul>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-white/5 rounded-lg p-3 text-center border border-white/10">
                      <p className="text-2xl font-bold text-green-400">4</p>
                      <p className="text-xs text-gray-400">Difficulty</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 text-center border border-white/10">
                      <p className="text-2xl font-bold text-green-400">7d</p>
                      <p className="text-xs text-gray-400">Water Cycle</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 text-center border border-white/10">
                      <p className="text-2xl font-bold text-green-400">2y</p>
                      <p className="text-xs text-gray-400">Lifespan</p>
                    </div>
                  </div>
                </div>

                {/* Footer with Actions */}
                <div className="flex gap-3 p-6 border-t border-white/10">
                  <GlassButton
                    variant="secondary"
                    size="md"
                    className="flex-1"
                    onClick={onClose}
                  >
                    Maybe Later
                  </GlassButton>
                  <GlassButton
                    variant="primary"
                    size="md"
                    className="flex-1"
                    onClick={handleAddPlant}
                    loading={loading}
                  >
                    Add to Garden
                  </GlassButton>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// ADVANCED EXAMPLES: Other Modal Patterns
// ============================================================================

/**
 * Confirmation Modal - for destructive actions
 */
export function ConfirmationModal({
  isOpen,
  onClose,
  title,
  message,
  onConfirm,
  isDangerous = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onConfirm: () => void;
  isDangerous?: boolean;
}) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <GlassCard
                variant={isDangerous ? 'standard' : 'green'}
                className="max-w-sm w-full"
              >
                {/* Icon & Title */}
                <div className="flex flex-col items-center pt-8 px-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                    isDangerous ? 'bg-red-500/20' : 'bg-green-500/20'
                  }`}>
                    {isDangerous ? (
                      <AlertCircle className="w-6 h-6 text-red-400" />
                    ) : (
                      <CheckCircle2 className="w-6 h-6 text-green-400" />
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-white text-center">{title}</h3>
                </div>

                {/* Message */}
                <p className="text-gray-300 text-center px-6 py-4">{message}</p>

                {/* Actions */}
                <div className="flex gap-3 p-6 border-t border-white/10">
                  <GlassButton
                    variant="secondary"
                    size="md"
                    className="flex-1"
                    onClick={onClose}
                  >
                    Cancel
                  </GlassButton>
                  <GlassButton
                    variant={isDangerous ? 'primary' : 'primary'}
                    size="md"
                    className="flex-1"
                    onClick={handleConfirm}
                    loading={loading}
                  >
                    {isDangerous ? 'Delete' : 'Confirm'}
                  </GlassButton>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * Input Modal - for text input
 */
export function InputModal({
  isOpen,
  onClose,
  title,
  placeholder,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  placeholder: string;
  onSubmit: (value: string) => Promise<void>;
}) {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!value.trim()) {
      setError('This field is required');
      return;
    }

    setLoading(true);
    try {
      await onSubmit(value);
      setValue('');
      setError('');
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <GlassCard variant="green" className="max-w-sm w-full">
                <div className="p-6 border-b border-white/10">
                  <h3 className="text-lg font-bold text-white">{title}</h3>
                </div>

                <div className="p-6">
                  <GlassInput
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                      setError('');
                    }}
                    error={!!error}
                    autoFocus
                  />
                  {error && (
                    <p className="text-red-400 text-sm mt-2">{error}</p>
                  )}
                </div>

                <div className="flex gap-3 p-6 border-t border-white/10">
                  <GlassButton
                    variant="secondary"
                    size="md"
                    className="flex-1"
                    onClick={onClose}
                  >
                    Cancel
                  </GlassButton>
                  <GlassButton
                    variant="primary"
                    size="md"
                    className="flex-1"
                    onClick={handleSubmit}
                    loading={loading}
                  >
                    Submit
                  </GlassButton>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// INTEGRATION GUIDE
// ============================================================================

/**
 * How to use these refactored modals:
 *
 * 1. Replace your existing modal imports with these new ones
 * 2. Update modal props to match the new interface
 * 3. Test on dark backgrounds to verify glass effect works
 * 4. Update any hardcoded colors to use green accent (#10b981)
 * 5. Add loading states where applicable
 * 6. Use motion animations for smooth enter/exit
 *
 * Example usage:
 *
 * const [showPlantModal, setShowPlantModal] = useState(false);
 *
 * <RefactoredPlantOfDayModal
 *   isOpen={showPlantModal}
 *   onClose={() => setShowPlantModal(false)}
 *   title="Plant of the Day"
 *   plantImage={plantData.image}
 *   plantName={plantData.name}
 *   plantDescription={plantData.description}
 *   onAddPlant={handleAddPlant}
 * />
 */

// ============================================================================
// EXISTING MODALS TO REFACTOR (Reference List)
// ============================================================================

/**
 * Files that need updating:
 *
 * 1. CalendarModal.tsx
 *    - Replace white background with GlassCard variant="green"
 *    - Update button styles to GlassButton
 *    - Add motion animations
 *
 * 2. CareRemindersModal.tsx
 *    - Apply same white-to-glass conversion
 *    - Update text colors to white/gray
 *    - Add green accent for important items
 *
 * 3. ExperimentModal.tsx
 *    - Convert form inputs to GlassInput
 *    - Update button styling
 *    - Add validation error states
 *
 * 4. FertilizerModal.tsx
 *    - Replace background with glass effect
 *    - Update all interactive elements
 *    - Add loading states
 *
 * 5. PlantDoctorModal.tsx
 *    - Convert to glassmorphism
 *    - Update diagnosis display styling
 *    - Add animations for results
 *
 * 6. PlantOfDayModal.tsx
 *    - See RefactoredPlantOfDayModal above for reference
 *
 * 7. PlantSuggestionsModal.tsx
 *    - Apply glass card styling
 *    - Update suggestion list display
 *    - Add green checkmarks for selected plants
 *
 * 8. SoilHealthModal.tsx
 *    - Convert progress bars to green accent
 *    - Update chart styling for dark theme
 *    - Replace white background
 */
