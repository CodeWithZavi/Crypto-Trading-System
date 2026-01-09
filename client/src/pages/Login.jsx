import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) return;

        setIsSubmitting(true);
        const success = await login(email, password);
        setIsSubmitting(false);

        if (success) {
            navigate('/dashboard');
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 bg-crypto-dark">
            <Card className="w-full max-w-md p-8 border-t-4 border-t-crypto-accent">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                    <p className="text-gray-400">Log in to continue trading</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        required
                    />

                    <div>
                        <Input
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                        <div className="flex justify-end mt-2">
                            <span className="text-sm text-gray-400 hover:text-crypto-accent cursor-pointer transition-colors">
                                Forgot Password?
                            </span>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        size="full"
                        isLoading={isSubmitting}
                    >
                        Log In
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-400">
                    Don't have an account? <Link to="/signup" className="text-crypto-accent hover:underline font-medium">Register Now</Link>
                </div>
            </Card>
        </div>
    );
};

export default Login;
