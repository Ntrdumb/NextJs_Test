import React from 'react'
import styles from './style.module.scss'
import { motion } from 'framer-motion';
import { priceOpac } from '../../animations/anim';

export default function index({ avgPrice }) {
  return (
    <motion.div variants={priceOpac} animate="enter" initial="initial" className={styles.avgPrice}>
      <h2>• Prix moyen: {avgPrice.toFixed(2)} $</h2>
    </motion.div>
  )
}
