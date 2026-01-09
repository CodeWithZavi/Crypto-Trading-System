import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, X, AlertCircle } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const checkPasswordStrength = (pass) => {
        let strength = 0;
        if (pass.length > 7) strength++;
        if (/[A-Z]/.test(pass)) strength++;
        if (/[0-9]/.test(pass)) strength++;
        if (/[^A-Za-z0-9]/.test(pass)) strength++;
        setPasswordStrength(strength);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }

        if (name === 'password') {
            checkPasswordStrength(value);
        }
    };

    const validate = () => {
        const newErrors = {};
        if (formData.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters";
        if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email address";
        if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        const success = await register(formData.name, formData.email, formData.password);
        setIsSubmitting(false);

        if (success) {
            navigate('/dashboard');
        }
    };

    const getStrengthColor = () => {
        if (passwordStrength <= 1) return 'bg-red-500';
        if (passwordStrength <= 2) return 'bg-yellow-500';
        if (passwordStrength <= 3) return 'bg-blue-500';
        return 'bg-green-500';
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 bg-crypto-dark">
            <Card className="w-full max-w-md p-8 border-t-4 border-t-crypto-accent">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                    <p className="text-gray-400">Join the world's leading crypto exchange</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <Input
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        placeholder="Your Name"
                    />

                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        placeholder="name@example.com"
                    />

                    <div>
                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            error={errors.password}
                            placeholder="••••••••"
                        />
                        {formData.password && (
                            <div className="mt-2">
                                <div className="flex justify-between mb-1 text-xs text-gray-400">
                                    <span>Strength</span>
                                    <span>{['Weak', 'Fair', 'Good', 'Strong'][Math.min(3, passwordStrength - 1)]}</span>
                                </div>
                                <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                                        style={{ width: `${(passwordStrength / 4) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}
                    </div>

                    <Input
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={errors.confirmPassword}
                        placeholder="••••••••"
                    />

                    <div className="text-xs text-gray-500 mt-2">
                        By registering, you agree to our <span className="text-crypto-accent cursor-pointer hover:underline">Terms of Service</span> and <span className="text-crypto-accent cursor-pointer hover:underline">Privacy Policy</span>.
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        size="full"
                        isLoading={isSubmitting}
                        className="mt-4"
                    >
                        Create Account
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-400">
                    Already have an account? <Link to="/login" className="text-crypto-accent hover:underline font-medium">Log In</Link>
                </div>
            </Card>
        </div>
    );
};

export default Signup;
