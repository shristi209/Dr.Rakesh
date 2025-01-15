'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import Modal from '@/components/modal/Modal';
import ProfileButton from '../ui/profile';
import Cookies from 'js-cookie';

const LoginRegisterButton: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        const token = Cookies.get('token');
        setIsLoggedIn(!!token);
        console.log(token);
    }, []);

    // const handleSignOut = () => {
    //     Cookies.remove('token');
    //     setIsLoggedIn(false);
    // };

    return (
        <div>
            {isLoggedIn ? (
                <>
                    <ProfileButton />
                </>
            ) : (
                <>
                    <Button
                        className="hidden md:flex items-center rounded  border-[1px] border-emerald-900 hover:bg-emerald-50 font-bold"
                        onClick={(e) => {
                            e.preventDefault();
                            openModal();
                        }}
                    >
                        <User className="h-4 w-4" />
                        <span>Sign In</span>
                    </Button>
                    <Modal isOpen={isModalOpen} closeModal={closeModal} />
                </>
            )}
        </div>
    );
};

export default LoginRegisterButton;
