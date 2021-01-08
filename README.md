### commit test1
会员信息：
| 字段名 | 字段代码 | 字段类型 | 关键字 | 可否为空|
| :-----:| :-----: | :----: | :---:|:--:|
| 会员号 | memberId | ObjectId | Y | N  |
| 姓名 | name | String | | N |
| 性别 | sex | String | | N | 
| 电话号码 | phone | String | | N |
| 生日 | birthday | String | | N | 
| 会员等级 | rate | Number | | N |
| 会员积分 | integral | Number | | N | 


员工信息：
| 字段名 | 字段代码 | 字段类型 | 关键字 | 可否为空|
| :-----:| :-----: | :----: | :---:|:--:|
| 编号 | showId | ObjectId | Y | N  |
| 姓名 | name | String | | N |
| 性别 | sex | String | | N |
| 年龄 | age | Number | | N | 
| 电话号码 | phone | String | | N |
| 角色 | role | Number | | N | 

桌台信息：
| 字段名 | 字段代码 | 字段类型 | 关键字 | 可否为空|
| :-----:| :-----: | :----: | :---:|:--:|
| 编号 | showId | ObjectId | Y | N  |
| 类型 | type | String | | N |
| 预约状态 | reserved | Boolean | | N |

菜品信息：
| 字段名 | 字段代码 | 字段类型 | 关键字 | 可否为空|
| :-----:| :-----: | :----: | :---:|:--:|
| 编号 | showId | ObjectId | Y | N  |
| 名称 | name | String | | N |
| 类型 | type | String | | N |
| 数量 | count | Number | | N | 
| 是否供应 | provided | Boolean | | N |
| 价格 |price | String | | N | 

账单信息:
| 字段名 | 字段代码 | 字段类型 | 关键字 | 可否为空|
| :-----:| :-----: | :----: | :---:|:--:|
| 编号 | showId | ObjectId | Y | N  |
| 桌台编号 | showId_t | String | | N |
| 立账时间 | created_time | String | |  |
| 服务人员编号 | showId_s | String | | N |
| 菜品消费信息 | dishInfo | Array | |  | 
| 服务总金额 | cost_total | Number | |  |

用户信息（管理登录）:
| 字段名 | 字段代码 | 字段类型 | 关键字 | 可否为空|
| :-----:| :-----: | :----: | :---:|:--:|
| 用户名 | name | String |Y | N |
| 密码 | pwd | String | | N |
| 角色 | role | Number | | N | 
|登录记录|records|Array|||