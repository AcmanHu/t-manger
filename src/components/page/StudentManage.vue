<template>
    <div class="studentManage">
        
        <div class="title">
            <Row>
                <Col span="12">
                    <span>班级查询：</span>
                    <Input v-model="value1" size="large" placeholder="请输入查询批次" style="width: auto"/>  
                    <Button type="info" size="large" @click="studentInfo">查询</Button>  
                    <Upload :action="url"
                            :headers="headers"
                            multiple
                            :show-upload-list="false"
                            accept="xlsx"
                            :before-upload="berforeUpload"
                            :on-success="successInfo"
                            :on-error="errorInfo"
                            :on-progress="progressInfo"
                            >
                        <Button type="success" icon="ios-cloud-upload-outline" size="large">导入学生信息</Button>
                    </Upload>
                    <!-- <input type="file" id="file" onchange="foo(event)" style="display:none;"> -->
                </Col>
                <Col span="12" class="coldown">
                    <Button size="large" icon="ios-download-outline" type="primary" @click="studentDownloadExcel">学生信息样表下载</Button>
                </Col>
            </Row>
        </div>
        <Progress :percent="loading" v-show="progressShow" status="active" />
        <Table height="400" border :columns="columns1" :data="data1" size="large"></Table>
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
  Col,
  Upload,
  Progress 
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
        Col,
        Upload,
        Progress 
    },
    data(){
        return{
            value1:'',
            progressShow:false,
            url:IP +'/computercultrue/index.php/teacher/student/',
            headers:{
                'X-TOKEN': this.$cookies.get('token')
            },
            loading: 0,
            columns1: [
                {
                    title: '班级',
                    key: 'class',
                    align: 'center',
                },
                {
                    title: '学院',
                    key: 'college',
                    align: 'center',
                },
                {
                    title: '学号',
                    key: 'number',
                    align: 'center',
                },
                {
                    title: '姓名',
                    key: 'name',
                    align: 'center',
                }
            ],
            data1: []
        }
    },
    methods:{
        //上传之前执行的函数
        berforeUpload(val){
            this.progressShow = true
            let msg = '文件正在上传中，您不要慌，上传成功后我会自动关闭哦'
            this.NoticeInfo(msg, 'startUpload', 0)
            // console.log(val)
        },
        //上传成功执行的函数
        successInfo(response, file, fileList){
            // console.log(response)
            if(response.code == 1){
                this.progressShow = false
                let msg = '文件上传成功'
                this.Noticesuccess(msg,'successUoload',4)
                this.$Notice.close('startUpload')
                this.$Notice.close('errorUoload')
            }else{
                this.$Notice.close('startUpload')
                let msg = response.msg
                this.$Notice.close('errorUoload')
                this.Noticeerror(msg,'errorUoload',0)
            }
        },
        //上传失败执行的函数
        errorInfo(error, file, fileList){
            this.progressShow = false
            this.$Notice.close('startUpload')
            let msg = '文件上传失败，请重试'
            this.Noticeerror(msg,'errorUoload',0)
            // console.log(error)
        },
        //上传的过程中执行的函数
        progressInfo(event, file, fileList){
            // console.log(event)
            this.loading = parseInt(event.percent)
        },
        //学生样表下载
        studentDownloadExcel(){
            let url = IP +'/computercultrue/index.php/teacher/demo/student'
            $hutn.httpGet(url,{},(data)=>{
                // console.log(data)
                window.location.href = data
            })
        },
        studentInfo(){
            let params = {
                class:this.value1
            }
            let url = IP +'/computercultrue/index.php/teacher/student/cls'
            this.data1 = []
            $hutn.httpGet(url, params, (data)=>{
                // console.log(data)
                let msg = data.msg
                // console.log(msg)
                let len = msg.length
                for (let i = 0; i < len; i++) {
                    let A, B, C, D
                    A = msg[i].class
                    C = msg[i].college
                    B = msg[i].id
                    D = msg[i].name

                    this.data1.push({
                        class: A,
                        college: B,
                        number: C,
                        name: D,
                    })
                }
            })
        },
        //设置通知信息提醒
        NoticeInfo(msg, name, time){
            this.$Notice.info({
                title: '温馨提醒',
                desc: '喜刷刷',
                duration: time,
                name:name,
                render: h => {
                    return h('div', [
                        h('span', {
                            style:{
                                lineHeight:'20px',
                                fontSize:'14px'
                            }
                            },msg),
                        
                    ])
                }
            });
        },
        //成功的通知提醒
        Noticesuccess(msg, name, time){
            this.$Notice.success({
                title: '上传成功',
                desc: '喜刷刷',
                duration: time,
                name:name,
                render: h => {
                    return h('div', [
                        h('span', {
                            style:{
                                lineHeight:'20px',
                                fontSize:'14px'
                            }
                            },msg),
                        
                    ])
                }
            });
        },
        //失败的通知提醒
        Noticeerror(msg, name, time){
            this.$Notice.error({
                title: '上传失败',
                desc: '喜刷刷',
                duration: time,
                name:name,
                render: h => {
                    return h('div', [
                        h('span', {
                            style:{
                                lineHeight:'20px',
                                fontSize:'14px'
                            }
                            },msg),
                        
                    ])
                }
            });
        }
    },
    mounted(){
        // this.token = this.$cookies.get('token')
        // console.log(this.token)
        // this.getExamInfo()  
    }
}
</script>

<style lang="scss" scoped>
    .studentManage{
        .ivu-upload{
            display: inline-block;
        }
        .title{
            height: 50px;
            line-height: 50px;
            // margin-bottom: 10px;
            padding: 0 10px;
            span{
                font-size: 18px;
                font-weight: 700;
                 
            }
            .coldown{
                text-align: right;
            }
        }
    }
</style>
