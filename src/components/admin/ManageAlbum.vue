<template>
    <div style="display:flex">
        <div class="manage-album">
            <Card style="margin-bottom:10px">
                <p slot="title"><Icon style="font-size:18px" type="md-add-circle" />上架专辑</p>
                <p style="margin-top:11px">如要为专辑添加歌曲，请转至歌曲管理</p>
                <div>
                <span class="title-span">专辑id</span>
                <Input placeholder="自动填充" style="width: 300px" v-model="add.albumid" disabled/>
                </div>
                <div>
                <span class="title-span">歌手名</span>
                <Select
                v-model="singerKey1"
                filterable
                remote
                :remote-method="fuzzySingerSearch"
                :loading="sloading">
                <Option v-for="(option, index) in singerResult1" :value="option.singername" :key="index">{{option.singername}}</Option>
                </Select>
                <Modal
                    v-model="modal1"
                    title="歌手详情"
                    >
                    <p><b>{{singerKey1}}有如下专辑</b></p>
                    <Row>
                    <Col span="6"><b>专辑id</b></Col>
                    <Col span="6"><b>专辑名</b></Col>
                    <Col span="6"><b>语种</b></Col>
                    <Col span="6"><b>公司</b></Col>
                    </Row>
                    <Row v-for="(a,i) in singerAlbum" style="margin-bottom:8px">
                    <Col span="6">{{a.albumid}}</Col>
                    <Col span="6">{{a.albumname}}</Col>
                    <Col span="6">{{a.language}}</Col>
                    <Col span="6">{{a.company}}</Col>
                    </Row>
                </Modal>
                </div>
                <div>
                <p style="margin-top:-6px;margin-bottom:5px">点击搜索按钮自动获取歌手id</p>
                <span class="title-span">歌手id</span>
                <Input search placeholder="自动填充" style="width: 300px" @click.native='searchAddid' v-model='add.singerid' disabled/>
                </div>
                <div>
                <span class="title-span">名称</span>
                <Input placeholder="输入专辑名" style="width: 100px" v-model='add.albumname' />
                <span class="title-span">年代</span>
                <Input placeholder="输入专辑年代" style="width: 100px" v-model='add.age' />
                </div>
                <div>
                <span class="title-span">语言</span>
                <Input placeholder="输入专辑语言" style="width: 100px" v-model='add.language' />
                <span class="title-span">公司</span>
                <Input placeholder="输入发行公司" style="width: 100px" v-model='add.company' />
                </div>
                <Upload
                type="drag"
                id="uploadFile"
                :before-upload="clearFile()"
                action="http://111.230.63.192:8081/uploadAlbumImg">
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>点击或拖拽上传专辑封面</p>
                </div>
                </Upload>
                <div>
                    <Button type="success" long style="width:360px" @click='addAlbum()'>提交</Button>
                </div>
            </Card>
            <Card>
                <p slot="title"><Icon style="font-size:18px" type="md-trash" />下架专辑</p>
                <p style="margin-top:11px">搜索想要进行操作的专辑</p>
                <div>
                <span class="title-span">歌手名</span>
                <Select
                v-model="singerKey2"
                filterable
                remote
                :remote-method="fuzzySingerSearch2"
                :loading="sloading">
                <Option v-for="(option, index) in singerResult2" :value="option.singername" :key="index">{{option.singername}}</Option>
                </Select>
                </div>
                <div>
                <span class="title-span">专辑名</span>
                <AutoComplete
                v-model="del.albumname"
                :data="albumResult"
                placeholder="点击，从下拉框选择"
                style="width:200px"
                @on-focus="delfill">
                </AutoComplete>
                </div>
                <div>
                    <Button type="primary" shape="circle" icon="md-search" @click="searchDelete()"></Button>
                </div>
                <div>
                    <p>您查询到的专辑其他信息如下</p>
                </div>
                <Row>
                    <Col span="6"><b>专辑id</b></Col>
                    <Col span="6"><b>语言</b></Col>
                    <Col span="6"><b>年代</b></Col>
                    <Col span="6"><b>发行公司</b></Col>
                </Row>
                <Row>
                    <Col span="6" v-model='del.albumid'>{{del.albumid}}</Col>
                    <Col span="6" v-model='del.language'>{{del.language}}</Col>
                    <Col span="6" v-model='del.age'>{{del.age}}</Col>
                    <Col span="6" v-model='del.company'>{{del.company}}</Col>
                </Row>
                <div>
                    <Poptip
	                class="admin-tip"
		            confirm
		            transfer
                    title="确定下架专辑及其关联歌曲吗？本操作不可恢复。"
                    @on-ok="deleteAlbum()"
                    @on-cancel="cancel">
                    <Button type="error" long style="width:360px" :disabled='canDelete'>下架该专辑</Button>
                    </Poptip>
                </div>
            </Card>
        </div>
        <div class="manage-album">
            <Card>
                <p slot="title"><Icon style="font-size:18px" type="md-mic" />专辑库</p>
                <p>越往前的专辑添加得越晚</p>
                <Page :total="AlbumCnt" :page-size="20" show-total  @on-change="changePage"></Page>
                <div>
                    <Row>
                    <Col span="6"><b>专辑id</b></Col>
                    <Col span="6"><b>专辑名</b></Col>
                    <Col span="6"><b>语种</b></Col>
                    <Col span="6"><b>公司</b></Col>
                    </Row>
                </div>
                <div>
                    <Row v-for="(a,i) in pageList" :class="i%2==0?'clg':'clw'" style="margin-bottom:14px">
                    <Col span="6">{{a.albumid}}</Col>
                    <Col span="6">{{a.albumname}}</Col>
                    <Col span="6">{{a.language}}</Col>
                    <Col span="6">{{a.company}}</Col>
                    </Row>
                </div>
            </Card>
        </div>
    </div>
</template>
<script>
import {AXIOS} from '../../http/http'
export default {
    name:'ManageAlbum',
    data(){
        return{
            //上架专辑
            add:{
                albumid:'',
                singername:'',
                singerid:'',
                albumname:'',
                age:'',
                language:'',
                company:'',
                free:false
            },
            //下架专辑
            del:{
                albumid:'',
                singername:'',
                albumname:'',
                age:'',
                language:'',
                company:''
            },
            
            canDelete:true,
            AlbumCnt:0,
            pageList:[],
            singerKey1:"",
            singerKey2:"",
            albumKey:"",
            singerResult1:[],
            singerResult2:[],
            albumResult:[],
            singerAlbum:[],
            sloading:false,
            modal1:false
        }
    },
    methods:{
        addAlbum(){
            this.add.singername="singerKey1"
            for(let a in this.add){
                if (this.add[a]===''){
                    this.$Message.error('有字段未填，请补充完整！')
                    return
                }
            }
            let f= this.free==false?0:1
            AXIOS.post('/addAlbum',this.$qs.stringify({
				'id':this.add.albumid,
                'name':this.add.albumname,
                'singerid':this.add.singerid,
                'language':this.add.language,
                'company':this.add.company,
                'age':this.add.age,
                'adminid':sessionStorage.getItem('adminid'),
                'free':f,
                'albumimg':'https://2019-music-1258503590.cos.ap-shanghai.myqcloud.com/images/albums/'+this.add.albumname+'.jpg'
		    }),
		    {
				headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
				})
		    .then((response)=>{
			    if(1===response.data){
                    this.$Message.success('添加成功')
                    this.changePage(1)
                    for (let a in this.add){
                        this.add[a]=''
                    }
                    AXIOS.get('/maxAlbumid')
                    .then((response)=>{
                        this.add.albumid=response.data
                    })
                    
				}
	    		else{
			    	this.$Message.error('添加失败，请重试')
			    }
	    	})
        },
        searchAddid(){
            AXIOS.get('/getSingeridByName',{params:{name:this.singerKey1}})
            .then((response)=>{
                if(response.data===''){
                    this.$Message.error('没有查询到，请重试')
                }
                else{
                    this.add.singerid=response.data
                    AXIOS.get('/getSingerAlbums',{params:{singerid:response.data}})
                    .then((res)=>{
                        this.singerAlbum=res.data
                        this.modal1=true
                    })
                }
            })
        },
        searchDelete(){
            this.del.singername=this.singerKey2
            if(this.del.singername===''||this.del.albumname===''){
                this.$Message.error('有字段未填，请补充完整')
                return
            }
            this.del.albumid=''
            this.del.age=''
            this.del.language=''
            this.del.company=''
            this.canDelete=true
            AXIOS.get('/searchDeleteAlbum',{params:{singername:this.del.singername,albumname:this.del.albumname}})
            .then((response)=>{
                if(response.data===''){
                    this.$Message.error('没有查询到，请重试')
                }
                else{
                    this.del.albumid=response.data.albumid
                    this.del.age=response.data.albumage
                    this.del.language=response.data.language
                    this.del.company=response.data.company
                    this.canDelete=false
                }
            })
        },
        deleteAlbum(){
            
            AXIOS.delete('/deleteAlbum',{params:{albumid:this.del.albumid}})
            .then((response)=>{
                if(1===response.data){
                    this.$Message.success('已将专辑下架')
                    AXIOS.get('/maxAlbumid')
                    .then((response)=>{
                        this.add.albumid=response.data
                    })
                    this.changePage(1)
                }
                else{
                    this.$Message.error('下架失败，请重试')
                }
            })
            for(let d in this.del){
                this.del[d]=''
            }
            this.canDelete=true
        },
        getAlbums(index){
                    AXIOS.get('/getAlbums',{params:{pgnum:index}})
                    .then((response)=>{
                        this.pageList=response.data
                    })

        },
        changePage(index){
            this.pageList = this.getAlbums(index-1);
        },
        fuzzySingerSearch (query) {
                if (query !== '') {
                    this.sloading = true;
                    setTimeout(() => {
                        this.sloading = false;
                        AXIOS.get('/fuzzySingers?singername='+query).
                        then(res=>{
                            this.singerResult1=res.data
                        })
                    }, 200);
                } else {
                    this.singerResult1 = [];
                }
            },
        fuzzySingerSearch2 (query) {
                if (query !== '') {
                    this.sloading = true;
                    setTimeout(() => {
                        this.sloading = false;
                        AXIOS.get('/fuzzySingers?singername='+query).
                        then(res=>{
                            this.singerResult2=res.data
                        })
                    }, 200);
                } else {
                    this.singerResult2 = [];
                }
            },
        fuzzyAlbumSearch (query) {
                if (query !== '') {
                    this.sloading = true;
                    setTimeout(() => {
                        this.sloading = false;
                        AXIOS.get('/fuzzyAlbums?albumname='+query).
                        then(res=>{
                            this.albumResult=res.data
                        })
                    }, 200);
                } else {
                    this.albumResult = [];
                }
            },
            clearFile(){
            let _this=this
            setTimeout(()=>{
                _this.$refs.uploadFile.clearFiles()
            },3000)
        },
        delfill(){
                AXIOS.get("/getAlbumBySingerName",{params:{singername:this.singerKey2}})
                .then((res)=>{
                    this.albumResult=res.data
                })
            },
    },
    created(){
        AXIOS.get('/maxAlbumid')
        .then((response)=>{
            this.add.albumid=response.data
        })
        AXIOS.get('/getAlbumTotal')
        .then((response)=>{
        
        this.$nextTick(()=>{
            this.AlbumCnt=response.data
            AXIOS.get('/getAlbums',{params:{pgnum:0}})
            .then((res)=>{
                this.$nextTick(()=>{
                this.pageList=res.data
            })
        })
        })
        })
    }
}
</script>
<style scoped>
.manage-album{
    width:49%;
    margin:5px
}
.title-span{
    font-weight: 600;
    margin-right: 14px;
    margin-left: 14px
}
.ivu-card-body > div{
    margin-top:20px
}
.clg{
    background-color: rgb(207, 207, 207)
}
.clw{
    background-color:rgb(241, 241, 241)
}
</style>