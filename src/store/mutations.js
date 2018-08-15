import * as types from './mutation-types'

export const mutations = {
  addTopicName(state,topicname){
              state.topicRule=topicname;
      },
  addTopicRule(state,rules){
              state.topicRule.rule.push(rules);
      },
  delTopicRule(state,index){
              state.topicRule.rule.splice(index,1);
      },
  replaceTopicRule(state,rule){
              state.topicRule.rule[rule['index']]['rule1']=rule.rule1;
              state.topicRule.rule[rule['index']]['rule2']=rule.rule2;
              state.topicRule.rule[rule['index']]['rule3']=rule.rule3;
              state.topicRule.rule[rule['index']]['rule4']=rule.rule4;
      },
  [types.SET_ORIGINAL_URL](state, originalUrl) {
    state.originalUrl = originalUrl
  },
  [types.SEARCH_PARAM](state,param){
    state.param = param
  },
  [types.WEIBO_PARAM](state,weiboparam){
    state.weiboparam = weiboparam
  },
  [types.SITUATION_PARAM](state,situationparam){
    state.situationparam = situationparam
  },
  [types.TOPIC_PARAM](state,topicparam){
    state.topicparam = topicparam
  },
  [types.USER_INFO](state,info){
    state.info = info
  },
  showDelBtn(state,open){
            state.delKeyword=open
  },
  showWaringBtn(state,open){
            state.waring=open
  },
  showReportBtn(state,open){
            state.delReport=open     
  }
}
