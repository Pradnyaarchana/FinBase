import { getAccountWithTransactions } from '@/actions/accounts';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';
import { AccountChart } from '../_components/account-chart';
import TransactionTable from '../_components/transaction_table';
import { BarLoader } from 'react-spinners';
import { BudgetProgress } from '../../dashboard/_components/budget-progress';

const AccountsPage = async ({ params }) => {

    const accountData = await getAccountWithTransactions(params.id);
    if (!accountData) {
        notFound();
    }

    const { transactions, ...account } = accountData;

    return (
        <div className='px-5 space-y-8' >
            <div className='flex gap-4 items-end justify-between'>
                <div>
                    <h1 className='text-4xl sm:text-6xl font-bold tracking-tight gradient-title capitalize'>
                        {account.name}
                    </h1>
                    <p className='text-muted-foreground'>  {account.type.charAt(0) + account.type.slice(1).toLowerCase()} account</p>
                </div>

                <div className='text-right pb-2'>
                    <div className='text-xl sm:text-2xl font-bold'>
                        ${parseFloat(account.balance).toFixed(2)}
                    </div>
                    <p className='text-sm text-muted-foreground'>{account._count.transactions} Transactions</p>
                </div>
            </div>

            {/* Chart Section */}

            <Suspense
                fallback={<BarLoader className='mt-4' color='#2563eb' width={100} height={4} />}>
                <AccountChart transactions={transactions} />
            </Suspense>

            {/* Transaction section */}
            <Suspense
                fallback={<BarLoader className='mt-4' color='#2563eb' width={100} height={4} />}>
                  <TransactionTable transactions={transactions} />
            </Suspense>

            <BudgetProgress
              initialBudget={budgetData?.budget}
              currentExpenses={budgetData?.currentExpense || 0}
            />
        </div>
    )
}

export default AccountsPage;