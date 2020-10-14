<template>
    <div class="file">
        <input class="file-input" type="file" @change="getFile" />
        Drag or upload *.class here
    </div>
    <div v-show="info" class="info">
        <h3>{{ name }}</h3>
        <pre class="info-container">{{ info }}</pre>
    </div>
</template>

<script>
import { ClassReader } from 'java-class-reader';

export default {
    data() {
        return {
            name: null,
            info: null,
        };
    },
    methods: {
        async getFile(evt) {
            const [file] = evt.target.files;

            if (!file) return;

            if (file.name.slice(-6) !== '.class') {
                alert(`只能解析编译后的 class 文件`);
                return;
            }

            const buff = await file.arrayBuffer();

            const info = new ClassReader(buff).getAllInfo();
            info.dependClass = info.dependClass.sort();

            if (info.methodsInfo) {
                info.methodsInfo.forEach((method = {}) => {
                    if (method.LineNumberTable) delete method.LineNumberTable;
                    if (method.entries) delete method.entries;
                });
            }

            this.name = file.name;
            this.info = JSON.stringify(info, null, 4);
        }
    }
}
</script>

<style scoped>
.file {
    position: relative;
    height: 100px;
    line-height: 100px;
    font-size: 24px;
    background: #e0e0e0;
    word-break:keep-all;
    white-space:nowrap;
}
@media screen and (min-width:800px){
    .file {
        font-size: 36px;
    }
}
.file-input {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0;
}
.info {
    text-align: left;
    border: solid 1px #999;
    font-size: 14px;
}
</style>
