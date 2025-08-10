import React from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
  hoverable?: boolean
  onClick?: () => void
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hoverable = false, 
  onClick 
}) => {
  const baseClasses = 'bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-600 p-6'
  const hoverClasses = hoverable ? 'cursor-pointer transition-all duration-200' : ''
  
  const classes = [baseClasses, hoverClasses, className].join(' ')

  if (hoverable) {
    return (
      <motion.div
        className={classes}
        onClick={onClick}
        whileHover={{ scale: 1.02, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  )
}

export default Card 