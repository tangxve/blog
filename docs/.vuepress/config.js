module.exports = {
	base: '/',
	title: '知食',
	description: '大明湖畔-王翠花',
	dest: "./dist",
	head: [],
	theme: '',
	themeConfig: {
		nav: [
			{text: 'Home', link: '/'},
			{text: 'MacOS', link: '/macOS/'},
			{text: 'Google', link: 'https://google.com'},
			{text: 'VuePress', link: 'https://vuepress.vuejs.org/zh/'},
		],
		sidebar: [
			{
				title: '笔记',
				path: '/notes/',
				// collapsable: false,
				children: [
					'/notes/WeChat/'
				]
			},
			{
				title: 'MacOS',
				path: '/macOS/',
				// collapsable: true,
			},
			{
				title: 'Mac 终端 常用命令',
				path: '/terminal/',
				// collapsable: true,
			},
			{
				title: '知食',
				path: '/zhishi/',
				// collapsable: false,
			}
		],
		lastUpdated: "上次更新"
	}
}
