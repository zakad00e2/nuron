export default async function handler(req, res) {
    const { locale = 'en' } = req.query;
    console.log(`API Route called with locale: ${locale}`);
    try {
        const apiUrl = `https://brilliant-boot-036dae9a94.strapiapp.com/api/books?locale=${locale}&populate=cover`;
        console.log(`Fetching from external API: ${apiUrl}`);
        const response = await fetch(apiUrl);
        if (!response.ok) {
            console.error(`External API error: ${response.status} ${response.statusText}`);
            throw new Error(`External API error: ${response.status}`);
        }
        const data = await response.json();
        console.log("External API data received:", JSON.stringify(data).substring(0, 200) + "...");
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching books from API:", error);
        res.status(500).json({ error: 'Failed to fetch books' });
    }
}
