class chapterController {
    async getChapters(req, res) {
        try {
            const chapters = "exemple de capitole"
            res.status(200).json(chapters);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching chapters', error });
        }
    }
}

module.exports = new chapterController();