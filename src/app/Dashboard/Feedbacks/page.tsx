'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GetAllFeedbback } from '../../../../lib/feedbak';
import AdminAsideDashboard from '../../../../Components/Admin_Aside_Dashbar/page';

interface Feedback {
  subject: string;
  name: string;
  contactEmail: string;
  message: string;
}

const FeedbackTable: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const data = await GetAllFeedbback();
        setFeedbacks(data); // Directly set data
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
        setError('Failed to fetch feedbacks. Check console for details.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchFeedbacks();
  }, []);
  

  if (loading) return <p>Loading feedbacks...</p>;
  if (error) return <p>{error}</p>;

  return (

    <div  className='flex'>
        <AdminAsideDashboard/>
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Feedback List</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Subject</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Message</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback, index) => (
            <tr key={index} className="border border-gray-300">
              <td className="border border-gray-300 p-2">{feedback.subject}</td>
              <td className="border border-gray-300 p-2">{feedback.name}</td>
              <td className="border border-gray-300 p-2">{feedback.contactEmail}</td>
              <td className="border border-gray-300 p-2">{feedback.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    </div>
  );
};

export default FeedbackTable;