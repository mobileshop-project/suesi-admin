module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
				'Poppins': ['Poppins', ''],
				'PoppinsBold': ['PoppinsBold'],
				'PoppinsMedium': ['PoppinsMedium']
			},
			fontSize: {
				'super-small': '10px',
				'small': '12px',
				'slight': '14px',
				'medium': '16px',
				'primary': '18px',
				'large': '22px',
				'sub-header': '24px',
				'header': '28px',
			}
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
