"use client";
import { updateDefaultAccount } from '@/actions/accounts';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import useFetch from '@/hooks/use-fetch'; 
import Link from 'next/link';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

const AccountCard = ({ account }) => {
    const { name, type, balance, id, isDefault } = account;

    const {
        loading: updateDefaultLoading,
        fn: updateDefaultFn,
        data: updatedAccount,
        error,
    } = useFetch(updateDefaultAccount);

    const handleDefaultChange = async (event) => {
        event.preventDefault();

        if (isDefault) {
            toast.warning("You need at least one default account");
            return;
        }
        await updateDefaultFn(id);
    };

    useEffect(() => {
        if (updatedAccount?.success) {
            toast.success("Default account updated successfully");
        }
    }, [updatedAccount, updateDefaultLoading]);

     useEffect(() => {
        if (updatedAccount?.success) {
            toast.error(error.message || "Failed to update default account");
        }
    }, [error]);

    return (
        <Card className="hover:shadow-md transition-shadow group relative">
            <Link href={`/account/${id}`}>
                <CardHeader className="flex flex-row justify-between space-y-0 pd-4 text-sm">
                    <CardTitle>{name}</CardTitle>
                    <Switch checked={isDefault}
                        onClick={handleDefaultChange}
                        disabled={updateDefaultLoading}
                    />
                </CardHeader>
                <CardContent className='pt-2 pb-1'>
                    <div className="text-xl font-bold">
                        ${parseFloat(balance).toFixed(2)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {type.charAt(0) + type.slice(1).toLowerCase()} account
                    </p>
                </CardContent>
                <CardFooter className="flex justify-between text-xs text-muted-foreground">
                    <div className="flex items-center">
                        Income
                    </div>
                    <div className="flex items-center">
                        Expense
                    </div>
                </CardFooter>
            </Link>
        </Card>
    );
};

export default AccountCard;