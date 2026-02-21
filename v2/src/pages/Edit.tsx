import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePortfolio } from '../context/PortfolioContext';
import { useNavigate } from 'react-router-dom';
import { Lock, Unlock, LogOut, ArrowLeft, Download, FileJson, Upload } from 'lucide-react';

const Edit = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const { isLoggedIn, login, logout } = useAuth();
    const { data, importData } = usePortfolio();
    const navigate = useNavigate();

    const exportData = () => {
        const dataStr = `export const portfolioData = ${JSON.stringify(data, null, 4)};`;
        const blob = new Blob([dataStr], { type: 'application/javascript' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'portfolio.ts';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            const content = event.target?.result as string;
            try {
                // Regex to extract the object portion from 'export const portfolioData = { ... };'
                const match = content.match(/export const portfolioData = (\{[\s\S]*\});?/);
                if (match && match[1]) {
                    const parsedData = JSON.parse(match[1]);
                    await importData(parsedData);
                    alert("Portfolio data imported successfully!");
                } else {
                    throw new Error("Invalid file format");
                }
            } catch (err) {
                console.error("Failed to parse portfolio file:", err);
                alert("Failed to parse portfolio file. Please ensure it follows the correct format.");
            }
        };
        reader.readAsText(file);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await login(password);
        if (!success) {
            setError('Invalid password');
        } else {
            setError('');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-background">
            <div className="w-full max-w-md p-8 rounded-2xl border border-border bg-card shadow-xl animate-in fade-in zoom-in duration-300">
                <div className="flex justify-between items-center mb-8">
                    <button
                        onClick={() => navigate('/')}
                        className="p-2 hover:bg-secondary rounded-full transition-colors flex items-center gap-2 text-sm"
                    >
                        <ArrowLeft size={16} /> Back to Portfolio
                    </button>
                    <div className="p-3 bg-primary/10 rounded-xl text-primary">
                        {isLoggedIn ? <Unlock size={24} /> : <Lock size={24} />}
                    </div>
                </div>

                <h1 className="text-2xl font-bold mb-2 tracking-tight">
                    {isLoggedIn ? 'Edit Mode Active' : 'Login to Edit'}
                </h1>
                <p className="text-muted-foreground text-sm mb-6">
                    {isLoggedIn
                        ? 'You can now edit any text directly on the portfolio pages. Changes will be saved to Firebase.'
                        : 'Enter your password to enable editing features across the entire website.'}
                </p>

                {isLoggedIn ? (
                    <div className="space-y-4">
                        <button
                            onClick={() => navigate('/')}
                            className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2"
                        >
                            Start Editing on Homepage
                        </button>
                        <button
                            onClick={exportData}
                            className="w-full py-3 bg-secondary text-secondary-foreground rounded-xl font-medium hover:bg-secondary/80 transition-all flex items-center justify-center gap-2"
                        >
                            <Download size={18} /> Export portfolio.ts
                        </button>

                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImport}
                            accept=".ts,.js,.json"
                            className="hidden"
                        />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full py-3 border border-primary/30 text-primary rounded-xl font-medium hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
                        >
                            <Upload size={18} /> Import portfolio.ts
                        </button>

                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
                            <div className="flex items-center gap-2 mb-2 text-primary">
                                <FileJson size={18} />
                                <span className="text-sm font-semibold">Pro Tip</span>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                After making changes, you can "Export portfolio.ts" and replace the local file in your code to make changes permanent without Firebase. You can also upload your <code>portfolio.ts</code> here to restore data.
                            </p>
                        </div>
                        <button
                            onClick={logout}
                            className="w-full py-3 border border-border text-foreground rounded-xl font-medium hover:bg-secondary transition-all flex items-center justify-center gap-2 mt-4"
                        >
                            <LogOut size={18} /> Logout
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••"
                                className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                autoFocus
                            />
                            {error && <p className="text-destructive text-xs mt-2 font-medium">{error}</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-all shadow-lg shadow-primary/20"
                        >
                            Unlock Website
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Edit;
