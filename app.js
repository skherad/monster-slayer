const getRandomValue = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      currentRound: 0,
      winner: null,
      battleLog: [],
    };
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        //draw
        this.winner = "draw";
      } else if (value <= 0) {
        //gameover
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        //draw
        this.winner = "draw";
      } else if (value <= 0) {
        //won
        this.winner = "player";
      }
    },
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        this.monsterHealth = 0;
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        this.playerHealth = 0;
      }
      return { width: this.playerHealth + "%" };
    },
    specialAttackDisable() {
      return this.currentRound % 3 !== 0;
    },
  },
  methods: {
    attackMonster() {
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.currentRound++;
      this.addLogMsg("Player", "Attack", attackValue);
    },
    attackPlayer() {
      this.playerHealth -= getRandomValue(8, 15);
    },
    specialAttackMonster() {
      const specialAttackValue = getRandomValue(10, 25);
      this.monsterHealth -= specialAttackValue;
      this.attackPlayer();
      this.currentRound++;
      this.addLogMsg("Player", "Special Attack", specialAttackValue);
    },
    healPlayer() {
      const healValue = getRandomValue(8, 20);
      this.playerHealth += healValue;
      if (this.playerHealth > 100) {
        this.playerHealth = 100;
      }
      this.attackPlayer();
      this.currentRound++;
      this.addLogMsg("Player", "Heal", healValue);
    },
    surrender() {
      this.winner = "monster";
    },
    newGame() {
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.battleLog = [];
    },
    addLogMsg(who, what, value) {
      this.battleLog.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

app.mount("#game");
