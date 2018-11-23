<template>
    <div class="modification">
        <div class="content">
            
            
            <Card dis-hover :bordered="true">
                <p slot="title">修改考试信息</p>
                <p>
                    考试时间：<DatePicker type="date" placeholder="选择日期" :value="date" size="large" format="yyyy-MM-dd" @on-change="selectDate" style="width: 180px"></DatePicker> -
                    <TimePicker type="time" placeholder="选择时间" size="large" :value="time" @on-change="selectTime" style="width: 150px"></TimePicker>
                </p>
                <p>
                    考试地点：<Input v-model="value1" size="large" placeholder="开始地点" style="width: 180px" />
                </p>
                <p>
                     考试人数：<InputNumber :max="500" :min="0" size="large" :step="10" v-model="value2"></InputNumber>
                </p>
                <p>
                    考试批次：<InputNumber :max="100" :min="0" size="large" :step="1" v-model="value3"></InputNumber>
                </p>
                <p>
                    <Button type="primary" size="large" @click="modification">确认修改</Button>
                    <Button type="default" size="large" @click="cancel">取消</Button>
                    <Button type="error" size="large" @click="instance">删除考试</Button>
                </p>
            </Card>


            <!-- <Modal
                v-model="modal1"
                title="Common Modal dialog box title"
                @on-ok="ok"
                @on-cancel="cancel1">
                <p>Content of dialog</p>
                <p>Content of dialog</p>
                <p>Content of dialog</p>
            </Modal> -->
        </div>
    </div>
</template>

<script>
import $hutn from '../public/index'
import IP from '../public/ip'
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
  Card,
  Modal
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
        Card,
        Modal
    },
    data(){
        return{
            value1:'',
            value2:0,
            value3:0,
            date:'',
            time:'',
            modal1: false
        }
    },
    methods:{
        instance (){
            this.$Modal.confirm({
                title: '警告',
                content: '<p>删除后将无法恢复, 是否继续?</p>',
                onOk: () => {
                    this.deleteExam()
                },
                onCancel: () => {
                    this.$Message.info('已取消删除')
                }
            });
        },
       
         //获取选择的日期
        selectDate(date){
            this.date = date
        },
        //获取选择时间
        selectTime(time){
            this.time = time
            // console.log(this.time)
        },
        //获取考试信息
        getExamInfo(){
            let info = this.$route.params.info
            this.date = info.date
            this.time = info.datetime
            this.value1 = info.site
            this.value2 = info.refnumber
            this.value3 = info.batch
            
        },
        //修改成功
        modification(){
            let params = {
                examid: this.value3,
                date: this.date+' '+this.time,
                place:this.value1,
                total_mount:this.value2
            }
            let url = IP +'/computercultrue/index.php/teacher/exam/'+this.value3
            $hutn.httpPut(url, params, (data)=>{
                // console.log(data)
                if(data.code == 1){
                    this.$Message.success(data.msg);
                    this.$router.go(-1)
                }else{
                    this.$Message.info(data.msg);
                }
            })
        },
        cancel(){
            this.$router.go(-1)
        },
        //删除考试
        deleteExam(){
            let url = IP +'/computercultrue/index.php/teacher/exam/' + this.value3
            $hutn.httpDelete(url,(data)=>{
                if(data.code == 1){
                    this.$Message.success(data.msg);
                    this.$router.go(-1)
                }else{
                    this.$Message.info(data.msg);
                }
            })
        }
    },
    mounted(){
        this.getExamInfo()
    }
}
</script>

<style lang="scss" scoped>
    .modification{
        .content{
            width: 500px;
            height: 400px;
            position: relative;
            left: 50%;
            top: 80px;
            margin-left: -250px;
            p{
                margin-bottom: 10px;
                &:last-child{
                    button{
                        margin-right: 10px;
                    }
                }
            }
        
        }
    }
</style>
