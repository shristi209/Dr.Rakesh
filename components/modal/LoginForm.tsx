import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Lock } from 'lucide-react';
import axios from 'axios';

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const validateForm = () => {
    const validationErrors: Record<string, string> = {};

    if (!formData.email.trim()) validationErrors.email = 'Email is required.';
    if (!formData.password) validationErrors.password = 'Password is required.';

    return validationErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setGeneralError(null);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post('/api/login', {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        const { token, user } = response.data;
        if (user?.role === 'admin') {
          router.push('/');
          window.location.reload();
      } else {
          router.push('/'); 
      }
      }
    } catch (error: any) {
      setGeneralError(error.response?.data?.message || 'Error during login');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {[
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email',
          icon: <User className="text-gray-500" />,
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Password',
          icon: <Lock className="text-gray-500" />,
        },
      ].map(({ name, type, placeholder, icon }) => (
        <div key={name}>
          <div className="flex items-center space-x-2">
            {icon}
            <input
              type={type}
              name={name}
              placeholder={placeholder}
              value={(formData as any)[name]}
              onChange={handleChange}
              className={`border p-2 rounded w-full ${
                errors[name] ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          </div>
          {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
        </div>
      ))}

      <button
        type="submit"
        className="w-full p-2 rounded bg-emerald-600 text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Logging In...' : 'Log In'}
      </button>

      {generalError && <p className="text-red-500 text-center mt-2">{generalError}</p>}
    </form>
  );
};

export default LoginForm;
