# Primo Server

This project lets you run Primo on your own server so you have full control over your own data and can edit your sites from any device, as well as invite others to collaborate. 

At this stage, we're relying heavily on external services (Vercel for hosting, Supabase for backend) to make deployment as easily as possible. But it would also be relatively easy to replace those services with your own infastructure, should you prefer that. 

If you're just building websites for yourself, you may prefer just using Primo Desktop. This project allows you to run Primo on a server so that you can access and edit your sites from any device and invite other developers and content editors to collaborate on them with you. 

## Project Status

Primo Server is in Alpha while we iron out the kinks and figure out the best way to set things up. 

## How it works

Primo Server deploys to Vercel and uses Supabase for authentication, database (PostgresSQL), and storage. 

If you have any ideas or time to contribute, feel free to open an issue or come talk to us in the [primo Discord](https://discord.gg/vzSFTS9). 

## Setup 
1. Create a .env file with `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLIC_KEY`. If deploying to Vercel or elsewhere, ensure you add those as environment variables while deploying. 
2. Set the output directory to `build`