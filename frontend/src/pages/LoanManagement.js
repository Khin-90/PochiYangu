import React, { useEffect, useState } from 'react';
import '../styles/LoanManagement.css';
// Uncomment and configure for Supabase usage:
// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = 'YOUR_SUPABASE_URL';
// const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
// const supabase = createClient(supabaseUrl, supabaseAnonKey);

function LoanManagement() {
  // Hardcoded data for demonstration:
  const [personalLoan, setPersonalLoan] = useState({
    amount: 2000,
    status: 'Approved',
    nextPayment: '10 Jan 2023',
    paymentAmount: 500
  });
  const [businessLoan, setBusinessLoan] = useState({
    amount: 5000,
    status: 'Pending',
    nextPayment: '15 Feb 2023',
    paymentAmount: 500
  });

  // For demonstration of "repayment schedule" and "distribution"
  const [repaymentSchedule, setRepaymentSchedule] = useState([
    { date: '10 Jan 2023', amount: 500 },
    { date: '15 Feb 2023', amount: 500 },
    { date: '15 Mar 2023', amount: 500 },
  ]);

  // Example effect if you want to fetch from Supabase in the future:
  /*
  useEffect(() => {
    const fetchData = async () => {
      let { data, error } = await supabase.from('loans').select('*');
      if (!error) {
        // Example of how you might parse data
        // setPersonalLoan(data.personalLoan);
        // setBusinessLoan(data.businessLoan);
        // setRepaymentSchedule(data.repaymentSchedule);
      } else {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  */

  return (
    <div className="loan-management-container">
      <header className="loan-management-header">
        <h1>Pochi Yangu</h1>
        <nav>
          <a href="#apply">Apply for a Loan</a>
          <a href="#status">Loan Management</a>
          <a href="#repayments">Cross-border Payments</a>
        </nav>
      </header>

      {/* APPLY FOR A LOAN */}
      <section id="apply" className="loan-application-section">
        <h2>Apply for a Loan</h2>
        <div className="loan-options">
          <div className="loan-option-card">
            <h3>Personal Loan</h3>
            <p>Apply for a personal loan up to $50,000 with flexible repayment options.</p>
            <button className="apply-button">Apply Now</button>
          </div>
          <div className="loan-option-card">
            <h3>Business Loan</h3>
            <p>Finance your business growth with a loan up to $100,000.</p>
            <button className="apply-button">Apply Now</button>
          </div>
        </div>
      </section>

      {/* LOAN STATUS */}
      <section id="status" className="loan-status-section">
        <h2>Loan Status</h2>
        <div className="loan-status-card">
          <h3>Your Active Loans</h3>
          <div className="status-row">
            <span>Personal Loan:</span> 
            <span>${personalLoan.amount}</span> 
            <span className={`status-label ${personalLoan.status.toLowerCase()}`}>
              {personalLoan.status}
            </span>
          </div>
          <div className="status-row">
            <span>Business Loan:</span> 
            <span>${businessLoan.amount}</span> 
            <span className={`status-label ${businessLoan.status.toLowerCase()}`}>
              {businessLoan.status}
            </span>
          </div>
        </div>
      </section>

      {/* MANAGE REPAYMENTS */}
      <section id="repayments" className="manage-repayments-section">
        <h2>Manage Repayments</h2>
        <div className="repayments-grid">
          <div className="repayment-schedule">
            <h3>Repayment Schedule</h3>
            <ul>
              {repaymentSchedule.map((item, index) => (
                <li key={index}>
                  <span>{item.date}</span>
                  <span>${item.amount}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="repayment-distribution">
            <h3>Repayment Distribution</h3>
            {/* This is just a placeholder for a chart. 
                You can integrate a chart library like Chart.js or Recharts */}
            <div className="chart-placeholder">
              <p>Pie Chart Placeholder</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="loan-management-footer">
        <p>Contact us at <strong>support@pochiyangu.com</strong> or call us at <strong>+123-456-7890</strong></p>
        <p>Follow us on social media for updates and news.</p>
      </footer>
    </div>
  );
}

export default LoanManagement;
