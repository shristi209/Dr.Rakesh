// components/Modal.tsx
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
  const [isLogin, setIsLogin] = useState(true);

  const switchToLogin = () => setIsLogin(true);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded shadow-md w-96 relative">
        <h2 className="text-2xl mb-6 text-center">
          {isLogin ? 'Log In' : 'Sign Up'}
        </h2>

        {isLogin ? <LoginForm /> :  <SignUpForm switchToLogin={switchToLogin} />}

        <p className="mt-4 text-center">
          {isLogin ? (
            <>
              Don&apos;t have an account?{' '}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => setIsLogin(false)}
              >
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => setIsLogin(true)}
              >
                Log in
              </span>
            </>
          )}
        </p>

        <p className="text-gray-600 mb-4">
          Don&apos;t miss out on our latest updates and exclusive offers!
        </p>

        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-600"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Modal;
