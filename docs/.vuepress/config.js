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
			{text: 'External', link: 'https://google.com'},
		],
		sidebar: [
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
				// collapsable: true,
			}
		],
		lastUpdated: "上次更新"
	}
}
