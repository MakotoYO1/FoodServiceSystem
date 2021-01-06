<template>
  <div class="user main">
    <div class="table_search page_line">
      <el-input
        placeholder="用户名"
        v-model="filter.name"
        class="input"
        clearable
      ></el-input>
      <el-select
        v-model="filter.role"
        placeholder="等级"
        class="select middle"
        clearable
      >
        <el-option
          v-for="(item,val) in userRoleDict"
          :key="item"
          :label="item"
          :value="parseInt(val)"
        ></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
    </div>
    <div class="table_show">
      <el-table :data="tableData" v-loading="loading">
        <el-table-column label="用户名" prop="name" align="center"></el-table-column>
        <el-table-column label="密码" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.show_pwd?scope.row.pwd:'*'.repeat(scope.row.pwd.length)}}</span>
            <i class="el-icon-view" @click="showPwd(scope.row)"></i>
          </template>
        </el-table-column>
        <el-table-column label="角色" align="center">
          <template slot-scope="scope">
            {{userRoleDict[scope.row.role]}}
          </template>
        </el-table-column>
        <el-table-column label="最近登录ip" align="center">
          <template slot-scope="scope">
            {{scope.row.records[0].ip}}
          </template>
        </el-table-column>
        <el-table-column label="最近登录地点" align="center">
          <template slot-scope="scope">
            {{scope.row.records[0].location}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
        <el-button
          size="mini"
          icon="el-icon-edit"
          @click="editUser(scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          @click="handleDelete(scope.row)">删除</el-button>
      </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- form -->
    <el-dialog :title="dialogTitle"  :visible.sync="dialogFormVisible" :close-on-click-modal="false" center>
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" class="input"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="form.pwd" class="input"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
            <el-select
              v-model="form.role"
              class="select middle"
              clearable
            >
              <el-option
                v-for="(item,val) in userRoleDict"
                :key="item"
                :label="item"
                :value="parseInt(val)"
              ></el-option>
            </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')">提 交</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {userRoleDict} from '@/common/dict.js'
import user from '@/api/user.js'

export default {
  name:'user',
  data(){
    return {
      currentUser:this.$store.state,
      filter:{
        name:'',
        role:''
      },
      // 1 管理员，2员工
      userRoleDict,
      tableData:[],
      dialogFormVisible:false,
      dialogTitle:'编辑用户',
      form:{
        userId:'',
        name:'',
        pwd:'',
        role:''
      },
      rules:{
        name:[
          {required:true,message:'请输入用户名',trigger:'blur'}
        ],
        pwd:[
          {required:true,message:'请输入密码',trigger:'blur'}
        ],
        role:[
          {required:true,message:'请选择角色',trigger:'change'}
        ]
      }
    }
  },
  created(){
    this.getTableData()
  },
  methods:{
    async getTableData(){
      this.loading=true
      let res=await user.search(this.filter)
      if(res.code===0){
        this.tableData=res.data.map(item=>{
          item.show_pwd=false
          return item
        })
        // console.log(res.data)
      }
      this.loading=false
    },
    search(){
      this.getTableData()
    },
    async handleDelete(row){
      let res=await member.remove(row.userId)
      if(res.code===0){
        this.$message.success('删除成功')
        this.getTableData()
      }
    },
    editUser(row){
      this.dialogFormVisible=true
      for(let k in this.form){
        this.form[k]=row[k]
      }
    },
    async submitForm(name){
      let judge=true
      this.$refs[name].validate((valid)=>{
        if(!valid){
          judge=false
        }
      })
      if(!judge){
        return false
      }
      let res=await user.updateInfo(this.form.userId,this.form)
      if(res.code===0){
        if(this.currentUser.uid===this.form.userId){
          this.$message.error('信息发生改变，请重新登录')
          this.$store.dispatch('logout')
          this.$router.push('/login')
          return
        }
        this.$message.success('编辑成功')
        this.dialogFormVisible=false
        this.getTableData()
      }
    },
    showPwd(row){
      row.show_pwd=!row.show_pwd
    }
  }
}
</script>

<style lang="scss" scoped>
.el-icon-view{
  cursor: pointer;
  margin-left: 4px;
}
</style>