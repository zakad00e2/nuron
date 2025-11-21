const fetch = require('node-fetch'); // Or just global fetch if node 18+

async function testApi() {
    const locale = 'en';
    const apiUrl = `https://books-blog-production-7ac3.up.railway.app/api/books?locale=${locale}&populate=cover`;
    console.log(`Fetching from: ${apiUrl}`);
    try {
        const response = await fetch(apiUrl);
        console.log(`Status: ${response.status}`);
        if (!response.ok) {
            console.error(`Error: ${response.statusText}`);
            return;
        }
        const data = await response.json();
        console.log("Data received:");
        console.log(JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Fetch failed:", error);
    }
}

testApi();
