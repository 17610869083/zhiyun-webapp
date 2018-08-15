/* eslint-disabled */
const host = 'http://119.90.61.155/om31/mpart/';
//const host ='http://web.is8.com.cn/om/mpart/';
export const baseHost = 'http://119.90.61.155/om31/';
//export const baseHost = 'http://web.is8.com.cn/om/';
//新版报告
export const api_new_report = 'http://119.90.61.155/om31/webpart/report/exportReport?action=downloadReport';
//&reportId=1760&dType=html
//获取专题列表
export const api_get_topicMemu= host +'oTopic/TopicDo?action=getTopicMemu';
//添加专题
export const api_add_topic= host +'oTopic/TopicDo?action=addTopic';
//删除专题
export const api_del_topic= host +'oTopic/TopicDo?action=delTopic' ;
//获取专题规则
export const api_get_topicRule= host +'oTopic/TopicDo?action=getTopicAndRule';
//专题列表
export const api_get_topicList= host +'oTopic/TopicDo?action=docList';
//修改专题
export const api_edit_topic= host +'oTopic/TopicDo?action=editTopic';
//专题单个规则删除
export const api_del_topicRule= host +'oTopic/TopicDo?action=delRule';
//获取分类列表
export const api_get_gradeMemu= host +'oClf/clfDo?action=getGradeMemu';
//添加分类文件夹
export const api_add_gradeCat= host +'oClf/clfDo?action=addGradeCat';
//获取分类文件夹
export const api_get_gradeCatList= host +'oClf/clfDo?action=gradeCatList';
//获取分类规则
export const api_get_gradeRule= host +'oClf/clfDo?action=getGradeAndRule';
//分类删除
export const api_del_grade= host +'oClf/clfDo?action=delGrade';
//分类单个规则删除
export const api_del_gradeRule= host +'oClf/clfDo?action=delRule';
//分类修改
export const api_edit_grade= host +'oClf/clfDo?action=editGrade';
//分类下的内容接口
export const api_get_gradeList= host +'oClf/clfDo?action=docList';
//分类-二级页面图表
export const api_get_showClfListECharts= host+'clf/clfECharts?action=showClfListECharts'
//舆情监测-二级页面图表
export const api_get_showCarrierTrendECharts= host+'chart/allDataECharts?action=showCarrierTrendECharts'
//专题-时间分布图表
export const api_get_showTimeDistributionECharts= host +'topic/topicEcharts?action=showTimeDistributionECharts';
//专题-媒体类型倾向性(柱状图)
export const api_get_showTypeAnalysisECharts= host +'topic/topicEcharts?action=showTypeAnalysisECharts';
//专题-倾向性分析(饼状图)
export const api_get_showTendenciesAnalysisECharts= host +'topic/topicEcharts?action=showTendenciesAnalysisECharts';
//专题-二级页面图表
export const api_get_showTopicListECharts= host+'topic/topicEcharts?action=showTopicListECharts'
//添加分类
export const api_add_grade= host +'oClf/clfDo?action=addGrade';
//预警设置
export const api_warning_extend= host +'setting/NorWExtendDo?action=showNegativeOrWarningExtend&type=602';
//预警设置关键词删除
export const api_del_warning= host +'setting/NorWExtendDo?action=deleteNegativeOrWarningExtend';
//预警设置关键词添加
export const api_add_warning= host +'setting/NorWExtendDo?action=saveNegativeOrWarningExtend';
//预警设置关键词修改
export const api_edit_warning= host +'setting/NorWExtendDo?action=editNegativeOrWarningExtend';
//用户信息
export const api_get_userInfo= host +'self/myInfo?action=getUserInfo';
//邮件推送
export const api_show_emailConfig= host +'mail/EmailDo?action=showEmailConfig';
//删除邮箱
export const api_remove_emailConfig= host +'mail/EmailDo?action=removeEmailAddress';
//添加邮箱
export const api_save_emailConfig= host +'mail/EmailDo?action=saveEmailConfig';
//内容详情页
export const api_get_detail= host +'docDetail/docDetailDo?action=getDetail';
//素材库列表
export const api_get_resource= host +'oWork/reportDo?action=getResourceByUserId';
//加入素材库
export const api_put_resource= host +'oWork/reportDo?action=putResource';
//报告列表
export const api_get_reportList= host +'oWork/reportDo?action=reportList';
//报告内容查看
export const api_preview_workApp= host +'exp/PreviewAction?action=previewWorkApp';
//舆情监测内容列表接口
export const api_doc_searchDo= host +'docList/DocSearchDo?action=docList';
//修改密码
export const api_edit_password= host +'self/myInfo?action=editPassword';
//舆情监测删除数据
export const api_del_doc=host +'docDetail/docDetailDo?action=docDel';

// 修改电话
export const api_edit_telephone = host + 'self/myInfo?action=editTel'

// 上传头像
export const api_upload_logo = host + 'MsgList/MsgListDo?action=editLogo'
// 修改邮箱
export const api_edit_email = host + 'self/myInfo?action=editEmail'
//删除报告
export const api_del_report = host + 'oWork/oWorkDo?action=reportDel'
