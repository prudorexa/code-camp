/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
	  "./src/**/*.{js,jsx,ts,tsx}", // Adjust paths based on your file structure
	  "./pages/**/*.{js,jsx,ts,tsx}",
	  "./components/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
	  extend: {
		colors: {
			'custom-blue': '#1DA1F2',
			'custom-gray': '#F5F5F5',
		  },
	  },
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
	  ],
	  // tailwind.config.js
    darkMode: 'class', 

	  };
  