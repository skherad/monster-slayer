const getRandomValue = (min,max) => Math.floor(Math.random()*(max-min))+min

const app = Vue.createApp({
    data(){
        return({
            monsterHealth: 100,
            playerHealth: 100,
            currentRound: 0,
            winner: null
        })
    },
    watch: {
        playerHealth(value){
            if(value<=0 && this.monsterHealth<=0) {
                //draw
                this.winner='draw'
            } else if(value<=0) {
                //gameover
                this.winner='monster'
            }
        },
        monsterHealth(value){
            if(value<=0 && this.playerHealth<=0) {
                //draw
                this.winner='draw'
            } else if(value<=0) {
                //won
                this.winner='player'
            }
        }
    },
    computed: {
        monsterBarStyles(){
            if(this.monsterHealth<0){this.monsterHealth=0}
            return {width: this.monsterHealth+'%'}
        },
        playerBarStyles(){
            if(this.playerHealth<0){this.playerHealth=0}
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
        healPlayer(){
            this.playerHealth += getRandomValue(8,20)
            if(this.playerHealth>100){
                this.playerHealth=100
            }
            this.attackPlayer()
            this.currentRound++
        },
        surrender(){
            this.playerHealth = 0
        },
        newGame(){
            this.monsterHealth=100
            this.playerHealth=100
            this.currentRound=0
            this.winner=null
        }
    }
})

app.mount('#game')