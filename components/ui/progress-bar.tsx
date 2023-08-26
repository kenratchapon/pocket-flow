"use client"
import React from 'react';
import ProgressBar from "@ramonak/react-progress-bar";

interface ProgressBarProps {
    title: string;
    data: any[];
}

const ProgressBarExpense: React.FC<ProgressBarProps> = ({
    title,
    data
}) => {
    const categoryMap = new Map();
    let totalAmount = 0;

    data.forEach(item => {
        const categoryName = item.category.name;
        totalAmount += item.amount;

        if (categoryMap.has(categoryName)) {
            categoryMap.set(categoryName, {
                accumulatedAmount: categoryMap.get(categoryName).accumulatedAmount + item.amount,
                totalAmount: categoryMap.get(categoryName).totalAmount + item.amount
            });
        } else {
            categoryMap.set(categoryName, {
                accumulatedAmount: item.amount,
                totalAmount: item.amount
            });
        }
    });

    const categoryArray = Array.from(categoryMap, ([name, { accumulatedAmount, totalAmount }]) => ({
        name,
        accumulatedAmount,
        totalAmount
    }));

    const sortedCategories = categoryArray
        .sort((a, b) => b.accumulatedAmount - a.accumulatedAmount)
        .slice(0, 5);

    const progressBarColors = ['#ED7B7B', '#ff9800', '#2196f3', '#e91e63', '#9c27b0'];

    return (
        <div className='p-4'>
            <h1 className='font-semibold'>{title}</h1>
            {sortedCategories.map((category, index) => (
                <div className='mt-4' key={category.name}>
                    <div className='flex flex-row justify-between'>
                        <p>{category.name}</p>
                        <p>{category.accumulatedAmount}฿</p>
                    </div>
                    <ProgressBar
                        completed={category.accumulatedAmount}
                        maxCompleted={totalAmount}
                        bgColor={progressBarColors[index % progressBarColors.length]}
                        baseBgColor="#f1f1f1"
                        isLabelVisible={false}
                    />
                </div>
            ))}
        </div>
    );
}

export default ProgressBarExpense;
