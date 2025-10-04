"use client";
import React, { useEffect } from 'react'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer';
import { Button } from './ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';
import { accountSchema } from '@/app/lib/schema';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import useFetch from '@/hooks/use-fetch';
import { Loader2 } from 'lucide-react';
import { createAccount } from '@/actions/dashboard';
import { toast } from 'sonner';

const CreateAccountDrawer = ({ children }) => {
    const [open, setOpen] = React.useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset } = useForm({
            resolver: zodResolver(accountSchema),
            defaultValues: {
                name: '',
                type: 'CURRENT',
                balance: 0,
                isDefault: false,
            },
        })

        const { 
            data:newAccount , 
            loading: createAccountLoading , 
            error, 
            fn: createAccountFn } = useFetch(createAccount);
        
        const onSubmit = async (data) => {
            await createAccountFn(data);
        }
        useEffect(() =>{
            if (newAccount) {
                toast.success("Account Created Successfully");
                reset();
                setOpen(false);
            }
        }, [newAccount, reset]);

        useEffect(()=>{
            if(error){
                toast.error(error.message || "Failed to create account");
            }
        }, [error]);

        
    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>{children}</DrawerTrigger>
            <DrawerContent className={'pb-10'}>
                <DrawerHeader>
                    <DrawerTitle>Create New Account</DrawerTitle>
                </DrawerHeader>

                <div className='px-4 pb-4'>
                    <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
                        <div className='space-y-2'>
                            <label htmlFor="name" className='text-sm font-medium'>
                                Account Name
                            </label>
                            <Input id="name"
                                placeholder="e.g. My Savings Account"
                                {...register('name')}
                            />
                            {errors.name &&
                                <p className='text-red-500 text-sm'>
                                    {errors.name.message}
                                </p>}
                        </div>

                        <div className='space-y-2'>
                            <label htmlFor="name" className='text-sm font-medium'>
                                Account Type
                            </label>
                            <Select onValueChange={(value) => setValue('type', value)} 
                            defaultValue={watch('type')}>
                                <SelectTrigger id="type" className='w-full'>
                                    <SelectValue placeholder="Select Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="CURRENT">Current</SelectItem>
                                    <SelectItem value="SAVINGS">Savings</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.type &&
                                <p className='text-red-500 text-sm'>
                                    {errors.type.message}
                                </p>}
                        </div>


                         <div className='space-y-2'>
                            <label htmlFor="balance" className='text-sm font-medium'>
                                Initial Balance
                            </label>
                            <Input id="balance"
                            type="number"
                            step="0.01"
                            placeholder="e.g. 1000"
                                {...register('balance')}
                            />
                            {errors.balance &&
                                <p className='text-red-500 text-sm'>
                                    {errors.balance.message}
                                </p>}
                        </div>


                        <div className='flex items-center rounded-lg border p-3'>
                            <div className='space-y-0.5'>
                                <label htmlFor="name" className='text-sm font-medium'>
                                    Set as Default
                                </label>
                                <p className='text-sm text-muted-foreground'>
                                    This account will be selected as Default for Transactions
                                </p>
                            </div>
                            <Switch className={'ml-auto'}
                                id='isDefault'
                                onCheckedChange={(checked) => setValue('isDefault', checked)} 
                            checked={watch('isDefault')}
                                />  
                        </div>

                        <div className='flex gap-4 mt-4'>
                            <DrawerClose asChild>
                                <Button type='button' variant={'outline'} className='flex-1' >
                                 Cancel    
                                </Button>
                            </DrawerClose>

                            <Button type='submit' className='flex-1'  disabled={createAccountLoading}>
                                {createAccountLoading ? <>
                                <Loader2 className='mr-2 h-4 w-4  animate-spin'/>
                                Creating..  </> : ('Create Account')}
                            </Button>
                        </div>


                    </form>
                </div>

            </DrawerContent>
        </Drawer>
    )
}

export default CreateAccountDrawer;