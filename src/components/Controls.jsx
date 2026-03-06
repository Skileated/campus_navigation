import React from 'react';
import { Search, Navigation, QrCode } from 'lucide-react';
import { searchOptions } from '../utils/graph';

const Controls = ({
    selectedRoom,
    setSelectedRoom,
    onStartNavigation,
    onScanQR,
    isNavigating
}) => {
    return (
        <div className="absolute bottom-0 w-full bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-6 z-10 safe-area-bottom pb-8">
            {/* Search Bar */}
            <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <select
                    className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl leading-5 bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow appearance-none font-medium text-lg"
                    value={selectedRoom || ""}
                    onChange={(e) => setSelectedRoom(e.target.value)}
                    disabled={isNavigating}
                >
                    <option value="" disabled>Search room (e.g., 205)</option>
                    {searchOptions.map(opt => (
                        <option key={opt.id} value={opt.id}>{opt.label}</option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>

            <div className="flex space-x-4">
                <button
                    onClick={onScanQR}
                    disabled={isNavigating}
                    className="flex-1 flex flex-col items-center justify-center p-4 rounded-2xl bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300 transition-colors disabled:opacity-50 font-medium"
                >
                    <QrCode className="h-6 w-6 mb-2" />
                    <span>Scan QR</span>
                </button>

                <button
                    onClick={onStartNavigation}
                    disabled={!selectedRoom || isNavigating}
                    className={`flex-[2] flex items-center justify-center p-4 rounded-2xl text-white font-semibold transition-all shadow-lg shadow-blue-500/30 ${!selectedRoom || isNavigating
                            ? 'bg-blue-300 cursor-not-allowed shadow-none'
                            : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 hover:scale-[1.02] active:scale-[0.98]'
                        }`}
                >
                    <Navigation className="h-6 w-6 mr-2" />
                    {isNavigating ? 'Navigating...' : 'Start Navigation'}
                </button>
            </div>
        </div>
    );
};

export default Controls;
