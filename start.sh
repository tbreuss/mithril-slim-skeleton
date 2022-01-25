cd backend
ENVIRONMENT=development php -d variables_order=EGPCS -S localhost:7000 -t public

cd ../frontend
npm run dev
