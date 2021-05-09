<template>
    <div>
        <button @click="getUserInfo">获取用户信息</button>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data(){
        return {
            
        }
    },
    methods: {
        getUserInfo() {
            console.log(axios)
            const token = localStorage.getItem('token')
            axios.post('/api/token/user',{},{headers:{
                
            'Authorization': 'Bearer ' + token,

            }}).then(res=>{
                console.log(res)
            })
        }
    },
}
</script>