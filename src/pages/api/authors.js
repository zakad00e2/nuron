export default async function handler(req, res) {
    const { locale = 'en' } = req.query;
    try {
        const response = await fetch(`https://books-blog-production-7ac3.up.railway.app/api/authors?locale=${locale}&populate=photo`);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching authors from API:", error);
        res.status(500).json({ error: 'Failed to fetch authors' });
    }
}
