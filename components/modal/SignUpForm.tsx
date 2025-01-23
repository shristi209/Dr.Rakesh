import React, { useState } from 'react';
import { User, Mail, Lock, CheckCircle } from 'lucide-react';
import axios from 'axios';

const SignUpForm: React.FC<{ switchToLogin: () => void }> = ({ switchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); // Clear specific field error
  };

  const validateForm = () => {
    const validationErrors: Record<string, string> = {};

    if (!formData.name.trim()) validationErrors.name = 'Name is required.';
    if (!formData.email.trim()) validationErrors.email = 'Email is required.';
    if (!formData.password) validationErrors.password = 'Password is required.';
    if (formData.password && formData.password.length < 3) {
      validationErrors.password = 'Password must be at least 3 characters.';
    }
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match.';
    }

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
      const response = await axios.post('/website/api/signup', {
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });

      if (response.status === 200) {
        switchToLogin();
      }
    } catch (err: any) {
      if (err.response && err.response.status === 400) {
        setGeneralError(err.response.data.message || 'This email is already signed up.');
      } else {
        setGeneralError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {[
        {
          name: 'name',
          type: 'text',
          placeholder: 'Full Name',
          icon: <User className="text-gray-500" />,
        },
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email',
          icon: <Mail className="text-gray-500" />,
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Password',
          icon: <Lock className="text-gray-500" />,
        },
        {
          name: 'confirmPassword',
          type: 'password',
          placeholder: 'Confirm Password',
          icon: <CheckCircle className="text-gray-500" />,
        },
      ].map(({ name, type, placeholder, icon }) => (
        <div key={name}>
          <div className="flex items-center space-x-2">
            {icon}
            <input
              type={type}
              name={name}
              placeholder={placeholder}
              value={(formData as any)[name] || ''}
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
        {isSubmitting ? 'Signing Up...' : 'Sign Up'}
      </button>

      {generalError && <p className="text-red-500 text-center mt-2">{generalError}</p>}
    </form>
  );
};

export default SignUpForm;
