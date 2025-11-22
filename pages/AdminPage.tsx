
import React, { useState, useEffect } from 'react';
import { isAdminLoggedIn, login as apiLogin, logout as apiLogout } from '../services/announcementService';
import AdminPanel from '../components/AdminPanel';

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
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">Acesso Administrativo</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
                    >
                        {isLoading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
            </div>
        </div>
    );
};


const AdminPage: React.FC = () => {
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

    return <AdminPanel onLogout={handleLogout} />;
};

export default AdminPage;

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
    </div>
  );
};
