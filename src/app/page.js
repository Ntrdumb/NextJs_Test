'use client'
import styles from "./page.module.scss";
import React, { useEffect, useState } from 'react';
import FilterMenu from '@/components/filterMenu/index';
import PriceDisplay from '@/components/priceDisplay/index';
import BarChart from '@/components/barChart/index';
import { motion } from 'framer-motion';
import { introSlide } from '../animations/anim';

export default function Home() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [uniqueValues, setUniqueValues] = useState({
    saisons: [],
    niveaux: [],
    passes: []
  });

  const [filters, setFilters] = useState({
    saison: '',
    niveau: '',
    passe: ''
  });

  //No dependency so it triggers once initially
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        setData(json);
        setUniqueValues({
          saisons: [...new Set(json.map(item => item.saison))],
          niveaux: [...new Set(json.map(item => item.niveau))],
          passes: [...new Set(json.map(item => item.passe))]
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  //Triggers when the filter cahnge
  useEffect(() => {
    let filtered = data;
    if (filters.saison) {
      filtered = filtered.filter(item => item.saison === filters.saison);
    }
    if (filters.niveau) {
      filtered = filtered.filter(item => item.niveau === filters.niveau);
    }
    if (filters.passe) {
      filtered = filtered.filter(item => item.passe === filters.passe);
    }
    setFilteredData(filtered);
  }, [data, filters]);

  //For the dropdown menus
  const handleFilterChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value
    });
  };

  //To reset the filter menus
  const handleResetFilters = () => {
    setFilters({
      saison: '',
      niveau: '',
      passe: ''
    });
  };
  
  const calculateAveragePrice = (data) => {
    //Reduce: Iterate a travers data en ajoutant au prochain, commencant par 0
    const total = data.reduce((accumulate, item) => accumulate + item.prix, 0);
    return total / data.length || 0;
  };

  //No filters, dont use filteredData
  const avgPrice = filters.saison || filters.niveau || filters.passe ? calculateAveragePrice(filteredData) : calculateAveragePrice(data);

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <div className={styles.intro}>
          <motion.p variants={introSlide} animate="enter" initial="initial">Dashboard</motion.p>
          {/* <pre>{JSON.stringify(uniqueValues, null, 2)}</pre> */}
          <FilterMenu onFilterChange={handleFilterChange} uniqueValues={uniqueValues} filters={filters} onResetFilters={handleResetFilters}/>
        </div>
        
        <PriceDisplay avgPrice={avgPrice}/>
      </div>
      
      

      <div className={styles.charts}>
          <BarChart title="Quantité par niveau" data={filteredData} groupBy="niveau" onFilterChange={handleFilterChange} />
          <BarChart title="Quantité par saison" data={filteredData} groupBy="saison" onFilterChange={handleFilterChange} />
          <BarChart title="Quantité par groupe d'âges" data={filteredData} groupBy="ageGroup" onFilterChange={handleFilterChange} />
      </div>
    </main>
  )
}
