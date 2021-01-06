<template>
  <div class="member main">
    <div class="table_search page_line">
      <el-input
        placeholder="姓名"
        v-model="filter.name"
        class="input"
        clearable
      ></el-input>
      <el-input
        placeholder="手机号"
        v-model="filter.phone"
        class="input"
        clearable
      ></el-input>
      <el-select
        v-model="filter.sex"
        placeholder="性别"
        class="select small"
        clearable
      >
        <el-option
          v-for="(item,val) in sexDict"
          :key="item"
          :label="item"
          :value="val"
        ></el-option>
      </el-select>
      <el-date-picker
        v-model="filter.birthday"
        clearable
        value-format="yyyy-MM-dd"
        placeholder="生日"
        class="select middle">
      </el-date-picker>
      <el-select
        v-model="filter.rate"
        placeholder="等级"
        class="select small"
        clearable
      >
        <el-option
          v-for="(item,val) in memberRateDict"
          :key="item"
          :label="item"
          :value="parseInt(val)"
        ></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      <el-button class="add" type="primary" icon="el-icon-circle-plus-outline" @click="search">新增会员</el-button>
    </div>
    <div class="table_show">
      <el-table :data="tableData" v-loading="loading">
        <el-table-column label="姓名" prop="name" align="center"></el-table-column>
        <el-table-column label="性别" prop="sex" align="center"></el-table-column>
        <el-table-column label="生日" prop="birthday" align="center"></el-table-column>
        <el-table-column label="电话" prop="phone" align="center"></el-table-column>
        <el-table-column label="等级" align="center">
          <template slot-scope="scope">
            {{memberRateDict[scope.row.rate]}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {memberRateDict} from '@/common/dict.js'
import member from '@/api/member.js'

export default {
  name:'member',
  data(){
    return {
      filter:{
        name:'',
        phone:'',
        sex:'',
        birthday:'',
        rate:''
      },
      sexDict:{
        'male':'男',
        'female':'女'
      },
      tableData:[],
      memberRateDict,
      loading:true
    }
  },
  created(){
    console.log(this.memberRateDict)
    this.getTableData()
  },
  methods:{
    async getTableData(){
      this.loading=true
      let res=await member.search()
      if(res.code===0){
        this.tableData=res.data
        console.log(res.data)
      }
      this.loading=false
    },
    search(){
      this.getTableData()
    }
  }
}
</script>

<style lang="scss" scoped>
.input,.select{
  width: 200px;
  margin-right: 5px;
}
.small{
  width: 100px;
}
.middle{
  width: 150px;
}
.main{
  width: 100%;
  padding: 15px 20px;
  box-sizing: border-box;
  background-color: #ffffff;
  .table_search{
    display: flex;
    margin-bottom: 15px;
    .add{
      margin-left: auto;
    }
  }
  .table_show {
    width: 100%;
  }
}

</style>