import Vue from 'vue'
// import Element from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

// Vue.use(Element)
// 按需引入
import {
    Form,
    FormItem,
    Input,
    Button,
    Icon,
    Row,
    Col,
    Checkbox,
    CheckboxGroup,
    Link,
    Message,
    Dialog,
    Upload,
    Header,
    Main,
    Aside,
    Container,
    Menu,
    MenuItem,
    Card,
    Select,
    Option,
    MessageBox,
    Table,
    TableColumn,
    Pagination,
    DatePicker,
    Cascader,
    Radio,
    RadioGroup
} from 'element-ui'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Checkbox)
Vue.use(Link)
Vue.use(Dialog)
Vue.use(Upload)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Container)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Card)
Vue.use(Select)
Vue.use(Option)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(DatePicker)
Vue.use(Cascader)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(CheckboxGroup);

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm