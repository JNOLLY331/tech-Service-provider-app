export default function Input({ label, ...props }) {
    return (
        <div className="space-y-2">
            {label && <label className="text-sm font-bold text-gray-700 ml-1">{label}</label>}
            <input 
                className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all"
                {...props} 
            />
        </div>
    );
}