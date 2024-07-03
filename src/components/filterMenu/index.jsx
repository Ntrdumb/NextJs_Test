import React from 'react';
import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { filterSlide } from '../../animations/anim';

export default function FilterMenu({ onFilterChange, uniqueValues, filters, onResetFilters  }) {
    const selectOptions = ['Saisons', 'Niveaux', 'Passes'];
    
    return (
        <motion.div className={styles.filters}>
            <motion.select variants={filterSlide} animate="enter" initial="initial" value={filters.saison} onChange={(e) => onFilterChange('saison', e.target.value)} custom={0}>
                <option value="">Saisons</option>
                {uniqueValues.saisons.map(saison => (
                <option key={saison} value={saison}>{saison}</option>
                ))}
            </motion.select>

            <motion.select variants={filterSlide} animate="enter" initial="initial" value={filters.niveau} onChange={(e) => onFilterChange('niveau', e.target.value)} custom={1}>
                <option value="">Niveaux</option>
                    {uniqueValues.niveaux.map(niveau => (
                <option key={niveau} value={niveau}>{niveau}</option>
                ))}
            </motion.select>

            <motion.select variants={filterSlide} animate="enter" initial="initial" value={filters.passe} onChange={(e) => onFilterChange('passe', e.target.value)} custom={2}>
                <option value="">Passes</option>
                {uniqueValues.passes.map(passe => (
                <option key={passe} value={passe}>{passe}</option>
                ))}
            </motion.select>
            
            <motion.button variants={filterSlide} animate="enter" initial="initial" onClick={onResetFilters}  custom={3}>Reset</motion.button>
        </motion.div>
    );
};
