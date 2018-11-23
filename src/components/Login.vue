<template>
    <div class="login">
        <div class="content">
            <Card :bordered="true">
                <p slot="title" class="p_title">管理员登陆</p>
                <Input prefix="ios-contact" placeholder="请输入账号" v-model="value1" style="width: 100%" />
                <Input prefix="ios-lock-outline" placeholder="请输入密码" v-model="value2" type="password" style="width: 100%;margin-top: 20px;" />
                <div class="loginBtn">
                    <Checkbox v-model="single">记住密码</Checkbox>
                    <span>
                        <Button type="info" shape="circle" @click="toHome">登陆</Button>
                    </span>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import $hutn from './public/index'
import store from './public/store'
import IP from './public/ip'
import {
  Button,
  Table,
  Icon,
  Row,
  DatePicker,
  TimePicker,
  Input,
  InputNumber,
  Tag,
  Checkbox,
  Card
} from "iview";
export default {
    components:{
        Table,
        Button,
        Icon,
        Row,
        DatePicker,
        TimePicker,
        Input,
        InputNumber,
        Tag,
        Checkbox,
        Card 
    },
    data(){
        return{
            single: false,
            value1:'',
            value2:''
        }
    },
    computed:{
        count(){
            return store.state.count
        }
    },
    methods:{
        //登陆跳转
        toHome(){
            let params = {
                username:this.value1,
                password:this.value2
            }
            let url =  IP +'/computercultrue/index.php/teacher/login'
            $hutn.httpLoginPost(url, params, (data)=>{
                // console.log(data)
                if(data.code == 1){
                    this.$cookies.set('name', this.value1, '1D')
                    this.$cookies.set('token', data.msg, '1D')
                    this.$router.replace({name : 'ExamPage'})
                    this.setUserCookie()
                }else{
                    this.$Message.error(data.msg)
                }
            },()=>{
                this.$Message.error('网络错误，请稍后重试')
            }
            )
        },
        //设置用户登陆的信息,记住密码功能的实现
        setUserCookie(){
            if(this.single == true){
                let usercookie = {
                    single:true,
                    username:this.value1,
                    password:this.value2
                }
                this.$cookies.set('rememberUser', usercookie, '7d')
            }else{
                this.$cookies.remove("rememberUser");
            }
        },
        //加载页面时，判断是否是记住密码，是就将设置账号信息
        setUserLogin(){
            //检测cookie是否存在 this.$cookies.isKey(keyrememberUserName)
            // console.log()
            if(this.$cookies.isKey('rememberUser')){
                this.value1 = this.$cookies.get('rememberUser').username //设置账号
                this.value2 = this.$cookies.get('rememberUser').password //设置密码
                this.single = this.$cookies.get('rememberUser').single //设置是否记住密码
            }
        }
    },
    mounted(){
        // this.toHome();
        this.setUserLogin()
    }
}
</script>

<style lang="scss" scoped>
.login{
    background: #2a85a1;
    height: 100%;
    .content{
        position: absolute;
        height: 250px;
        width: 350px;
        margin:  auto;
        left: 0px;
        right: 0px;
        top: 0px;
        bottom: 0px;
        .p_title{
            text-align: center;
        }
        .loginBtn{
            margin-top: 20px;
            span{
                float: right;
            }
        }
    }
}
</style>
