/**
 * @Author: ZH
 * @createdTime: 2022-02-2022/2/10 16:43
 * @description:
 */
import React from 'react'
import ReactECharts from 'echarts-for-react';
import {HomeProps, HomeState} from "@/type/page/business/home";
import "@/styles/page/business/home.less"

export default class index extends React.Component<HomeProps, HomeState> {
	private options = {
		xAxis: {
			type: 'category',
			data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		},
		yAxis: {
			type: 'value',
		},
		series: [
			{
				data: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320],
				type: 'line',
				smooth: true,
			},
		],
		tooltip: {
			trigger: 'axis',
		},
	};
	private optionsLine = {
		title: {
			text: '堆叠区域图'
		},
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data: ['邮件营销', '联盟广告', '视频广告']
		},
		toolbox: {
			feature: {
				saveAsImage: {}
			}
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: [
			{
				type: 'category',
				boundaryGap: false,
				data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
			}
		],
		yAxis: [
			{
				type: 'value'
			}
		],
		series: [
			{
				name: '邮件营销',
				type: 'line',
				stack: '总量',
				areaStyle: {},
				data: [120, 132, 101, 134, 90, 230, 210]
			},
			{
				name: '联盟广告',
				type: 'line',
				stack: '总量',
				areaStyle: {},
				data: [220, 182, 191, 234, 290, 330, 310]
			},
			{
				name: '视频广告',
				type: 'line',
				stack: '总量',
				areaStyle: {},
				data: [150, 232, 201, 154, 190, 330, 410]
			}
		]
	}
	private optionPie = {
		title: {
			text: '某站点用户访问来源',
			// subtext: '纯属虚构',
			x: 'center'
		},
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			orient: 'vertical',
			left: 'left',
			data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
		},
		series: [
			{
				name: '访问来源',
				type: 'pie',
				radius: '60%',
				center: ['50%', '60%'],
				data: [
					{value: 335, name: '直接访问'},
					{value: 310, name: '邮件营销'},
					{value: 234, name: '联盟广告'},
					{value: 135, name: '视频广告'},
					{value: 1548, name: '搜索引擎'}
				],
				itemStyle: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		]
	}
	private optionRadar = {
		title: {
			text: '基础雷达图'
		},
		legend: {
			data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
		},
		radar: {
			indicator: [
				{name: '销售（sales）', max: 50000},
				{name: '管理（Administration）', max: 50000,}, // 标签设置为红色
				{name: '信息技术（Information Techology）', max: 50000},
				{name: '客服（Customer Support）', max: 50000},
				{name: '研发（Development）', max: 50000},
				{name: '市场1（Marketing）', max: 50000}
			]
		},
		series: [{
			name: '预算 vs 开销（Budget vs spending）',
			type: 'radar',
			data: [
				{
					value: [25000, 30000, 38000, 35000, 50000, 29000],
					name: '预算分配（Allocated Budget）'
				},
				{
					value: [35000, 44000, 28000, 31000, 42000, 31000],
					name: '实际开销（Actual Spending）'
				}
			]
		}]
	}
	private bar_option = {
		title: {
			text: 'ECharts 入门示例'
		},
		tooltip: {},
		legend: {
			data: ['销量', "利润"]
		},
		xAxis: {
			data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子',],
		},
		yAxis: [
			{
				type: 'value'
			}
		],
		series: [
			{
				name: '销量',
				type: 'bar',
				data: [5, 20, 36, 10, 10, 20, 20, 36, 10, 10,]
			},
			{
				name: '利润',
				type: 'bar',
				data: [5, 20, 36, 10, 10, 20, 20, 36, 10, 10,]
			},
		],
	}
	private default_option = {
		title: {
			text: 'Hello Echarts-for-react.',
		},
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data: ['最新成交价', '预购队列']
		},
		grid: {
			top: 60,
			left: 30,
			right: 60,
			bottom: 30
		},
		dataZoom: {
			show: false,
			start: 0,
			end: 100
		},
		visualMap: {
			show: false,
			min: 0,
			max: 1000,
			color: ['#BE002F', '#F20C00', '#F00056', '#FF2D51', '#FF2121', '#FF4C00', '#FF7500',
				'#FF8936', '#FFA400', '#F0C239', '#FFF143', '#FAFF72', '#C9DD22', '#AFDD22',
				'#9ED900', '#00E500', '#0EB83A', '#0AA344', '#0C8918', '#057748', '#177CB0']
		},
		xAxis: [
			{
				type: 'category',
				boundaryGap: true,
				data: (() => {
					let now = new Date();
					let res = [];
					let len = 40;
					while (len--) {
						res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
						// @ts-ignore
						now = new Date(now - 2000);
					}
					return res;
				})()
			},
			{
				type: 'category',
				boundaryGap: true,
				data: (() => {
					let res = [];
					let len = 40;
					for (let i = 1; i < 40; i++) {
						res.push(i);
					}
					return res;
				})()
			}
		],
		yAxis: [
			{
				type: 'value',
				scale: true,
				name: '价格',
				max: 20,
				min: 0,
				boundaryGap: [0.2, 0.2]
			},
			{
				type: 'value',
				scale: true,
				name: '预购量',
				max: 1200,
				min: 0,
				boundaryGap: [0.2, 0.2]
			}
		],
		series: [
			{
				name: '预购队列',
				type: 'bar',
				xAxisIndex: 1,
				yAxisIndex: 1,
				itemStyle: {
					borderRadius: 5,
				},
				animationEasing: 'elasticOut',
				animationDelay: (idx: number) => {
					return idx * 10;
				},
				animationDelayUpdate: (idx: number) => {
					return idx * 10;
				},
				data: (function () {
					let res = [];
					let len = 40;
					while (len--) {
						res.push(Math.round(Math.random() * 1000));
					}
					return res;
				})()
			},
			{
				name: '最新成交价',
				type: 'line',
				data: (() => {
					let res = [];
					let len = 0;
					while (len < 40) {
						let randomNum = (Math.random() * 10 + 5).toFixed(1);
						res.push(parseInt(randomNum));
						len++;
					}
					return res;
				})()
			}
		]
	}
	
	public constructor(props: HomeProps) {
		super(props);
		this.state = {}
	}
	
	public componentDidMount(): void {
	
	}
	
	public componentWillUnmount(): void {
	
	}
	
	render() {
		const {options, optionsLine, optionPie, optionRadar, default_option, bar_option} = this;
		return (
			<div className="home-content">
				<div className="search-content">
					<div className="home-charts-axis">
						{default_option && <ReactECharts option={default_option} className="charts-axis"/>}
					</div>
				</div>
				<div className="search-content">
					<div className="home-charts-axis">
						{bar_option && <ReactECharts option={bar_option} className="charts-axis"/>}
					</div>
				</div>
				<div className="search-content">
					<div className="home-charts-axis">
						{optionsLine && <ReactECharts option={optionsLine} className="charts-axis"/>}
					</div>
				</div>
				<div className="multi-charts">
					<div className="search-content">
						<div className="home-charts-axis">
							{optionPie &&
                                <ReactECharts option={optionPie} className="charts-axis" style={{height: 400}}/>}
						</div>
					</div>
					<div className="search-content">
						<div className="home-charts-axis">
							{optionRadar &&
                                <ReactECharts option={optionRadar} className="charts-axis" style={{height: 400}}/>}
						</div>
					</div>
				</div>
				<div className="search-content">
					<div className="home-charts-axis">
						{options && <ReactECharts option={options} className="charts-axis"/>}
					</div>
				</div>
			</div>
		);
	}
}
