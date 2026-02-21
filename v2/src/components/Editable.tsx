import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePortfolio } from '../context/PortfolioContext';
import { cn } from '../lib/utils';
import { Check, X } from 'lucide-react';

interface EditableProps {
    path: string;
    value: string;
    className?: string;
    type?: 'input' | 'textarea';
}

const Editable: React.FC<EditableProps> = ({ path, value, className, type = 'input' }) => {
    const { isLoggedIn } = useAuth();
    const { updateField, saveStatus } = usePortfolio();
    const [isEditing, setIsEditing] = useState(false);
    const [currentValue, setCurrentValue] = useState(value);
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setCurrentValue(value);
    }, [value]);

    const handleSave = async () => {
        if (currentValue !== value) {
            await updateField(path, currentValue);
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setCurrentValue(value);
        setIsEditing(false);
    };

    if (!isLoggedIn) {
        return <span className={className}>{value}</span>;
    }

    if (isEditing) {
        return (
            <div className="relative group/edit inline-block w-full min-w-[20px]" ref={containerRef}>
                {type === 'input' ? (
                    <input
                        value={currentValue}
                        onChange={(e) => setCurrentValue(e.target.value)}
                        className={cn(
                            "bg-secondary/50 border border-primary px-2 py-0.5 rounded outline-none w-full",
                            className
                        )}
                        autoFocus
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSave();
                            if (e.key === 'Escape') handleCancel();
                        }}
                    />
                ) : (
                    <textarea
                        value={currentValue}
                        onChange={(e) => setCurrentValue(e.target.value)}
                        className={cn(
                            "bg-secondary/50 border border-primary px-2 py-0.5 rounded outline-none w-full min-h-[100px]",
                            className
                        )}
                        autoFocus
                        onKeyDown={(e) => {
                            if (e.key === 'Escape') handleCancel();
                        }}
                    />
                )}
                <div className="absolute top-full left-0 mt-1 flex gap-1 z-50">
                    <button
                        onClick={handleSave}
                        className="p-1 bg-primary text-primary-foreground rounded shadow-lg hover:opacity-90 transition-all"
                        disabled={saveStatus === 'saving'}
                    >
                        <Check size={14} />
                    </button>
                    <button
                        onClick={handleCancel}
                        className="p-1 bg-secondary text-secondary-foreground rounded shadow-lg hover:bg-secondary/80 transition-all"
                    >
                        <X size={14} />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <span
            className={cn(
                "relative group/show cursor-pointer hover:ring-1 hover:ring-primary/50 hover:bg-primary/5 rounded px-1 -mx-1 transition-all inline-block min-w-[5px]",
                className
            )}
            onClick={() => setIsEditing(true)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {value || <span className="text-muted-foreground/30 italic">Empty</span>}
            {isHovered && (
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded shadow-xl animate-in fade-in slide-in-from-bottom-1 whitespace-nowrap z-50">
                    Click to edit
                </span>
            )}
        </span>
    );
};

export default Editable;
