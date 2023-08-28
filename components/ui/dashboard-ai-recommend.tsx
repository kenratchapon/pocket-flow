"use client"
import React, { useState, useEffect } from 'react';
import { OpenAIApi, Configuration } from 'openai';
import ReactLoading from 'react-loading';

interface DashboardAIProps {
  title: string;
  dataIncome: any[];
  dataExpense: any[];
}

export const DashboardAI: React.FC<DashboardAIProps> = ({
  title,
  dataIncome,
  dataExpense,
}) => {
  const [recommendation, setRecommendation] = useState<string>('');

  useEffect(() => {
    const generateRecommendation = async () => {
      // Prepare input prompt for the AI
      const prompt = `ช่วยแนะนำการการวางแผนทางการเงินให้สอดคล้องกับข้อมูลการนี้มา 120 char`;

      // Combine data into a single array for simplicity (you might need a different approach)
      const allData = { Income: dataIncome, Expense: dataExpense }

      // Prepare data for the AI
      const dataAsString = JSON.stringify(allData);

      // Set up the OpenAI API
      const configuration = new Configuration({
        apiKey: process.env.NEXT_PUBLIC_OPEN_AI_API_KEY,
      });

      const openaiInstance = new OpenAIApi(configuration);

      // Call GPT-3.5 to generate recommendation

      try {
        const response = await openaiInstance.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [{ role: 'system', content: 'financial assistance' }, { role: 'user', content: prompt + dataAsString }],
          
        } as any);

        const responseData = response.data;
      
        // Check if responseData.choices is defined and not empty
        if (responseData.choices && responseData.choices.length > 0) {
          const recommendationContent = responseData.choices[0].message?.content || '';
          setRecommendation(recommendationContent);
        } else {
          console.error('No recommendation generated.');
        }
      } catch (error) {
        console.error('Error generating recommendation:', error);
      }
    };

    generateRecommendation();
  }, [dataIncome, dataExpense]);

  return (
    <div className='h-full w-full p-4'>
      <h1 className='font-semibold'>{title}</h1>
      {recommendation === ''
      ? <div className='flex flex-row justify-center items-center h-full'>
          <ReactLoading color={'#9bd861'} height={64} width={64} />
        </div>
      : ( // Conditionally render the recommendation section
        <div className='flex flex-row'>
          <p>{recommendation}</p>
        </div>
      )}
    </div>
  );
};
