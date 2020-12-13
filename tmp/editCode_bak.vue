<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="6" class="grid-position">
				<div @click="signIn(listData.isPunch)">
					<div class="grid-content bg-purple-dark" style="height: 120px;">
						<template v-if="listData.isPunch">
							<h1>已签到</h1>
							<p>今日已签到</p>
						</template>
						<template v-else>
							<h1>未签到</h1>
							<p>今日尚未签到</p>
						</template>
					</div>
					<span class="grid-position-more" v-if="listData.isPunch">{{this.$common.getYMD((new Date()) / 1000).join("-")}}</span>
					<span class="grid-position-more" v-else>点击打卡</span>
					<span class="grid-position-img"><i class="el-icon-s-promotion"></i></span>
				</div>
			</el-col>
			<el-col :span="6" class="grid-position">
				<div @click="goUrl('logList')">
					<div class="grid-content bg-purple-dark" style="height: 120px;">
						<h1>{{listData.jobLogNum || 0}}</h1>
						<p>日志数量</p>
					</div>
					<span class="grid-position-more">更多<i class="el-icon-caret-bottom"></i></span>
					<span class="grid-position-img"><i class="el-icon-s-order"></i></span>
				</div>
			</el-col>
			<el-col :span="6" class="grid-position">
				<div @click="goUrl('internalMailList')">
					<div class="grid-content bg-purple-dark" style="height: 120px;">
						<h1>{{listData.interMailNum || 0}}</h1>
						<p>内部邮件数量</p>
					</div>
					<span class="grid-position-more">更多<i class="el-icon-caret-bottom"></i></span>
					<span class="grid-position-img"><i class="el-icon-s-platform"></i></span>
				</div>
			</el-col>
			<el-col :span="6" class="grid-position">
				<div @click="goUrl('documentList')">
					<div class="grid-content bg-purple-dark" style="height: 120px;">
						<h1>{{listData.documentNum || 0}}</h1>
						<p>文件管理数量</p>
					</div>
					<span class="grid-position-more">更多<i class="el-icon-caret-bottom"></i></span>
					<span class="grid-position-img"><i class="el-icon-s-marketing"></i></span>
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="20">

			<el-col :span="15">
				<el-row :gutter="20">
					<el-col>
						<div class="grid-content bg-purple">
							<el-col :span="20">
								<h3><i class="el-icon-chat-round"></i> 消息列表</h3></el-col>
							<el-col :span="4">
								<span class="more" @click="goUrl('messageList')">更多</span>
							</el-col>
							<el-table ref="multipleTable" stripe :data="listData.messagesList" style="width: 100%">
								<el-table-column prop="on_content" label="消息内容"></el-table-column>
								<el-table-column prop="on_create_time" width="150" label="发布时间">
									<template slot-scope="scope">
										{{$common.dateFormat("YYYY/MM/dd",scope.row.on_create_time)}}
									</template>
								</el-table-column>
							</el-table>
						</div>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col>
						<div class="grid-content bg-purple">
							<el-col :span="20">
								<h3><i class="el-icon-news"></i> 公告列表</h3></el-col>
							<el-col :span="4">
								<span class="more" @click="goUrl('announcementList')">更多</span>
							</el-col>
							<el-table ref="multipleTable" stripe :data="listData.announcement" style="width: 100%">
								<el-table-column prop="oa_content" label="公告内容"></el-table-column>
								<el-table-column prop="oa_create_time" width="150" label="发布时间">
									<template slot-scope="scope">
										{{$common.dateFormat("YYYY/MM/dd",scope.row.oa_create_time)}}
									</template>
								</el-table-column>
							</el-table>
						</div>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col>
						<div class="grid-content bg-purple">
							<el-col :span="20">
								<h3><i class="el-icon-wallet"></i> 申请列表</h3></el-col>
							<el-col :span="4">
								<span class="more" @click="goUrl('applyList')">更多</span>
							</el-col>
							<el-table ref="multipleTable" stripe :data="listData.applyProcess" style="width: 100%">
								<el-table-column prop="of_id" label="流程ID" width="80" fixed></el-table-column>
								<el-table-column prop="of_name" label="流程类型"></el-table-column>
								<el-table-column prop="oap_status" :formatter="isStatus" label="状态"></el-table-column>
							</el-table>
						</div>
					</el-col>
				</el-row>
			</el-col>

			<el-col :span="9">
				<el-row :gutter="20">
					<el-col>
						<div class="grid-content bg-purple">
							<el-calendar v-model="calendarValue">
								<template slot="dateCell" slot-scope="{date, data}">
									<p :class="data.isSelected ? 'is-selected' : ''">
										<span>{{ data.day.split('-').slice(2).join('-') }} </span>
										<span v-show="!data.isSelected">{{dealMyDate(data.day)}} </span>
										<span>{{ data.isSelected ? '✔️' : ''}}</span>
									</p>
								</template>
							</el-calendar>
						</div>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col>
						<div class="grid-content bg-purple">
							<el-input type="textarea" :rows="9" placeholder="请输入内容" v-model="textareaStr"></el-input>
							<div>
								<el-button size="" type="primary" style="width: 100%;" @click="submitForm()">保存</el-button>
							</div>
						</div>
					</el-col>
				</el-row>
			</el-col>

		</el-row>
	</div>
</template>
<style>
	.el-row {
		margin-bottom: 20px;
		&:last-child {
			margin-bottom: 0;
		}
	}
	
	.el-col {
		border-radius: 4px;
	}
	
	.bg-purple-dark {
		background: #99a9bf;
	}
	
	.bg-purple {
		background: #d3dce6;
	}
	
	.grid-content {
		border-radius: 4px;
		min-height: 36px;
		padding: 10px;
	}
	
	.grid-content h3 {
		height: 31px;
		line-height: 31px;
	}
	
	.grid-content span.more {
		display: block;
		height: 31px;
		line-height: 31px;
		text-align: right;
		font-weight: normal;
	}
	
	.grid-content h3 i {
		font-weight: bold;
	}
	
	.grid-position {
		position: relative;
		overflow: hidden;
		color: #fff;
	}
	
	.grid-position-more {
		position: absolute;
		text-align: center;
		bottom: 0;
		left: 10px;
		right: 10px;
		background: rgba(0, 0, 0, 0.08);
		color: #fff;
	}
	
	.grid-position-img {
		position: absolute;
		top: 10px;
		right: 20px;
		width: 80px;
		height: 80px;
		border-radius: 100px;
		background: rgba(0, 0, 0, 0.06);
		color: #fff;
	}
	
	.grid-position-img img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	
	.grid-position-img i {
		font-size: 80px;
	}
	
	.el-calendar-table .el-calendar-day {
		height: auto;
	}
	
	.is-selected {
		color: #1989FA;
	}
</style>
<script>
	import { mapState, mapMutations } from "vuex";
	export default {
		data() {
			return {
				textareaStr: '',
				textareaId: '',
				calendarValue: new Date(),
			};
		},
		watch: {
			calendarValue: function() {
				this.dealSetDate();
			}
		},
		//计算属性
		computed: {
			...mapState({
				listData: state => state.HomeModule.listData,
				calendarData: state => state.HomeModule.calendarListData,
				pagination: state => state.HomeModule.pagination
			})
		},
		mounted() {
			this.initData();
			this.initCalendarData();
		},
		methods: {
			...mapMutations(["HomeModule/updateListData"]),
			...mapMutations(["HomeModule/updateCalendarListData"]),

			//获取首页数据
			initData() {
				var params = {
					"u_id": this.$localData.getUserId()
				}
				this.$myLoading.startLoading();
				this.$http.postHttp(
					this.$API.homePageSearch, params,
					rs => {

						this.$myLoading.endLoading();
						this["HomeModule/updateListData"](rs);

					}
				);
			},

			//打卡签到
			signIn(type) {
				if(type) {
					console.log("已签到！")
				} else {
					console.log("正在签到。。。")
				}
			},

			//跳转
			goUrl(urls) {

				var item = {}

				switch(urls) {
					case "logList":
						//日志
						item = {
							m_action_ids: null,
							m_fid: "351",
							m_icon: "no",
							m_icon_type: "0",
							m_id: "353",
							m_is_delete: "0",
							m_is_show: "1",
							m_level: "2",
							m_name: "日志列表",
							m_path: "0,350,351,",
							m_route_url: "logManagement/logManager/logList/logList.vue",
							m_type: "2",
							m_url: "logList"
						}
						break;
					case "internalMailList":
						//内部邮件
						item = {
							m_action_ids: null,
							m_fid: "357",
							m_icon: "no",
							m_icon_type: "0",
							m_id: "359",
							m_is_delete: "0",
							m_is_show: "1",
							m_level: "2",
							m_name: "内部邮件列表",
							m_path: "0,354,357,",
							m_route_url: "noticeManagement/internalMailManagement/internalMailList/internalMailList.vue",
							m_type: "2",
							m_url: "internalMailList"
						}
						break;
					case "documentList":
						//文件管理
						item = {
							m_action_ids: null,
							m_fid: "328",
							m_icon: "no",
							m_icon_type: "0",
							m_id: "330",
							m_is_delete: "0",
							m_is_show: "1",
							m_level: "2",
							m_name: "文档列表",
							m_path: "0,327,328,",
							m_route_url: "knowledgeManagement/documentManagement/documentList/documentList.vue",
							m_type: "2",
							m_url: "documentList"
						}
						break;
					case "messageList":
						//消息列表
						item = {
							m_action_ids: null,
							m_fid: "355",
							m_icon: "no",
							m_icon_type: "0",
							m_id: "356",
							m_is_delete: "0",
							m_is_show: "1",
							m_level: "2",
							m_name: "消息列表",
							m_path: "0,354,355,",
							m_route_url: "noticeManagement/messageManagement/messageList/messageList.vue",
							m_type: "2",
							m_url: "messageList"
						}
						break;
					case "announcementList":
						//公告列表
						item = {
							m_action_ids: null,
							m_fid: "360",
							m_icon: "no",
							m_icon_type: "0",
							m_id: "362",
							m_is_delete: "0",
							m_is_show: "1",
							m_level: "2",
							m_name: "公告列表",
							m_path: "0,354,360,",
							m_route_url: "noticeManagement/announcementManagement/announcementList/announcementList.vue",
							m_type: "2",
							m_url: "announcementList"
						}
						break;
					case "applyList":
						//申请列表
						item = {
							m_action_ids: null,
							m_fid: "323",
							m_icon: "no",
							m_icon_type: "0",
							m_id: "325",
							m_is_delete: "0",
							m_is_show: "1",
							m_level: "2",
							m_name: "申请列表",
							m_path: "0,322,323,",
							m_route_url: "applyManagment/applyManager/applyList/applyList.vue",
							m_type: "2",
							m_url: "applyList"
						}
						break;
					default:
						break;
				}

				this.$store.commit("MenuModule/storeData", item);
				this.$store.commit("ContentModule/updateMenuPath", item);
				this.$store.commit("TabsModule/updateSelectedState", item.m_id);

				this.$router.push({
					path: item.m_url,
				});

			},

			//获取日历列表
			initCalendarData() {
				var ymd = this.$common.getYMD((new Date(this.calendarValue)) / 1000);
				this.$http.postHttp(
					this.$API.memorandumSearch +
					"/om_year/" +
					ymd[0] +
					"/skip/0" +
					"/limit/5000" +
					"/om_is_delete/0", {},
					rs => {

						this["HomeModule/updateCalendarListData"](rs.data);

						this.dealSetDate();
					}
				);
			},
			//提交日历
			submitForm() {

				//筛选对应日期是否存在记录
				var newDate = this.$common.getYMD((new Date(this.calendarValue)) / 1000).join("-");
				this.textareaId = '';
				this.calendarData.filter((item) => {
					if(item.om_ymd_str == newDate) {
						this.textareaId = item.om_id;
					}
				})

				var urls = "";
				var params = {};
				var ymd = this.$common.getYMD((new Date(this.calendarValue)) / 1000);
				//增加记录
				if(this.textareaId == '') {
					urls = this.$API.addMemorandum;
					//数据
					params = {
						om_year: ymd[0],
						om_month: ymd[1],
						om_day: ymd[2],
						om_ymd_str: ymd.join("-"),
						om_content: this.textareaStr,
						om_uid: this.$localData.getUserId(),
						om_create_time: this.$common.currentTime(),
					}
				} else {
					//更新记录
					urls = this.$API.updateMmemorandum;
					//数据
					params = {
						update_where: "om_id",
						om_id: this.textareaId,
						om_content: this.textareaStr,
					}
				}

				this.$myLoading.startLoading()
				this.$http.postHttp(urls, params, rs => {
					this.$myLoading.endLoading()
					this.$myPop.SuccessMessage()
					this.initCalendarData()
				});

			},
			//给日历进行标记（日期内是否有数据）
			dealMyDate(v) {
				//console.log(v)
				let len = this.calendarData.length
				let res = ""
				for(let i = 0; i < len; i++) {
					if(this.calendarData[i].om_ymd_str == v) {
						if(this.calendarData[i].om_content != '') {
							res = "★"
						}
						break;
					}
				}
				return res;
			},
			//当天数据显示
			dealSetDate() {
				//筛选对应日期是否存在记录
				var newDate = this.$common.getYMD((new Date(this.calendarValue)) / 1000).join("-");

				this.textareaStr = "";
				this.calendarData.filter((item) => {
					if(item.om_ymd_str == newDate) {
						this.textareaStr = item.om_content;
					}
				})
			},

			isStatus(row, column, cellValue, index) {
				var str = '';
				if(cellValue == 0) {
					str = "正在审批"
				} else if(cellValue == 1) {
					str = "已通过"
				} else if(cellValue == 2) {
					str = "已驳回"
				} else {
					str = "已取消"
				}
				return str;
			},
		}
	};
</script>

<style lang="stylus" scoped>

</style>