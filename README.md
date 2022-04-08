
# What is this!

Ok, for anyone dealing with the highly breaking "No more permanent Attachment URLs" update, I've come up with a solution for our workflow, and I'm happy to share it:

Here's a video walkthrough: https://www.loom.com/share/1fae8efd5d8a41088359b05d18be13f4 
 
Here's a short writeup — anyone feel free to build this into a real app or service. If you want more personalized help/support, DM me and I'll see what I can do.


For those new to IPFS (https://ipfs.io/), it's like a decentralized file database. Whatever you upload to IPFS will persist for a very long time, and it's impossible to revoke access. Basically, Airtable Attachments' current functionality (which we want to keep).


To start, I copied the script "Convert attachments to URLs" to get URLs to each files in an Attachment field, then I created a small app that uploads the images to IPFS, using Infura's IPFS gateway.


The app is here: https://svelte-ipfs-add-from-url-production-5cde.up.railway.app/ You can paste a bunch of image and attachment URLs and it'll upload.


The code for the server upload piece is here. Feel free to re-use. It's a node/sveltekit app: https://github.com/janzheng/svelte-ipfs-add-from-url.
It's all unlicensed — feel free to do what you wish with it! Good luck. Reply or DM if you need more help


## Prototype App

The prototype is deployed on Railway.app here: https://svelte-ipfs-add-from-url-production-5cde.up.railway.app/ I couldn't use Vercel for this b/c the IPFS dependency requires Node 16, which isn't supported by AWS Lambdas (which Vercel and some other serverless run on). 

Haven't tried this on Cloudflare Workers but it should probably work the same. Not sure if they support Node 16.


## For the actual Airtable Script...

Check out the airtable-script.js file. Copy this into a new Airtable Script and run it.