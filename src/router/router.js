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
import ProcessDefinition from '@/components/systemmanagement/processDefinition/processDefinition'

/**入学管理 */
import EntranceManage from '@/components/entranceManage/index'
import IntentionalAdmission from '@/components/entranceManage/intentionaladmission/list'
import AdmissionRegistration from '@/components/entranceManage/admissionregistration/list'

/**学生档案 */
import StudentFile from '@/components/studentFile/index'
import StudentFileList from '@/components/studentFile/studentFile'
import StudentFileDetail from '@/components/studentFile/fileDetail'

/**校园端   学生管理 */
import StudentManage from '@/components/studentManage/index'
import StudentList from '@/components/studentManage/list'
import StudentDetail from '@/components/studentManage/fileDetail'

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
import BillMaking from '@/components/finance/billMaking/billMaking'
import Costpremium from '@/components/finance/billMaking/costpremium'
import BillMakingDetail from '@/components/finance/billMaking/detail'
import BillMakingEdit from '@/components/finance/billMaking/edit'
import BillMakingDollar from '@/components/finance/billMaking/dollar'
import BillMakingAcademicChange from '@/components/finance/billMaking/academicChange'
import CreateDiscount from '@/components/finance/billMaking/createDiscount'
import Policy from '@/components/finance/policy/policy'
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
import DiscountApplication from '@/components/finance/discountApplication/list'
import AdddiscountApplication from '@/components/finance/discountApplication/add'
import DiscountApplicationDetail from '@/components/finance/discountApplication/detail'
import Paymentprocessing from '@/components/finance/paymentprocessing/list'
import PayBillDetail from '@/components/finance/paymentprocessing/billDetail'
import BillInfo from '@/components/finance/paymentprocessing/billInfo'

/**工作流 */
import Workflow from '@/components/workflow/list'

/**家长信息 */
import ParentInfo from '@/components/parentinfo/list'

/**学生考勤 */
import StudentAttendance from "@/components/studentAttendance/index"
import AttendanceSurvey from "@/components/studentAttendance/group/attendanceSurvey"
import AttendanceDetail from "@/components/studentAttendance/group/attendanceDetail"
import AttendanceStatistics from "@/components/studentAttendance/school/attendanceStatistics"
import AttendanceDaily from "@/components/studentAttendance/school/attendanceDaily"

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
      meta: { requiresAuth: true, keepAlive: false },
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
        {
          path: '/systemmanagement/processDefinition',
          name: 'ProcessDefinition',
          component: ProcessDefinition
        },
      ]
    },
    {
      path: '/studentFile',/*学生档案*/
      name: 'studentFile',
      component: StudentFile,
      meta: { requiresAuth: true, keepAlive: false },
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
      meta: { requiresAuth: true, keepAlive: false },
    },
    {
      path: '/studentManage',/*家长信息*/
      name: 'studentManage',
      component: StudentManage,
      meta: { requiresAuth: true, keepAlive: false },
      children: [
        {
          path: '/studentManage/student-list',
          name: 'student-list',
          component: StudentList
        },
        {
          path: '/studentManage/student-detail/:id',
          name: 'student-detail',
          component: StudentDetail
        },
      ]
    },
    {
      path: '/school',/*校园*/
      name: 'school',
      component: School,
      meta: { requiresAuth: true, keepAlive: false },
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
      meta: { requiresAuth: true, keepAlive: false },
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
      meta: { requiresAuth: true, keepAlive: false },
    },
    {
      path: '/studentattendance',/*学生考勤*/
      name: 'studentattendance',
      component: StudentAttendance,
      meta: { requiresAuth: true, keepAlive: false },
      children: [
        {
          path: '/studentattendance/survey',
          name: 'studentattendanceSurvey',
          component: AttendanceSurvey
        },
        {
          path: '/studentattendance/survey',
          name: 'studentattendanceSurvey',
          component: AttendanceSurvey
        },
        {
          path: '/studentattendance/detail/:id',
          name: 'attendancedetail',
          component: AttendanceDetail
        },
        {
          path: '/studentattendance/attendanceStatistics',
          name: 'attendanceStatistics',
          component: AttendanceStatistics
        },
        {
          path: '/studentattendance/attendanceDaily',
          name: 'attendanceDaily',
          component: AttendanceDaily
        }
      ]
    },
    {
      path: '/financemanagement',/*财务管理*/
      name: 'financemanagement',
      component: Financemanagement,
      meta: { requiresAuth: true, keepAlive: false },
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
          path: '/financemanagement/paymentprocessing',
          name: 'paymentprocessing',
          component: Paymentprocessing
        },
        {
          path: '/financemanagement/payBillDetail',
          name: 'payBillDetail',
          component: PayBillDetail
        },
        {
          path: '/financemanagement/billInfo',
          name: 'billInfo',
          component: BillInfo
        },
        {
          path: '/financemanagement/setting',
          name: 'Setting',
          component: Setting
        },
        {
          path: '/financemanagement/billMaking',
          name: 'BillMaking',
          component: BillMaking
        },
        {
          path: '/financemanagement/policy',
          name: 'Policy',
          component: Policy
        },
        {
          path: '/financemanagement/costpremium',
          name: 'costpremium',
          component: Costpremium
        },
        {
          path: '/financemanagement/createDiscount',
          name: 'createDiscount',
          component: CreateDiscount
        },
        {
          path: '/financemanagement/billMakingDetail/:id',
          name: 'BillMakingDetail',
          component: BillMakingDetail
        },
        {
          path: '/financemanagement/edit/:id',
          name: 'BillMakingEdit',
          component: BillMakingEdit
        },
        {
          path: '/financemanagement/dollar/:id',
          name: 'BillMakingDollar',
          component: BillMakingDollar
        },
        {
          path: '/financemanagement/billMakingAcademicChange',
          name: 'BillMakingAcademicChange',
          component: BillMakingAcademicChange
        },
        {
          path: '/financemanagement/discountApplication',
          name: 'DiscountApplication',
          component: DiscountApplication
        },
        {
          path: '/financemanagement/adddiscountApplication',
          name: 'AdddiscountApplication',
          component: AdddiscountApplication
        },
        {
          path: '/financemanagement/discountApplicationDetail',
          name: 'DiscountApplicationDetail',
          component: DiscountApplicationDetail
        },
        {
          path: '/financemanagement/discountApplicationDetail',
          name: 'DiscountApplicationDetail',
          component: DiscountApplicationDetail
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
