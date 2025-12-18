import { cn } from '../../utils/cn';

export default function Button({ children, className, variant = 'primary', ...props }) {
    const variants = {
        primary: 'bg-black text-white hover:bg-gray-900',
        accent: 'bg-blue-600 text-white hover:bg-blue-700',
        outline: 'border-2 border-gray-200 hover:border-black text-black',
    };

    return (
        <button 
            className={cn(
                'px-6 py-3 rounded-2xl font-bold transition-all active:scale-95 disabled:opacity-50',
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}