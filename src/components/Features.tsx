
import { motion } from 'framer-motion';
import { getColors, useTheme } from "../components/ThemeToggle";
import { FEATURES } from '../constants';


const Features = () => {
     const { theme } = useTheme();
  const colors = getColors(theme);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold text-center mb-12 sm:mb-16 px-4"
          style={{ color: theme === 'dark' ? colors.lightText : colors.darkText }}
        >
          Our Features
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="backdrop-blur border rounded-2xl p-8 transition"
              style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3
                className="text-2xl font-bold mb-3"
                style={{ color: theme === 'dark' ? colors.lightText : colors.darkText }}
              >
                {feature.title}
              </h3>
              <p style={{ color: colors.mutedText }}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
  )
}

export default Features
