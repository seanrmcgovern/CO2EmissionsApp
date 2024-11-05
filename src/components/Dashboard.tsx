import React from 'react';
import TableContainer from './TableContainer';
import GraphsContainer from './GraphsContainer';
import styles from '../styles/Dashboard.module.css';

const Dashboard: React.FC = () => {

    return (
        <div className={styles.dashboardContainer}>
          <h1>CO2 Emissions Dashboard</h1>
          <div className={styles.contentContainer}>
              <div className={styles.tableContainer}>
                  <TableContainer />
              </div>
              <div className={styles.chartContainer}>
                  <GraphsContainer />
              </div>
          </div>
      </div>
    );
};

export default Dashboard;
