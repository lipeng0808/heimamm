<template>
  <div class="upload-file">
    <el-upload
      class="avatar-uploader"
      :action="uploadUrl"
      :data="uploadData"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <video controls v-else-if="videoUrl" :src="videoUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'Upload-file',
  props: {
    type: {
      type: String,
      default: 'image' //默认上传的是图片
    },
    obj: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      imageUrl: '',
      videoUrl: '',
      uploadUrl: process.env.VUE_APP_BASEURL + '/question/upload',
      uploadData: {
        file: null
      }
    }
  },
  methods: {
    // 上传成功
    handleAvatarSuccess (res, file) {
      // 判断请求是否成功
      if (res.code !== 200) {
        this.$message.error(res.message)
        return
      }
      // 判断是图片还是视频
      if (this.type === 'image') {
        this.imageUrl = URL.createObjectURL(file.raw)
        this.obj.image = res.data.url
      } else {
        this.videoUrl = URL.createObjectURL(file.raw)
        this.obj.video = res.data.url
      }
    },
    // 上传之前
    beforeAvatarUpload (file) {
      if (this.type === 'image') {
        const isImage =
          file.type === 'image/jpeg' ||
          file.type === 'image/png' ||
          file.type === 'image/gif'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isImage) {
          this.$message.error('上传视频格式不符合!')
        }
        if (!isLt2M) {
          this.$message.error('上传视频大小不能超过 2MB!')
        }
        this.uploadData.file = file
        return isImage && isLt2M
      } else {
        const isVideo = file.type === 'video/mp4' || file.type === 'video/avi'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isVideo) {
          this.$message.error('上传视频格式不符合!')
        }
        if (!isLt2M) {
          this.$message.error('上传视频大小不能超过 2MB!')
        }
        this.uploadData.file = file
        return isVideo && isLt2M
      }
    }
  },
  // 当修改的时候，我们需要这样处理
  mounted () {
    if (this.type === 'image' && this.obj.image) {
      this.imageUrl = process.env.VUE_APP_BASEURL + '/' + this.obj.image
    } else if (this.type === 'video' && this.obj.video) {
      this.videoUrl = process.env.VUE_APP_BASEURL + '/' + this.obj.video
    }
  },
  watch: {
    obj () {
      if (this.type === 'image' && this.obj.image) {
        this.imageUrl = process.env.VUE_APP_BASEURL + '/' + this.obj.image
      } else if (this.type === 'video' && this.obj.video) {
        this.videoUrl = process.env.VUE_APP_BASEURL + '/' + this.obj.video
      } else {
        this.imageUrl = ''
        this.videoUrl = ''
      }
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
