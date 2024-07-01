import React, { useRef } from 'react'
import { Bar, getElementAtEvent } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import styles from './style.module.scss';
Chart.register(...registerables);

export default function index({ title, data, groupBy, onFilterChange }) {

    const groupData = data.reduce((acc, item) => {
      const key = groupBy === 'ageGroup' 
        ? item.age < 24 
          ? 'moins de 24 ans' 
          : item.age <= 28 
          ? '24 à 28 ans' 
          : '29 ans et +'
        : item[groupBy];
      if (!acc[key]) acc[key] = 0;
      acc[key]++;
      return acc;
    }, {});
    
    const chartData = {
      labels: Object.keys(groupData),
      datasets: [
        {
          label: 'Quantité',
          data: Object.values(groupData),
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
        },
      ],
    };

    const chartRef = useRef();
    const updateFilters = (event) => {
      // console.log(getElementAtEvent(chartRef.current, event));
      const clickedElement = getElementAtEvent(chartRef.current, event);
      if (clickedElement.length > 0) {
        const dataIndex = clickedElement[0].index;
        const xTitle = chartData.labels[dataIndex];
        onFilterChange(groupBy, xTitle);
        console.log(`title: ${xTitle}`);
      }
    }
    

    return (
        <div className={styles.chartContainer}>
            <h3>{title}</h3>
            <Bar ref={chartRef} data={chartData} onClick={updateFilters} />
        </div>
    )
}
