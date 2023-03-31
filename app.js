const getRandomValue = (min,max) => Math.floor(Math.random()*(max-min))+min

const app = Vue.createApp({
    data(){
        return({
            monsterHealth: 100,
            playerHealth: 100,
            currentRound: 0,
        })
    },
    computed: {
        monsterBarStyles(){
            return {width: this.monsterHealth+'%'}
        },
        playerBarStyles(){
            return {width: this.playerHealth+'%'}
        },
        specialAttackDisable(){
            return this.currentRound%3!==0 
        }
    },
    methods: {
        attackMonster(){
            this.monsterHealth -= getRandomValue(5,12)
            this.attackPlayer()
            this.currentRound++
        },
        attackPlayer(){
            this.playerHealth -= getRandomValue(8,15)
        },
        specialAttackMonster(){
            this.monsterHealth -= getRandomValue(10,25)
            this.attackPlayer()
            this.currentRound++
        },
        heal(){
            this.playerHealth += getRandomValue(25,10)
        },
        surrender(){
            this.playerHealth = 0
        }
    }
})

app.mount('#game')