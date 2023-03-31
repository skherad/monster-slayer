const getRandomValue = (min,max) => Math.floor(Math.random()*(max-min))+min

const app = Vue.createApp({
    data(){
        return({
            monsterHealth: 100,
            playerHealth: 100,
        })
    },
    methods: {
        attackMonster(){
            this.monsterHealth -= getRandomValue(5,12)
            this.attackPlayer()
        },
        attackPlayer(){
            this.playerHealth -= getRandomValue(8,15)
        },
        specialAttack(){
            this.monsterHealth -= getRandomValue(50,25)
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