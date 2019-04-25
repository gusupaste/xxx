import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/homepage/homeView'
import login from '@/components/login/login'

/**系统管理 */
import Systemmanagement from '@/components/systemmanagement/index'
import Brandmanagement from '@/components/systemmanagement/brandmanagement/list'
import Academicyear from '@/components/systemmanagement/academicyear/list'
import Usermanagement from '@/components/systemmanagement/usermanagement/list'
import Rolemanagement from '@/components/systemmanagement/rolemanagement/list'
import Rolemanagementadd from '@/components/systemmanagement/rolemanagement/add'
import Usermanagementadd from '@/components/systemmanagement/usermanagement/add'
import Usermanagementedit from '@/components/systemmanagement/usermanagement/edit'
import SchoolCalendarList from '@/components/systemmanagement/schoolCalendar/list'
import addNewTemplate from '@/components/systemmanagement/schoolCalendar/addNewTemplate'
import editTemplate from '@/components/systemmanagement/schoolCalendar/editTemplate'
import Settlementarea from '@/components/systemmanagement/settlementarea/list'
import EditSettlementarea from '@/components/systemmanagement/settlementarea/edit'
import Addsettlementarea from '@/components/systemmanagement/settlementarea/add'

/**入学管理 */
import EntranceManage from '@/components/entranceManage/index'
import IntentionalAdmission from '@/components/entranceManage/intentionaladmission/list'
import AdmissionRegistration from '@/components/entranceManage/admissionregistration/list'

/**学生档案 */
import StudentFile from '@/components/studentFile/index'
import StudentFileList from '@/components/studentFile/studentFile'
import StudentFileDetail from '@/components/studentFile/fileDetail'

/**校园 */
import School from '@/components/school/index'
import Intercitylist from '@/components/school/intercitylist/list'
import Schoollist from '@/components/school/schoollist/list'
import SchoolViewClendar from '@/components/school/schoollist/viewClendar'
import Schooldetail from '@/components/school/schoollist/detail'
import Schooladd from '@/components/school/schoollist/add'
import Schooledit from '@/components/school/schoollist/edit'
import Discountbudget from '@/components/school/discountbudget/list'
import Enrollmentnumber from '@/components/school/enrollmentnumber/list'
import Revenuetarget from '@/components/school/revenuetarget/list'

/**财务处理 */
import Setting from '@/components/finance/setting/list'
import Financemanagement from '@/components/finance/index'
import Charge from '@/components/finance/charge/list'
import BillDetail from '@/components/finance/charge/billDetail'
import PendingApproval from '@/components/finance/charge/pendingApproval'
import Refund from '@/components/finance/refund/list'
import PendingApprovalRecord from '@/components/finance/reserveFund/pendingApprovalRecord'
import UsageRecord from '@/components/finance/reserveFund/usageRecord'
import Discount from '@/components/finance/discount/list'
import DiscountPass from '@/components/finance/discount/pass'
import DiscountApproval from '@/components/finance/discount/approval'
import DiscountDismissed from '@/components/finance/discount/dismissed'
import Reservefund from '@/components/finance/reservefund/list'
import Parentbusinessapplication from '@/components/finance/parentbusinessapplication/list'

/**工作流 */
import Workflow from '@/components/workflow/list'

/**家长信息 */
import ParentInfo from '@/components/parentinfo/list'

/**学生考勤 */
import StudentAttendance from "@/components/studentAttendance/index"
import AttendanceSurvey from "@/components/studentAttendance/group/attendanceSurvey"
import AttendanceSurveySchool from "@/components/StudentAttendance/school/attendanceSurvey"

Vue.use(Router)

export default new Router({
  // mode: 'history',
  // base:'/workspace',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {requiresAuth: true, keepAlive: false},
      children: []
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/systemmanagement',/*系统管理*/
      name: 'systemmanagement',
      component: Systemmanagement,
      children: [
        {
          path: '/systemmanagement/brand-management',
          name: 'brand-management',
          component: Brandmanagement
        },
        {
          path: '/systemmanagement/academic-year',
          name: 'academic-year',
          component: Academicyear
        },
        {
          path: '/systemmanagement/usermanagement',
          name: 'usermanagement',
          component: Usermanagement
        },
        {
          path: '/systemmanagement/usermanagement-add',
          name: 'usermanagement-add',
          component: Usermanagementadd
        },
        {
          path: '/systemmanagement/rolemanagement',
          name: 'rolemanagement',
          component: Rolemanagement
        },
        {
          path: '/systemmanagement/rolemanagement-add',
          name: 'rolemanagement-add',
          component: Rolemanagementadd
        },
        {
          path: '/systemmanagement/usermanagement-edit',
          name: 'usermanagement-edit',
          component: Usermanagementedit
        },
        {
          path: '/systemmanagement/settlement-area',
          name: 'settlement-area',
          component: Settlementarea
        },
        {
          path: '/systemmanagement/edit-settlement-area/:id',
          name: 'edit-settlement-area',
          component: EditSettlementarea
        },
        {
          path: '/systemmanagement/addsettlementarea',
          name: 'Addsettlementarea',
          component: Addsettlementarea
        },
      ]
    },
    {
      path: '/studentFile',/*学生档案*/
      name: 'studentFile',
      component: StudentFile,
      children: [
        {
          path: '/studentFile/studentFileList',/*学生档案列表*/
          name: 'StudentFileList',
          component: StudentFileList,
        },
        {
          path: '/studentFile/studentFileDetail/:id',/*学生档案详情*/
          name: 'studentFileDetail',
          component: StudentFileDetail,
          children: [

          ]
        },

      ]
    },
    {
      path: '/parentInfo',/*家长信息*/
      name: 'parentInfo',
      component: ParentInfo,
    },
    {
      path: '/school',/*校园*/
      name: 'school',
      component: School,
      children: [
        {
          path: '/school/intercity-list',
          name: 'intercity-list',
          component: Intercitylist
        },
        {
          path: '/school/school-list',
          name: 'school-list',
          component: Schoollist
        },
        {
          path: '/school/school-detail/:id',
          name: 'school-detail',
          component: Schooldetail
        },
        {
          path: '/school/school-add',
          name: 'school-add',
          component: Schooladd
        },
        {
          path: '/school/school-edit/:id',
          name: 'school-edit',
          component: Schooledit
        },
        {
          path: '/school/SchoolViewClendar/:id',
          name: 'SchoolViewClendar',
          component: SchoolViewClendar

        },
        {
          path: '/school/discountbudget-list',
          name: 'discountbudget-list',
          component: Discountbudget
        },
        {
          path: '/school/enrollmentnumber-list',
          name: 'enrollmentnumber-list',
          component: Enrollmentnumber
        },
        {
          path: '/school/revenuetarget-list',
          name: 'revenuetarget-list',
          component: Revenuetarget
        }
      ]
    },
    {
      path: '/entranceManage',/*入园管理*/
      name: 'entranceManage',
      component: EntranceManage,
      children: [
        {
          path: '/entranceManage/intentional-admission',
          name: 'intentional-admission',
          component: IntentionalAdmission
        },
        {
          path: '/entranceManage/admission-registration',
          name: 'admission-registration',
          component: AdmissionRegistration
        },
      ]
    },
    {
      path: '/workflow',/*工作流*/
      name: 'workflow',
      component: Workflow,
    },
    {
      path: '/studentattendance',/*学生考勤*/
      name: 'studentattendance',
      component: StudentAttendance,
      children: [
        {
          path: '/studentattendance/survey',
          name: 'studentattendanceSurvey',
          component: AttendanceSurvey
        },
        {
          path: '/studentattendance/survey-school',
          name: 'survey-school',
          component: AttendanceSurveySchool
        }
      ]
    },
    {
      path: '/financemanagement',/*财务管理*/
      name: 'financemanagement',
      component: Financemanagement,
      children: [
        {/*收费账单*/
          path: '/financemanagement/charge',
          name: 'charge',
          component: Charge
        },
        {/*收费账单*/
          path: '/financemanagement/billDetail',
          name: 'billDetail',
          component: BillDetail
        },
        {/*收费账单*/
          path: '/financemanagement/pendingApproval',
          name: 'pendingApproval',
          component: PendingApproval
        },
        {
          path: '/financemanagement/refund',
          name: 'refund',
          component: Refund
        },
        {
          path: '/financemanagement/pendingApprovalRecord',
          name: 'pendingApprovalRecord',
          component: PendingApprovalRecord
        },
        {
          path: '/financemanagement/usageRecord',
          name: 'usageRecord',
          component: UsageRecord
        },
        {
          path: '/financemanagement/discount',
          name: 'discount',
          component: Discount
        },
        {
          path: '/financemanagement/discountPass/:id',
          name: 'discountPass',
          component: DiscountPass
        },
        {
          path: '/financemanagement/approval/:id',
          name: 'discountApproval',
          component: DiscountApproval
        },
        {
          path: '/financemanagement/dismissed/:id',
          name: 'discountDismissed',
          component: DiscountDismissed
        },
        {
          path: '/financemanagement/reservefund',
          name: 'Reservefund',
          component: Reservefund
        },
        {
          path: '/financemanagement/parentbusinessapplication',
          name: 'parentbusinessapplication',
          component: Parentbusinessapplication
        },
        {
          path: '/financemanagement/setting',
          name: 'Setting',
          component: Setting
        },
      ]
    },
    {
      path: '/schoolCalendarList',
      name: 'schoolCalendarList',
      component: SchoolCalendarList,
      meta: { requiresAuth: true, keepAlive: false },

      children: [

      ]
    },
    {
      path: '/schoolCalendarList/addNewTemplate',
      name: 'addNewTemplate',
      component: addNewTemplate,
      meta: { requiresAuth: true, keepAlive: false },
    },
    {
      path: '/schoolCalendarList/editTemplate/:id',
      name: 'editTemplate',
      component: editTemplate,
      meta: { requiresAuth: true, keepAlive: false },
    }
  ]
})
