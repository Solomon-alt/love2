<template>
<div class="head">
    <div class="welcome">
        欢迎来到小爱后台系统
    </div>
    <!--获取时间-->
    <div class="time">{{year}}/{{month}}/{{day}}{{hello}}{{hour}}:{{minutes}}:{{ seconds}}</div>
    <!--获取天气-->
    <div id="weather-v2-plugin-simple"></div>
    <!--获取天气-->
    <div class="dear">亲爱的,{{username}}</div>
    <div class="exit">退出</div>
</div>
</template>

<script>
export default {
    name: "",
    props: {},
    data() {
        return {
            year: '',
            month: '',
            day: '',
            hour: '',
            minutes: '',
            seconds: '',
            hello: '',
            timer: null,
            username: ''
        };
    },
    components: {},
    methods: {
        getTime() {
            //获取年月日时分秒
            let time = new Date()
            let year = time.getFullYear()
            let mont = time.getMonth() + 1
            let month = mont < 10 ? '0' + mont : mont
            let da = time.getDate()
            let day = da < 10 ? '0' + da : da
            let hou = time.getHours()
            let hour = hou < 10 ? '0' + hou : hou
            let minute = time.getMinutes()
            let minutes = minute < 10 ? '0' + minute : minute
            let second = time.getSeconds()
            let seconds = second < 10 ? '0' + second : second
            this.year = year
            this.month = month
            this.day = day
            this.hour = hour
            this.minutes = minutes
            this.seconds = seconds
            if (hour > 6 && hour <= 12) {
                this.hello = "上午"
            } else if (hour > 12 && hour <= 18) {
                this.hello = "下午"
            } else {
                this.hello = "晚上"
            }
        },
        getName() {
            this.username = JSON.parse(localStorage.getItem('user')).username
        }
    },
    mounted() {
        //设置定时器
        this.timer = setInterval(() => {
            this.getTime()
        }, 1000)
        this.getName()
        // @ts-ignore
        window.WIDGET = {
            CONFIG: {
                "modules": "012",
                "background": 2,
                "tmpColor": "4A4A4A",
                "tmpSize": "16",
                "cityColor": "4A4A4A",
                "citySize": 16,
                "aqiColor": "4A4A4A",
                "aqiSize": 16,
                "weatherIconSize": "16",
                "alertIconSize": 18,
                "padding": "10px 10px 10px 10px",
                "shadow": "1",
                "language": "auto",
                "borderRadius": 5,
                "fixed": "false",
                "vertical": "middle",
                "horizontal": "center",
                "key": "AAkerkQldf"
            }
        }
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://apip.weatherdt.com/simple/static/js/weather-simple-common.js?v=2.0';
        document.getElementsByTagName('head')[0].appendChild(script);
    },
    computed: {},
    watch: {},
    beforeDestroy() {
        //清除定时器
        clearInterval(this.timer);
        this.timer = null;
    }
};
</script>

<style lang="scss" scoped>
.head {
    display: flex;
}

.exit,
.dear,
.welcome,
.time {
    color: #2e5e85;
    font-size: 18px;
}

.welcome {
    margin-left: 65px;
}

.time {
    margin-left: 900px;
}

.exit {
    margin-left: 10px;
    color: #409EFF;
}

.exit:hover {
    cursor: pointer;
}
</style>
