export default async function handler(req, res) {
    const { locale = 'en' } = req.query;
    try {
        const response = await fetch(`https://brilliant-boot-036dae9a94.strapiapp.com/api/publishing-houses?locale=${locale}&populate=Logo`);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching publishers from API:", error);
        res.status(500).json({ error: 'Failed to fetch publishers' });
    }
}
