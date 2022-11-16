require('dotenv').config();
const { log } = require('console');
const R6API = require('r6api.js').default;
const email = process.env.UBI_EMAIL;
const password = process.env.UBI_PASSWORD
const r6api = new R6API({ email, password });


class StatsController {
  static async getAvatar(req, res) {
    try {
      const { username, platform } = req.body;
      const [{ avatar }] = await r6api.findByUsername(platform, username);

      const avatar146 = (Object.values(avatar)[0]);
      const avatar256 = (Object.values(avatar)[1]);
      const avatar500 = (Object.values(avatar)[2]);

      res.status(200).json({ avatar146, avatar256, avatar500 });
    } catch (error) {
     return res.status(404).json({ message: 'Player not found' });
    }
  }
  static async findByUsername(req, res) {
    try {
      const { username, platform } = req.body;
      const user = await r6api.findByUsername(platform, username);

      if (!user.length) return res.status(404).json({ message: 'Player not found' });

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async getGeneralStats(req, res) {
    try {
      const { username, platform } = req.body;

      const { 0: player } = await r6api.findByUsername(platform, username);
      const { 0: stats } = await r6api.getStats(platform, player.id);
      const { pvp: { general } } = stats;

      if (!stats) return 'Stats not found';
      if (!player) return res.status(404).json({ message: 'Player not found' });

      res.status(200).json(general);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async getRankStats(req, res) {
    try {
      const { username, platform } = req.body;

      const { 0: player } = await r6api.findByUsername(platform, username);
      const { 0: seasons  } = await r6api.getRanks('uplay', player.id, { regionIds: 'ncsa', boardIds: 'pvp_ranked', seasonIds: -1 })
      const { 0: stats } = await r6api.getStats(platform, player.id);
      const { 0: level } = await r6api.getProgression(platform, player.id);
      const { pvp: { general } } = stats;
      const season = (Object.values(seasons)[1]);
      const regions = (Object.values(season)[0]);
      const ncsa = (Object.values(regions)[5])
      const boards = (Object.values(ncsa)[0])
      const pvp_ranked = (Object.values(boards)[2])
      const rank = (Object.values(pvp_ranked)[0])
      

      if (!player) return res.status(404).json({ message: "Player not found"});

      res.status(200).json({rank, general, level, regions});
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async getStatsByOperator(req, res) {
    const { username, platform } = req.body;
    const { id } = req.params
    try {


      const { 0: player } = await r6api.findByUsername(platform, username);
      const { 0: stats } = await r6api.getStats(platform, player.id);
      const { pvp: { operators } } = stats;
      const result = Object.values(operators)

      if (!player) return res.status(404).json({ message: "Player not found"});
      

      res.status(200).json({ operators: result[id] });
    } catch (error) {
      console.log(username, platform, id);
      res.status(500).json(error);
    }
  }
}

module.exports = StatsController;
