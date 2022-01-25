# start frontend
npm run dev --prefix frontend

# start backend
ENVIRONMENT=development php -d variables_order=EGPCS -S localhost:7000 -t backend/public
