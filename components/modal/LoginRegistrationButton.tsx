'use client';

import React, { useState, useEffect, MouseEvent as ReactMouseEvent } from 'react';
import { Button } from '@/components/ui/button';
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


    return (
        <>
            {isLoggedIn ? (
                <ProfileButton title={'Dashboard'} link={'/admin'}/>
            ) : (
                <>
                    <Button
                        className="hidden flex items-center rounded-md text-emerald-600 border-[1px] border-emerald-900 hover:bg-emerald-50 font-bold"
                        onClick={(e: ReactMouseEvent<HTMLButtonElement>) => {
                            e.preventDefault();
                            openModal();
                        }}
                    >
                        {/* <User/> */}
                        <span>Sign In</span>
                    </Button>
                    <Modal isOpen={isModalOpen} closeModal={closeModal} />
                </>
            )}
        </>
    );
};

export default LoginRegisterButton;
