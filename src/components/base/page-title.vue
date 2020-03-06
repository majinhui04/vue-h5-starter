<template>
    <div style="display: none"></div>
</template>
<script>
    // 兼容移动端尤其是iphone浏览器的title
    const setDocumentTitle = function (title) {
        document.title = title;
        const ua = navigator.userAgent;
        if (/ip(hone|od|ad)/i.test(ua)) {
            var i = document.createElement('iframe');
            i.src = 'javascript:void(0)';
            i.style.display = 'none';
            i.onload = function () {
                setTimeout(function () {
                    i.remove();
                }, 9);
            };
            document.body.appendChild(i);
        }
    };
    export default {
        name: 'PageTitle',
        props: {
            title: {
                type: String,
                default: ''
            }
        },
        data() {
            return {};
        },
        watch: {
            title: function (value) {
                if (value) setDocumentTitle(value);
            }
        },
        methods: {
            setTitle: function (title) {
                setDocumentTitle(title);
            }
        },
        mounted: function () {
            if (this.title) setDocumentTitle(this.title);
        },
        activated: function () {
            if (this.title) setDocumentTitle(this.title);
        }
    };
</script>
