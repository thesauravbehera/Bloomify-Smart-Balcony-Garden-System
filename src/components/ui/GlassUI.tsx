// GlassUI Components Library
// Enhanced UI components with glassmorphism design

import React from 'react';

/**
 * GlassCard - Premium glass-morphism card component
 * Combines dark green theme with premium glassmorphism effects
 */
export const GlassCard = ({
  children,
  variant = 'standard',
  className = '',
  onClick,
  hover = true,
  ...props
}: {
  children: React.ReactNode;
  variant?: 'subtle' | 'standard' | 'strong' | 'green' | 'ultra';
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  [key: string]: any;
}) => {
  const variants = {
    subtle: 'glass-subtle',
    standard: 'glass-card',
    strong: 'glass-strong',
    green: 'glass-green',
    ultra: 'glass-ultra',
  };

  return (
    <div
      className={`${variants[variant]} ${hover ? 'hover:shadow-lg' : ''} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * GlassButton - Premium button with green gradient
 */
export const GlassButton = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled = false,
  ...props
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  [key: string]: any;
}) => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
  };

  return (
    <button
      disabled={disabled || loading}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        ${loading ? 'opacity-75 cursor-wait' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        transition-all duration-300 ease-out
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

/**
 * GlassInput - Premium input field with glass styling
 */
export const GlassInput = ({
  placeholder = 'Enter text...',
  className = '',
  error = false,
  ...props
}: {
  placeholder?: string;
  className?: string;
  error?: boolean;
  [key: string]: any;
}) => {
  return (
    <input
      placeholder={placeholder}
      className={`
        input-glass
        ${error ? 'border-red-500/50 focus:border-red-500' : ''}
        ${className}
      `}
      {...props}
    />
  );
};

/**
 * GlassSection - Full-width section with background
 */
export const GlassSection = ({
  children,
  title,
  subtitle,
  className = '',
  variant = 'default',
  ...props
}: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  variant?: 'default' | 'accent' | 'dark';
  [key: string]: any;
}) => {
  const variants = {
    default: 'bg-[#020617]',
    accent: 'bg-[#0f172a] border-t border-b border-[rgba(255,255,255,0.05)]',
    dark: 'bg-[#0a0a0a]',
  };

  return (
    <section className={`${variants[variant]} py-16 px-6 sm:py-24 ${className}`} {...props}>
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <div className="mb-12 text-center">
            {title && <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{title}</h2>}
            {subtitle && <p className="text-lg text-gray-400">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

/**
 * GlassGrid - Responsive grid layout for cards
 */
export const GlassGrid = ({
  children,
  cols = 3,
  gap = 'gap-6',
  className = '',
}: {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4;
  gap?: string;
  className?: string;
}) => {
  const colsMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return <div className={`grid ${colsMap[cols]} ${gap} ${className}`}>{children}</div>;
};

/**
 * GlassNavItem - Navigation item with underline animation
 */
export const GlassNavItem = ({
  children,
  active = false,
  className = '',
  ...props
}: {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
  [key: string]: any;
}) => {
  return (
    <a
      className={`
        nav-item
        ${active ? 'active' : ''}
        px-1 py-2 transition-colors duration-300
        ${className}
      `}
      {...props}
    >
      {children}
    </a>
  );
};

/**
 * GlassToolbar - Toolbar with glass background
 */
export const GlassToolbar = ({
  children,
  sticky = true,
  className = '',
}: {
  children: React.ReactNode;
  sticky?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={`
        ${sticky ? 'sticky top-0 z-40' : ''}
        bg-[rgba(255,255,255,0.05)]
        backdrop-blur-[20px]
        border-b border-[rgba(255,255,255,0.1)]
        px-6 py-4
        ${className}
      `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">{children}</div>
    </div>
  );
};

/**
 * GlassAlert - Alert/notification component
 */
export const GlassAlert = ({
  type = 'info',
  title,
  message,
  onClose,
  action,
  className = '',
}: {
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  onClose?: () => void;
  action?: { label: string; onClick: () => void };
  className?: string;
}) => {
  const typeStyles = {
    success: 'border-green-500/30 bg-green-500/10',
    error: 'border-red-500/30 bg-red-500/10',
    warning: 'border-amber-500/30 bg-amber-500/10',
    info: 'border-blue-500/30 bg-blue-500/10',
  };

  return (
    <div
      className={`
        glass-card border-l-4
        ${typeStyles[type]}
        p-4 flex items-start justify-between gap-4
        ${className}
      `}
    >
      <div className="flex-1">
        {title && <h4 className="font-semibold text-white mb-1">{title}</h4>}
        <p className="text-gray-300 text-sm">{message}</p>
      </div>
      <div className="flex items-center gap-2">
        {action && (
          <button
            onClick={action.onClick}
            className="text-sm font-semibold text-green-400 hover:text-green-300 transition"
          >
            {action.label}
          </button>
        )}
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition ml-2"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * GlassModal - Modal overlay with glass effect
 */
export const GlassModal = ({
  isOpen,
  title,
  children,
  onClose,
  actions,
  className = '',
}: {
  isOpen: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
  actions?: Array<{ label: string; onClick: () => void; variant?: 'primary' | 'secondary' }>;
  className?: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className={`relative glass-strong max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto ${className}`}>
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-[rgba(255,255,255,0.1)]">
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition text-2xl leading-none"
            >
              ✕
            </button>
          </div>
        )}

        {/* Content */}
        <div className="p-6">{children}</div>

        {/* Actions */}
        {actions && actions.length > 0 && (
          <div className="flex gap-3 p-6 border-t border-[rgba(255,255,255,0.1)]">
            {actions.map((action, idx) => (
              <GlassButton
                key={idx}
                variant={action.variant || 'secondary'}
                size="md"
                onClick={action.onClick}
                className="flex-1"
              >
                {action.label}
              </GlassButton>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * GlassTabs - Tabbed interface component
 */
export const GlassTabs = ({
  tabs,
  activeTab,
  onTabChange,
  className = '',
}: {
  tabs: Array<{ id: string; label: string; content: React.ReactNode }>;
  activeTab: string;
  onTabChange: (id: string) => void;
  className?: string;
}) => {
  return (
    <div className={className}>
      {/* Tab List */}
      <div className="flex border-b border-[rgba(255,255,255,0.1)] mb-6 gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              px-4 py-3 transition-all duration-300 relative
              ${
                activeTab === tab.id
                  ? 'text-green-400 font-semibold'
                  : 'text-gray-400 hover:text-white'
              }
            `}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in-up">
        {tabs.find((t) => t.id === activeTab)?.content}
      </div>
    </div>
  );
};

/**
 * GlassLoadingState - Loading skeleton component
 */
export const GlassLoadingSkeleton = ({
  count = 3,
  className = '',
}: {
  count?: number;
  className?: string;
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`
            h-24 glass-card rounded-lg
            bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-size-200
            animate-shimmer
          `}
          style={{
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s infinite',
          }}
        />
      ))}
    </div>
  );
};

/**
 * GlassFeatureCard - Feature showcase card with icon
 */
export const GlassFeatureCard = ({
  icon: Icon,
  title,
  description,
  onClick,
  badge,
  className = '',
}: {
  icon?: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
  badge?: string;
  className?: string;
}) => {
  return (
    <GlassCard
      onClick={onClick}
      className={`group cursor-pointer overflow-hidden ${className}`}
      variant="green"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition">
          {Icon && <span className="text-green-400 text-xl">{Icon}</span>}
        </div>
        {badge && <span className="text-xs font-semibold bg-green-500/20 text-green-300 px-2 py-1 rounded">{badge}</span>}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-green-400 transition">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </GlassCard>
  );
};
