
import React, { useState, useEffect } from 'react';
import { isAdminLoggedIn, login as apiLogin, logout as apiLogout } from '../services/announcementService';
import AdminPanel from '../components/AdminPanel';
import LoadingSpinner from '../components/LoadingSpinner';

interface AdminPageProps {
  toggleTheme?: () => void;
  isDarkMode?: boolean;
}

const LoginForm: React.FC<{ onLogin: (password: string) => Promise<boolean> }> = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        const success = await onLogin(password);
        if (!success) {
            setError('Senha incorreta. Tente novamente.');
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-500 p-6">
            <div className="max-w-md w-full bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-2xl shadow-slate-200 dark:shadow-black/50 border border-slate-100 dark:border-slate-800 animate-fade-in">
                <div className="text-center mb-10">
                    <div className="bg-indigo-600 dark:bg-brand-gold w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-200 dark:shadow-brand-gold/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight uppercase font-display italic">Acesso <span className="text-indigo-600 dark:text-brand-gold">Restrito</span></h2>
                    <p className="text-slate-400 dark:text-slate-500 text-sm mt-2 font-medium">Digite a senha administrativa da Regional</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="password" className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 ml-1">Senha de Acesso</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 dark:focus:ring-brand-gold text-slate-800 dark:text-white transition-all placeholder-slate-300 dark:placeholder-slate-600"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 text-xs py-3 px-4 rounded-xl font-bold flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 bg-indigo-600 dark:bg-brand-gold hover:bg-indigo-700 dark:hover:bg-brand-amber text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-indigo-200 dark:shadow-brand-gold/20 disabled:opacity-50 transform active:scale-95"
                    >
                        {isLoading ? 'Verificando...' : 'Entrar no Painel'}
                    </button>
                </form>
            </div>
        </div>
    );
};


const AdminPage: React.FC<AdminPageProps> = ({ toggleTheme, isDarkMode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoggedIn(isAdminLoggedIn());
        setIsLoading(false);
    }, []);

    const handleLogin = async (password: string) => {
        const success = await apiLogin(password);
        if (success) {
            setIsLoggedIn(true);
        }
        return success;
    };

    const handleLogout = () => {
        apiLogout();
        setIsLoggedIn(false);
    };
    
    if(isLoading) return <LoadingSpinner />;

    if (!isLoggedIn) {
        return <LoginForm onLogin={handleLogin} />;
    }

    return <AdminPanel onLogout={handleLogout} toggleTheme={toggleTheme} isDarkMode={isDarkMode} />;
};

export default AdminPage;
