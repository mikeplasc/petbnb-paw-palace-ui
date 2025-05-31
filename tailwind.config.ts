
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#ff6b35',
					foreground: '#ffffff',
					50: '#fff4f1',
					100: '#ffe6dd',
					200: '#ffd1bb',
					300: '#ffb088',
					400: '#ff8754',
					500: '#ff6b35',
					600: '#f04e1a',
					700: '#c73e16',
					800: '#a43418',
					900: '#872f19'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Petbnb colors - actualizados para coincidir con el logo
				petbnb: {
					50: '#fff8f5',
					100: '#fff0e8',
					200: '#ffdcc7',
					300: '#ffc29f',
					400: '#ff9b6b',
					500: '#ff6b35',
					600: '#f04e1a',
					700: '#c73e16',
					800: '#a43418',
					900: '#872f19'
				},
				// Colores azules del logo
				accent: {
					50: '#f0f8ff',
					100: '#e0f0fe',
					200: '#bae1fd',
					300: '#7cc8fc',
					400: '#36adf8',
					500: '#0c93e9',
					600: '#0075c7',
					700: '#015da1',
					800: '#064f85',
					900: '#0b426e'
				},
				warm: {
					50: '#fff8f5',
					100: '#fff0e8',
					200: '#ffdcc7',
					300: '#ffc29f',
					400: '#ff9b6b',
					500: '#ff6b35',
					600: '#f04e1a',
					700: '#c73e16',
					800: '#a43418',
					900: '#872f19'
				},
				sage: {
					50: '#f6f7f6',
					100: '#e3e7e3',
					200: '#c7d2c7',
					300: '#a3b4a3',
					400: '#7d957d',
					500: '#627862',
					600: '#4d5f4d',
					700: '#404f40',
					800: '#374137',
					900: '#2f372f'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out'
			},
			fontFamily: {
				sans: ['Inter', 'ui-sans-serif', 'system-ui'],
				nunito: ['Nunito', 'ui-sans-serif', 'system-ui']
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
