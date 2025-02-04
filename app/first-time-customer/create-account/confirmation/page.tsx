import React from 'react';

interface ConfirmationProps {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    onConfirm: () => void;
    onEdit: () => void;
}

const ConfirmationPage: React.FC<ConfirmationProps> = ({ firstName, lastName, email, phone, address, onConfirm, onEdit }) => {
    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Confirm Your Information</h1>
            <div className="mb-4">
                <p><strong>First Name:</strong> {firstName}</p>
                <p><strong>Last Name:</strong> {lastName}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Phone:</strong> {phone}</p>
                <p><strong>Address:</strong> {address}</p>
            </div>
            <div className="flex justify-between">
                <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400" onClick={onEdit}>Edit</button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={onConfirm}>Confirm</button>
            </div>
        </div>
    );
};

export default ConfirmationPage;