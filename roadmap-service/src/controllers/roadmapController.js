class chapterController {
    async getRoadmap(req, res) {
        try {
            const chapterId = req.params.id;
            // Replace this with your actual logic to fetch levels for the chapter
            const levels = [
                { level: 1, name: "Level 1", chapterId },
                { level: 2, name: "Level 2", chapterId }
            ];
            res.status(200).json(levels);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching levels', error });
        }
    }
}

module.exports = new chapterController();