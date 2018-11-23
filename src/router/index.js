import Vue from 'vue'
import Router from 'vue-router'
import Teacher from '@/components/Teacher'
import Login from '@/components/Login'
import ExamPage from '@/components/page/ExamPage'
import AddPage from '@/components/page/AddPage'
import ExamMessage from '@/components/page/ExamMessage'
import HistoryExam from '@/components/page/HistoryExam'
import GradeManage from '@/components/page/GradeManage'
import StudentManage from '@/components/page/StudentManage'
import Modification from '@/components/page/Modification'

Vue.use(Router)

export default new Router({
  routes: [
    {path:'*',redirect:'/Login'},
    {
      path: '/Login',
      name: 'Login',
      component:Login
    },
    { 
      path: '/Teacher',
      name: 'Teacher',
      component: Teacher,
      children:[
        {path:'examPage',name:'ExamPage',component:ExamPage},
        {path:'addPage',name:'AddPage',component:AddPage},
        {path:'examMessage',name:'ExamMessage',component:ExamMessage},
        {path:'historyExam',name:'HistoryExam',component:HistoryExam},
        {path:'gradeManage',name:'GradeManage',component:GradeManage},
        {path:'studentManage',name:'StudentManage',component:StudentManage},
        {path:'modification',name:'Modification',component:Modification},
      ]
    }
  ]
})
